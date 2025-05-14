<script setup>
import favouriteheart from "../assets/favouriteheart.vue"
import favouritesheartact from "../assets/favouritesheartact.vue";

import { onMounted } from "vue";
import { RouterLink, useRoute, useRouter } from 'vue-router';
import useProducts from '../composables/useProducts';
import { computed, reactive, ref } from 'vue';
import useUsers from '../composables/useUsers';
import useFavourites from "../composables/useFavourites"
import useBasket from "../composables/useBasket";



window.onload = function () {
    window.scrollTo(0, 0); // Прокручивает страницу в самый верх
};

const route = useRoute()
const products = useProducts().products;
const authorizationpolzovatel = useUsers().authorizationpolzovatel
const basketproducts = useBasket().basketproducts
const localproduct = computed(() => useProducts().findProduct(Number(route.params.id)))
const favourites = useFavourites().favourites

const statusfav = ref("")
const heart = ref("Обычное")

const statusproductbasket = ref("")


const isFavorite = computed(() => {
    if (authorizationpolzovatel.value === null) return false;
    return favourites.value.some(
        fav => fav.productId === Number(route.params.id) &&
            fav.authorizationpolzovatelId === authorizationpolzovatel.value
    );
});

onMounted(() => {
    heart.value = isFavorite.value ? "Красное" : "Обычное";
});

function actfovourite(productId, authorizationpolzovatel) {
    statusfav.value = "";
    if (authorizationpolzovatel >= 0) {
        const isFav = favourites.value.some(
            fav => fav.productId === productId &&
                fav.authorizationpolzovatelId === authorizationpolzovatel
        );

        if (isFav) {
            useFavourites().deleteFavourite(productId);
            heart.value = "Обычное";
        } else {
            useFavourites().addFavourite(productId, authorizationpolzovatel);
            heart.value = "Красное";
        }
    } else {
        mainbull.mod1 = true;
    }
}
function actproductbasket(productId, authorizationpolzovatel) {
    statusproductbasket.value = ""
    if (authorizationpolzovatel >= 0) {
        basketproducts.value.forEach(basketproduct => {
            if ((basketproduct.productId == productId) && (basketproduct.authorizationpolzovatelId == authorizationpolzovatel)) {
                statusproductbasket.value = "Товар уже добавлен в корзину"
                mainbull.mod3 = true
            }
        });
        if (!statusproductbasket.value) {
            useBasket().addProductbasket(productId, authorizationpolzovatel)
        }
    }
    else {
        mainbull.mod2 = true

    }

}

const mainbull = reactive({
    mod1: false,
    mod2: false,
    mod3: false,
})

function pon() {
    mainbull.mod1 = false
}

function pon2() {
    mainbull.mod2 = false
}

function pon3() {
    mainbull.mod3 = false
}

</script>

<template>
    <div class="mod1" v-if="mainbull.mod1">
        <br>
        <div class="mod-main">
            <h2 class="mod1h2">Для добавления товара в избранное необходимо авторизоваться</h2>
            <br><br><br>
            <button class="mod1btn" @click="pon()">Понял</button>
        </div>
        <div class="modal-back"></div>
    </div>
    <div class="mod2" v-if="mainbull.mod2">
        <br>
        <div class="mod-main2">
            <h2 class="mod2h2">Для добавления товара в корзину необходимо авторизоваться</h2>
            <br><br><br>
            <button class="mod2btn" @click="pon2()">Понял</button>
        </div>
        <div class="modal-back2"></div>
    </div>
    <div class="mod3" v-if="mainbull.mod3">
        <br>
        <div class="mod-main3">
            <h2 class="mod3h2">Товар уже добавлен в корзину</h2>
            <br><br><br>
            <button class="mod3btn" @click="pon3()">Понял</button>
        </div>
        <div class="modal-back3"></div>
    </div>
    <section>
        <div class="card-product">
            <img :src=localproduct.imgproduct alt="" class="imgtovar">
            <div class="datatovar">
                <div class="titlearticul">
                    <p class="title">{{ localproduct.title }}</p>
                    <p>Артикул: {{ localproduct.id }}</p>
                    {{ localproduct.description }}
                </div>

                <div class="flexprice">
                    <h2>{{ Number(localproduct.price) - (Number(localproduct.price) / 100 * localproduct.discount)
                    }}&nbsp;&#8381;
                    </h2>
                    <div class="discountflex" v-if="localproduct.discount != ''">
                        <s>{{ Number(localproduct.price) }}&nbsp;&#8381;</s>
                        <p class="discountbox">-{{ localproduct.discount }}%</p>
                    </div>
                </div>
                <div class="btnpagetovar">
                    <button class="inbasket" @click="actproductbasket(localproduct.id, authorizationpolzovatel)">В
                        корзину</button>
                    <button class="btnfav" @click="actfovourite(localproduct.id, authorizationpolzovatel)">
                        <favouriteheart v-if="heart === 'Обычное'" />
                        <favouritesheartact v-else />
                    </button>
                </div>
            </div>
        </div>
    </section>
    <section>
        <h2> Другие товары категории</h2>
        <hr>
        <div class="gridbox">
            <template v-for="product in products" :key="product.id">

                <RouterLink :to="{ name: 'pageproduct', params: { id: product.id } }" class="discountrouter"
                    v-if="product.category == localproduct.category && product.id !== localproduct.id">
                    <div class="product-card">
                        <img :src="product.imgproduct" :alt="product.title" class="imgtovar2">
                        <div class="flexdiscount">
                            <h2>{{ Number(product.price) - (Number(product.price) / 100 * product.discount)
                            }}&nbsp;&#8381;
                            </h2>
                            <div v-if="product.discount" class="discountflex2">
                                <s>{{ (Number(product.price) * (product.countproduct || 1)).toFixed(2) }}&#8381;</s>
                                <p class="discountbox">-{{ product.discount }}%</p>
                            </div>
                        </div>
                        <p>{{ product.title }}</p>
                    </div>

                </RouterLink>
            </template>
        </div>
    </section>
</template>

<style scoped>
.card-product {
    display: flex;
    gap: 120px;
    margin-top: 40px;
    margin-left: 100px;
    margin-bottom: 40px;

}

.imgtovar {
    width: 550px;
    height: 550px;
    margin-left: 25px;
}

.datatovar {
    width: 350px;
    padding: 20px;
    border-radius: 10px;
    background-color: white;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    transition: transform 0.3s ease;
}

.title {
    font-size: 30px;
}

.titlearticul {
    height: 100px;
}

.flexprice {
    display: flex;
    gap: 20px;
    margin-top: 280px;
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

.discountflex {
    display: flex;
    align-items: center;
    gap: 10px;
}

.btnpagetovar {
    display: flex;
    gap: 10px;
}

.inbasket {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 100px;
    border: none;
}

.inbasket:hover {
    background-color: #ff7b00;
}

.btnfav {
    background-color: white;
    border: 1px solid white;
}


.mod1 {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

.mod-main {
    width: 500px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.modal-back {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: white;
    opacity: 0.5;

}

.mod1h2 {
    position: relative;
    margin-left: 80px;
    z-index: 1001;
    width: 350px;
    margin-top: 40px;
}

.mod1btn {
    position: relative;
    width: 100px;
    height: 40px;
    margin-left: 190px;
    margin-top: 200px;
    border-radius: 10px;
    z-index: 1002;
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
}

.mod1btn:hover {
    background-color: #ff7b00;
}


.mod2 {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

.mod-main2 {
    width: 500px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.modal-back2 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: white;
    opacity: 0.5;

}

.mod2h2 {
    position: relative;
    margin-left: 80px;
    z-index: 1001;
    width: 350px;
    margin-top: 40px;
}

.mod2btn {
    position: relative;
    width: 100px;
    height: 40px;
    margin-left: 190px;
    margin-top: 200px;
    border-radius: 10px;
    z-index: 1002;
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
}

.mod2btn:hover {
    background-color: #ff7b00;
}


.mod3 {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1001;
}

.mod-main3 {
    width: 500px;
    height: 500px;
    background-color: white;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.modal-back3 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: white;
    opacity: 0.5;

}

.mod3h2 {
    position: relative;
    margin-left: 80px;
    z-index: 1001;
    width: 350px;
    margin-top: 40px;
}

.mod3btn {
    position: relative;
    width: 100px;
    height: 40px;
    margin-left: 190px;
    margin-top: 200px;
    border-radius: 10px;
    z-index: 1002;
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
}

.mod3btn:hover {
    background-color: #ff7b00;
}












.textonas {
    display: flex;
    justify-content: center;
}

.imgtovar2 {
    width: 250px;
    height: 250px;
    margin-left: 25px;
}

.flexdiscount {
    display: flex;
    gap: 20px;
    align-items: center;
}

.discountbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 30px;
    background-color: #ff7b00;
    border-radius: 10px;
    color: white;
    font-weight: bold;
}

.discountflex2 {
    display: flex;
    align-items: center;
    gap: 10px;
}

.product-card {
    padding: 20px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);

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

.discountrouter {
    color: black;
    text-decoration: none;
}

.gridbox {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    /* 3 колонки с равной шириной */
    gap: 20px;
    /* Расстояние между элементами */
    padding: 20px 0;
    /* Отступы сверху и снизу */
    margin: 0 auto;
    /* Центрирование сетки */
    max-width: 1200px;
    /* Максимальная ширина контейнера */
}

p {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
</style>