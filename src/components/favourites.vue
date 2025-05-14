<script setup>
import favouritesheartact from "../assets/favouritesheartact.vue";
import { reactive, ref } from "vue";
import useUsers from "../composables/useUsers"
import { RouterLink } from 'vue-router';
import { computed } from "vue";
import useFavourites from "../composables/useFavourites";
import useProducts from '../composables/useProducts';
import useBasket from "../composables/useBasket";


const authorizationpolzovatel = useUsers().findUser(useUsers().authorizationpolzovatel.value)
const auth = useUsers().authorizationpolzovatel
const products = useProducts().products
const favourites = useFavourites().favourites
const basketproducts = useBasket().basketproducts


const bulls = reactive({
    bull1: true,
    bull2: false,
})

if (authorizationpolzovatel) {
    bulls.bull1 = false
    bulls.bull2 = true
}
else {
    bulls.bull1 = true
    bulls.bull2 = false
}

const newproducts = computed(() => {

    let mass = []
    favourites.value.forEach(favourite => {

        if (favourite.authorizationpolzovatelId == auth.value) {
            mass.push(useProducts().findProduct(favourite.productId))
        }
    });
    return mass
});


function deleteFavourite(productid) {
    useFavourites().deleteFavourite(productid)
}

const statusproductbasket = ref("")

function actproductbasket(productId, auth) {
    statusproductbasket.value = ""
    console.log(auth)
    if (auth >= 0) {
        basketproducts.value.forEach(basketproduct => {
            if ((basketproduct.productId == productId) && (basketproduct.authorizationpolzovatelId == auth)) {
                statusproductbasket.value = "Товар уже добавлен в корзину"
            }
        });
        if (!statusproductbasket.value) {
            useBasket().addProductbasket(productId, auth)
        }
    }
    else {
        mainbull.mod1 = true
    }

}

const mainbull = reactive({
    mod1: false,
})

function pon() {
    mainbull.mod1 = false
}
</script>
<template>
    <div class="mod1" v-if="mainbull.mod1">
        <br>
        <div class="mod-main">
            <h2 class="mod1h2">Для добавления товара в корзину необходимо авторизоваться</h2>
            <br><br><br>
            <button class="mod1btn" @click="pon()">Понял</button>
        </div>
        <div class="modal-back"></div>
    </div>
    <div v-if="bulls.bull1">
        <div class="boxsmeshenie">
            <h2>Вы не авторизованы</h2>
            <p>Для доступа к Избранному необходимо
                <RouterLink :to="{ name: 'authorization' }" title="Личный кабинет">Авторизоваться</RouterLink>
            </p>
            <p>Если у вас нет аккаунта
                <RouterLink :to="{ name: 'regestration' }" title="Личный кабинет">Зарегестрироваться</RouterLink>
            </p>
        </div>
        <div>
            <RouterView />
        </div>
    </div>
    <div v-if="bulls.bull2">
        <div v-if="newproducts.length === 0" class="empty-favorites">
            <div class="empty-content">
                <h3>Ваш список избранного пуст</h3>
                <p>Добавляйте товары в избранное, нажимая на ♡</p>
                <RouterLink :to="{ name: 'catalog' }" class="browse-btn">Перейти в каталог</RouterLink>
            </div>
        </div>
        <div v-for="product in newproducts" :key="product.id" class="cardfav">
            <RouterLink :to="{ name: 'pageproduct', params: { id: product.id } }" class="imgopis">
                <img :src="product.imgproduct" :alt="product.title" class="imgtovar">
                <div>
                    <p>{{ product.title }}</p>
                    <p>Артикул: {{ product.id }}</p>
                    <div class="flexdiscount">
                        <h2>{{ Number(product.price) - (Number(product.price) / 100 * product.discount)
                            }}&nbsp;&#8381;
                        </h2>
                        <div class="discountflex2" v-if="product.discount != ''">
                            <s>{{ Number(product.price) }}&nbsp;&#8381;</s>
                            <p class="discountbox">-{{ product.discount }}%</p>
                        </div>
                    </div>
                </div>

            </RouterLink>
            <div class="favbtn">
                <button class="favourite" @click="deleteFavourite(product.id)">
                    <favouritesheartact />
                </button>
                <button class="basket" @click="actproductbasket(product.id, auth)">В
                    корзину</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cardfav {
    display: flex;
    width: 1200px;
    height: 200px;
    justify-content: space-between;
    padding: 20px;
    margin-left: 30px;
    margin-bottom: 20px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.imgopis {
    text-decoration: none;
    color: black;
    display: flex;
    gap: 40px;
    width: 1000px;
}

.imgtovar {
    width: 180px;
    height: 180px;
}

.favourite {
    width: 32px;
    height: 32px;
    background-color: white;
    border: none;
}

.basket {
    height: 100px;
    height: 30px;
    background-color: black;
    color: white;
    font-weight: bold;
    width: 100px;
    height: 30px;
    border-radius: 10px;
    border: none;
}

.basket:hover {
    background-color: #ff7b00;
}

.favbtn {
    display: flex;
    gap: 20px;
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

.boxsmeshenie {
    margin-left: 20px;
}











.empty-favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    margin: 40px 0;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
}

.empty-content {
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

.empty-content h3 {
    font-size: 1.5rem;
    color: #333;
    margin: 0;
}

.empty-content p {
    color: #666;
    margin: 0;
    font-size: 1rem;
}

.browse-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    width: 200px;
    height: 40px;
    background-color: black;
    color: white;
    text-decoration: none;
    border-radius: 10px;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
}

.browse-btn:hover {
    background-color: #ff7b00;
}
</style>