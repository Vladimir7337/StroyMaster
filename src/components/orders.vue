<script setup>
import { reactive } from "vue";
import useUsers from "../composables/useUsers"
import { RouterLink } from 'vue-router';
import useOrders from "../composables/useOrders";
import orderimg from "../assets/orderimg.png";

const orders = useOrders().orders
const authorizationpolzovatel = useUsers().findUser(useUsers().authorizationpolzovatel.value)
const auth = useUsers().authorizationpolzovatel

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

</script>
<template>
    <div v-if="bulls.bull1">
        <div class="boxsmeshenie">
            <h2>Вы не авторизованы</h2>
            <p>Для доступа к Заказам необходимо
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
        <div>
            <div v-if="orders.length === 0" class="empty-orders">
                <div class="empty-content">
                    <h3>У вас нет заказов</h3>
                    <p>Оформите заказ в корзине</p>
                    <RouterLink :to="{ name: 'basket' }" class="browse-btn">Перейти в корзину</RouterLink>
                </div>
            </div>
        </div>
        <div v-for="order in orders" :key="order.id">
            <template v-if="order.authorizationpolzovatelId == auth">
                <div class="order-card">
                    <img :src="orderimg" alt="Иконка заказа" class="order-img">
                    <div class="order-content">
                        <h2>Заказ</h2>
                        <p>Количество товаров: {{ order.numberproduct }}</p>
                        <p>Стоимость заказа: {{ order.totalprice }} ₽</p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<style scoped>
.order-card {
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    width: 1200px;
    margin-top: 20px;
    margin-left: 30px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.order-img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
}

.order-content {
    flex-grow: 1;
}

.order-content h2 {
    margin-top: 0;
    margin-bottom: 10px;
}

.order-content p {
    margin: 5px 0;
}

.boxsmeshenie {
    margin-left: 20px;
}




.empty-orders {
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