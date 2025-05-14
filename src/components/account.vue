<script setup>
import { reactive } from "vue";
import useUsers from "../composables/useUsers"
import { RouterLink } from 'vue-router';
import { useRouter } from "vue-router";
import accimg from "../assets/account.png"

const authorizationpolzovatel = useUsers().findUser(useUsers().authorizationpolzovatel.value)
const authid = useUsers().authorizationpolzovatel

const router = useRouter();

const bulls = reactive({
    bull1: true,
    bull2: false,
    bull3: false,
})

if (authorizationpolzovatel) {
    bulls.bull1 = false
    bulls.bull2 = true
}
else {
    bulls.bull1 = true
    bulls.bull2 = false
}

function exit() {
    useUsers().authorizationpolzovatel.value = NaN
    router.push('authorization')
}

function settings() {
    bulls.bull2 = false
    bulls.bull3 = true
}

function account() {
    bulls.bull2 = true
    bulls.bull3 = false
}

function udluser() {

    if (authorizationpolzovatel.id == 0) {
        mainbull.mod1 = true
    }
    else {
        useUsers().deleteUser(useUsers().authorizationpolzovatel.value)
        router.push({ name: 'authorization' })
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
            <h2 class="mod1h2">Нельзя удалить Админа</h2>
            <br><br><br>
            <button class="mod1btn" @click="pon()">Понял</button>
        </div>
        <div class="modal-back"></div>
    </div>
    <div v-if="bulls.bull1">
        <div class="boxsmeshenie">
            <h2>Вы не авторизованны</h2>
            <p>Для доступа к Личному кабинету необходимо
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
        <div class="bigbox">
            <div class="boxflex">
                <div class="flexrazdel">
                    <img :src=accimg>
                    <div class="data">
                        <h2>{{ authorizationpolzovatel.name }}</h2>
                        <p>Телефон: {{ authorizationpolzovatel.telephone }}</p>
                    </div>
                </div>
                <div class="btns-account">
                    <button class="settings" @click="settings()">Настройки</button>
                    <button class="exit" @click="exit()">Выйти</button>
                </div>
            </div>
            <div class="routes">

                <RouterLink :to="{ name: 'favourites' }" title="Избранное" class="routerlink">
                    <p>Избранное</p>
                </RouterLink>

                <RouterLink :to="{ name: 'basket' }" title="Корзина" class="routerlink">
                    <p>Корзина</p>
                </RouterLink>

                <RouterLink :to="{ name: 'orders' }" title="Заказы" class="routerlink">
                    <p>Заказы</p>
                </RouterLink>

            </div>
        </div>
    </div>
    <div v-if="bulls.bull3">
        <div class="izmeneniaaccountflex">
            <button class="account" @click="account()">Назад</button>
            <nav class="navizm">
                <RouterLink class="menuizm" :to="{ name: 'changeName' }">Изменить имя</RouterLink>
                <RouterLink class="menuizm" :to="{ name: 'changePassword' }">Изменить пароль</RouterLink>
                <RouterLink class="menuizm" :to="{ name: 'changeTelephone' }">Изменить телефон</RouterLink>
            </nav>
            <button class="udluser" @click="udluser()">Удалить аккаунт</button>
        </div>
        <div class="vivod">
            <RouterView />
        </div>
    </div>
</template>
<style>
.boxflex {
    display: flex;
    gap: 100px;
}

.izmeneniaaccountflex {
    display: flex;
    gap: 80px;
    margin-top: 40px;
}

.navizm {
    display: flex;
    gap: 20px;
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
    margin-left: 110px;
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

.flexrazdel {
    display: flex;
    gap: 40px;
}

.btns-account {
    margin-top: 20px;
    margin-left: 200px;
    display: flex;
    gap: 20px;
}

.bigbox {
    width: 1000px;
    height: 300px;
    padding: 30px;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    margin-top: 40px;
}

.settings {
    width: 100px;
    height: 30px;
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    transition: transform 0.3s ease;
}

.settings:hover {
    background-color: #ff7b00;
}

.exit {
    width: 100px;
    height: 30px;
    background-color: black;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    transition: transform 0.3s ease;
}

.exit:hover {
    background-color: #ff7b00;
}

.routes {
    margin-top: 100px;
    display: flex;
    gap: 20px;

}



.routerlink {
    text-decoration: none;
    display: flex;
    width: 130px;
    height: 50px;
    border: none;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
    transition: transform 0.3s ease;
}

.routerlink:hover {
    background-color: #ff7b00;
}

.data {
    width: 300px;
}

.menuizm {
    color: white;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    width: 250px;
    height: 35px;
    border-radius: 10px;
    border: none;
    transition: transform 0.3s ease;
}

.menuizm:hover {
    background-color: #ff7b00;
}

.account {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 100px;
    transition: transform 0.3s ease;
    border: none;
}

.account:hover {
    background-color: #ff7b00;
}

.udluser {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 150px;
    transition: transform 0.3s ease;
    border: none;
}

.udluser:hover {
    background-color: #ff7b00;
}

.vivod {
    margin-top: 40px;
}

.boxsmeshenie {
    margin-left: 20px;
}
</style>