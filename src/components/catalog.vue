<script setup>

import { RouterLink, useRouter } from 'vue-router';
import useProducts from '../composables/useProducts';
import useUsers from '../composables/useUsers';
import { reactive, computed, onMounted, watch, ref } from 'vue';

const authorizationpolzovatel = useUsers().findUser(useUsers().authorizationpolzovatel.value)
const router = useRouter()

const products = useProducts().products;

const local = reactive({
    mass: products, //"Сырые" данные
    // SearchInp: "", //то что мы ввели в поиск (берем из базы данных)
    localGoods: [] //Уже результаты по поиску
})

const searchRes = computed(() => {
    let massRes = []

    let filterPr = filters.filterprice
    if (filterPr) {
        filterPr = filters.filterprice.split('-')
    } else {
        filterPr = ['Нет Фильтра', 0]
    }


    local.localGoods.forEach(tovar => {
        // Проверка фильтра по цене
        const pricePassed = filterPr[0] === 'Нет Фильтра' ||
            (Number(tovar.price) >= Number(filterPr[0]) &&
                Number(tovar.price) <= Number(filterPr[1]));

        // Проверка фильтра по категории
        const categoryPassed = filters.filtercategory === null ||
            tovar.category === filters.filtercategory;

        // Если оба условия выполнены, добавляем товар
        if (pricePassed && categoryPassed) {
            massRes.push(tovar);
        }
    });
    return massRes
});



const filters = reactive({
    filterprice: null,
    filtercategory: null,
})

watch(useProducts().poisk, (newValue) => {

    local.localGoods = []
    local.mass.forEach(tovar => {
        if (tovar.title.toLowerCase().includes(newValue.toLowerCase())) {
            local.localGoods.push(tovar)
        }
    });
})

onMounted(() => {
    local.localGoods = []
    local.mass.forEach(tovar => {
        if (tovar.title.toLowerCase().includes(useProducts().poisk.value.toLowerCase())) {
            local.localGoods.push(tovar)
        }
    });
})






</script>

<template>
    <div>
        <div class="fl">
            <aside>
                <h2>Фильтры</h2>
                <form>
                    <div>
                        <p>Цена</p>
                        <input type="radio" id="filter0" v-model="filters.filterprice" :value="null"><label
                            for="filter0">Нет
                            фильтра</label><br>
                        <input type="radio" id="filter1" v-model="filters.filterprice" value="500-599"><label
                            for="filter1">500-599
                            руб</label><br>
                        <input type="radio" id="filter2" v-model="filters.filterprice" value="600
                            - 699"><label for="filter2">600
                            - 699
                            руб</label><br>
                        <input type="radio" id="filter3" v-model="filters.filterprice" value="700 - 799"><label
                            for="filter3">700 - 799
                            руб</label><br>
                        <input type="radio" id="filter4" v-model="filters.filterprice" value="800 - 899"><label
                            for="filter4">800 - 899
                            руб</label>
                    </div>
                    <div>
                        <p>Категория</p>
                        <input type="radio" id="filter5" v-model="filters.filtercategory" :value="null"><label
                            for="filter5">Нет
                            фильтра</label><br>
                        <input type="radio" id="filter6" v-model="filters.filtercategory" value="Обои"><label
                            for="filter6">Обои</label><br>
                        <input type="radio" id="filter7" v-model="filters.filtercategory" value="Плитка"><label
                            for="filter7">Плитка</label><br>
                        <input type="radio" id="filter8" v-model="filters.filtercategory" value="Краска"><label
                            for="filter8">Краска</label><br>
                    </div>
                </form>
            </aside>
            <div class="products-container">
                <h2>Список товаров</h2>
                <div class="products-grid">
                    <RouterLink class="product-card" :to="{ name: 'pageproduct', params: { id: product.id } }"
                        v-for="product in searchRes" :key="product.id">
                        <img :src="product.imgproduct" :alt="product.title" class="imgtovar">
                        <div class="flexdiscount">
                            <h2>{{ Number(product.price) - (Number(product.price) / 100 * product.discount)
                                }}&nbsp;&#8381;
                            </h2>
                            <div class="discountflex2" v-if="product.discount != ''">
                                <s>{{ Number(product.price) }}&nbsp;&#8381;</s>
                                <p class="discountbox">-{{ product.discount }}%</p>
                            </div>
                        </div>
                        <p>{{ product.title }}</p>
                    </RouterLink>

                </div>
            </div>
        </div>
        <div class="whitebox"></div>
    </div>
</template>

<style scoped>
.products-container {
    width: 1250px;
    margin: 0 auto;
    padding: 20px;
}

.products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
    /* Это добавит отступы между карточками */
    margin-top: 20px;
    gap: 40px;
}

.product-card {
    padding: 20px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease;

    /* Ширина карточки */
    width: 300px;
    /* Высота карточки */
    height: 380px;

    text-decoration: none;
    color: black;
}


.product-card:hover {
    transform: translateY(-5px);
}


.fl {
    display: flex;
    gap: 5px;
}

aside {
    width: 200px;
    margin-top: 20px;
    border-right: 1px solid black;
}

.imgtovar {
    width: 250px;
    height: 250px;
    margin-left: 25px;
}

.whitebox {
    width: 1250px;
    height: 50px;
}

.flexdiscount {
    display: flex;
    gap: 20px;
}

.discountbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 30px;
    background-color: #ff7b00;
    border-radius: 10px;
}

.discountflex2 {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>