<script setup>
import { reactive, computed, onMounted, ref } from "vue";
import { RouterLink } from 'vue-router';
import useUsers from "../composables/useUsers";
import useBasket from "../composables/useBasket";
import useProducts from "../composables/useProducts";
import useOrders from "../composables/useOrders";
import { useRouter } from 'vue-router'

const router = useRouter();

const orders = useOrders().orders

const { basketproducts, deleteProductbasket } = useBasket();
const { authorizationpolzovatel: auth } = useUsers();
const { products, findProduct } = useProducts();

const bulls = reactive({
    bull1: true,
    bull2: false,
    bull3: false,
});

const znachoformle = reactive({
    cardnumber: null,
    namemap: null,
    CVCCVV: null,
})

const errors = reactive({
    errorcardnumber: null,
    errornamemap: null,
    errorCVCCVV: null
})

const regulars = reactive({
    regcardnumber: /^(?:\d{4}[ -]?){3}\d{4}$/,
    regnamemap: /^[A-Za-z\s'-]{2,26}$/,
    regCVCCVV: /^\d{3,4}$/,
})


function oformlate() {
    if (newproductsbasket.value.length === 0) {
        mainbull.mod1 = true
    }
    else {
        bulls.bull3 = true
        bulls.bull2 = false
    }

}

function nazinbascet() {
    bulls.bull3 = false
    bulls.bull2 = true
}

function clearBasket() {
    // Очищаем корзину для авторизованного пользователя
    basketproducts.value = basketproducts.value.filter(item => item.authorizationpolzovatelId !== auth.value);
}


function oplata() {
    if (!znachoformle.cardnumber) {
        errors.errorcardnumber = "*Ошибка. Введено пустое поле"
    }
    else if (!regulars.regcardnumber.test(znachoformle.cardnumber)) {
        errors.errorcardnumber = 'Неверный ввод. Номер карты может содержать: 16 цифр, с поддержкой пробелов или дефисов через каждые 4 цифры';
    }
    else {
        errors.errorcardnumber = ''
    }

    if (!znachoformle.namemap) {
        errors.errornamemap = "*Ошибка. Введено пустое поле"
    }
    else if (!regulars.regnamemap.test(znachoformle.namemap)) {
        errors.errornamemap = '*Неверный ввод. Имя на карте может содержать: латинские буквы, пробелы, апострофы, дефисы, 2-26 символов';
    }
    else {
        errors.errornamemap = ''
    }

    if (!znachoformle.CVCCVV) {
        errors.errorCVCCVV = "*Ошибка. Введено пустое поле"
    }
    else if (!regulars.regCVCCVV.test(znachoformle.CVCCVV)) {
        errors.errorCVCCVV = '*Неверный ввод. CVC/CVV может содержать 3 или 4 цифры';
    }
    else {
        errors.errorCVCCVV = ''
    }

    if ((!errors.errorcardnumber) && (!errors.errornamemap) && (!errors.errorCVCCVV)) {
        useOrders().addOrders(auth.value, numberproduct.value, totalprice.value)
        bulls.bull3 = false
        bulls.bull2 = true
        router.push('/orders')
        clearBasket();
    }
}


const isAuthorized = computed(() => {
    return auth.value !== null && !isNaN(auth.value);
});

onMounted(() => {
    if (isAuthorized.value) {
        bulls.bull1 = false;
        bulls.bull2 = true;
    } else {
        bulls.bull1 = true;
        bulls.bull2 = false;
    }
});

const newproductsbasket = computed(() => {
    if (!isAuthorized.value) return [];

    return basketproducts.value
        .filter(item => item.authorizationpolzovatelId === auth.value)
        .map(item => {
            const product = findProduct(item.productId);
            return product ? {
                ...product,
                countproduct: item.countproduct || 1
            } : null;
        })
        .filter(Boolean);
});

const numberproduct = computed(() => {
    return newproductsbasket.value.reduce((total, product) => {
        return total + (product.countproduct || 1);
    }, 0);
});

const totalprice = computed(() => {
    return newproductsbasket.value.reduce((total, product) => {
        return total + calculatePrice(product);
    }, 0);
});

function udlproductbasket(productId) {
    deleteProductbasket(productId);
}

function increaseQuantity(productId) {
    const item = basketproducts.value.find(
        p => p.productId === productId && p.authorizationpolzovatelId === auth.value
    );
    if (item) {
        item.countproduct = (item.countproduct || 1) + 1;
    }
}

function decreaseQuantity(productId) {
    const item = basketproducts.value.find(
        p => p.productId === productId && p.authorizationpolzovatelId === auth.value
    );
    if (item && item.countproduct > 1) {
        item.countproduct -= 1;
    }
}

const calculatePrice = (product) => {
    const price = Number(product.price);
    const discount = product.discount ? Number(product.discount) : 0;
    const quantity = product.countproduct || 1;
    return (price - (price * discount / 100)) * quantity;
};


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
            <h2 class="mod1h2">Нельзя оформить заказ. Корзина пуста.</h2>
            <br><br><br>
            <button class="mod1btn" @click="pon()">Понял</button>
        </div>
        <div class="modal-back"></div>
    </div>
    <div v-if="bulls.bull1">
        <div class="boxsmeshenie">
            <h2>Вы не авторизованы</h2>
            <p>Для доступа к Корзине необходимо
                <RouterLink :to="{ name: 'authorization' }">Авторизоваться</RouterLink>
            </p>
            <p>Если у вас нет аккаунта
                <RouterLink :to="{ name: 'regestration' }">Зарегистрироваться</RouterLink>
            </p>
        </div>
        <RouterView />
    </div>

    <div v-if="bulls.bull2">
        <div class="basket-header" v-if="newproductsbasket.length !== 0">
            <button class="checkout-btn" @click="oformlate()">Перейти к оформлению</button>
            <div class="basket-summary">
                <p>{{ numberproduct }} товар(ов)</p>
                <p>{{ totalprice.toFixed(2) }}&#8381;</p>
            </div>
        </div>
        <div v-if="newproductsbasket.length === 0" class="empty-basket">
            <div class="empty-content">
                <h3>Ваша корзина пуста</h3>
                <p>Добавляйте товары в корзину</p>
                <RouterLink :to="{ name: 'catalog' }" class="browse-btn">Перейти в каталог</RouterLink>
            </div>
        </div>
        <div v-for="product in newproductsbasket" :key="product.id" class="cardfav">
            <RouterLink :to="{ name: 'pageproduct', params: { id: product.id } }" class="imgopis">
                <img :src="product.imgproduct" :alt="product.title" class="imgtovar">
                <div>
                    <p>{{ product.title }}</p>
                    <p>Артикул: {{ product.id }}</p>
                    <div class="flexdiscount">
                        <h2>{{ calculatePrice(product).toFixed(2) }}&#8381;</h2>
                        <div v-if="product.discount" class="discountflex2">
                            <s>{{ (Number(product.price) * (product.countproduct || 1)).toFixed(2) }}&#8381;</s>
                            <p class="discountbox">-{{ product.discount }}%</p>
                        </div>
                    </div>
                </div>
            </RouterLink>

            <div class="btnsbasket">
                <div class="quantity-control">
                    <button @click.stop="decreaseQuantity(product.id)" class="quantity-btn">-</button>
                    <span class="quantity-value">{{ product.countproduct || 1 }}</span>
                    <button @click.stop="increaseQuantity(product.id)" class="quantity-btn">+</button>
                </div>
                <button @click.stop="udlproductbasket(product.id)" class="udlproduct">
                    Удалить
                </button>
            </div>
        </div>
    </div>
    <div v-if="bulls.bull3">
        <button @click="nazinbascet()" class="nazinbascet">Назад</button>
        <div>
            <form class="formformate">
                <h2>Оформление заказа</h2>
                <label for="inpx">Номер карты: &nbsp;</label><input type="text" id="inpx"
                    placeholder="Введите номер карты" v-model="znachoformle.cardnumber">
                <br>
                <small class="osh">{{ errors.errorcardnumber }}</small><br><br>
                <label for="inpy">Имя на карте: &nbsp;</label><input type="text" id="inpy"
                    placeholder="Введите имя на карте" v-model="znachoformle.namemap">
                <br>
                <small class="osh">{{ errors.errornamemap }}</small><br><br>
                <label for="inpz">CVC/CVV: &nbsp; &emsp;&ensp;&ensp;</label><input type="text" id="inpz"
                    placeholder="Введите CVC/CVV" v-model="znachoformle.CVCCVV">
                <br>
                <small class="osh">{{ errors.errorCVCCVV }}</small><br><br>
                <input type="submit" value="Оплатить" @click.prevent="oplata()" class="inpoplata">
            </form>
        </div>
    </div>
</template>

<style scoped>
.formformate {
    margin-left: 350px;
    margin-top: 40px;
    width: 500px;
    padding-left: 130px;
    padding-top: 10px;
    padding-bottom: 40px;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

#inpx,
#inpy,
#inpz {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}

.inpoplata {
    width: 100px;
    height: 30px;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    background-color: black;
    border: none;
    transition: transform 0.3s ease;
}


.inpoplata:hover {
    background-color: #ff7b00;
}

.cardfav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    margin: 20px 0;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.imgopis {
    display: flex;
    align-items: center;
    gap: 20px;
    text-decoration: none;
    color: inherit;
    flex-grow: 1;
}

.imgtovar {
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.flexdiscount {
    display: flex;
    gap: 15px;
    align-items: center;
}

.discountflex2 {
    display: flex;
    gap: 10px;
    align-items: center;
}

.discountbox {
    background: #ff7b00;
    color: white;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.9em;
}

.btnsbasket {
    display: flex;
    gap: 15px;
    align-items: center;
}

.quantity-control {
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 5px;
}

.quantity-btn {
    width: 30px;
    height: 30px;
    background: #f5f5f5;
    border: none;
    cursor: pointer;
    font-size: 1.1em;
}

.quantity-value {
    padding: 0 10px;
    min-width: 20px;
    text-align: center;
}

.udlproduct {
    background-color: black;
    width: 100px;
    height: 30px;
    font-weight: bold;
    color: white;
    border-radius: 10px;
    border: none;
}

.udlproduct:hover {
    background-color: #ff7b00;
}

.basket-header {
    display: flex;
    align-items: center;
    padding: 15px 0;
    margin-bottom: 20px;
    margin-left: 20px;
}

.checkout-btn {
    padding: 8px 16px;
    background-color: black;
    font-weight: bold;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: transform 0.3s ease;
}


.checkout-btn:hover {
    background-color: #ff7b00;
}

.basket-summary {
    display: flex;
    gap: 20px;
    align-items: center;
    margin-left: 20px;
}

.basket-summary p {
    margin: 0;
    font-size: 1.1em;
}

.osh {
    color: red;
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

.nazinbascet {
    width: 100px;
    height: 30px;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    background-color: black;
    border: none;
    transition: transform 0.3s ease;
    margin-top: 20px;
    margin-left: 20px;
}

.nazinbascet:hover {
    background-color: #ff7b00;
}

.boxsmeshenie {
    margin-left: 20px;
}











.empty-basket {
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