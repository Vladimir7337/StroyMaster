<script setup>
import { reactive, ref } from 'vue';
import useUsers from "../composables/useUsers"
import { RouterLink } from 'vue-router';


const users = useUsers().users

const authorizationpolzovatel = useUsers().authorizationpolzovatel



const znachpol = reactive({
    name: null,
    password: null,
    telephone: null,
})

const regular = reactive({
    reg1: /^[А-ЯЁA-Z][А-Яа-яЁёA-Za-z]{3,9}$/,
    reg2: /^[а-яА-ЯёЁa-zA-Z0-9!?]{4,10}$/,
    reg3: /^(\+7|7|8)\d{10}$/,
})

const errors = reactive({
    ername: '',
    erpassword: '',
    ertelephone: '',
})

function zareg() {
    // Проверка поля имени
    if (!znachpol.name) {
        errors.ername = '*Поле не может быть пустым';
    } else if (!regular.reg1.test(znachpol.name)) {
        errors.ername = '*Неверный ввод. Имя может содержать только от 4 до 10 символов(первая буква заглавная , буквы русского/английского алфавита)';
    } else {
        errors.ername = '';
    }

    // Проверка поля пароля
    if (!znachpol.password) {
        errors.erpassword = '*Поле не может быть пустым';
    } else if (!regular.reg2.test(znachpol.password)) {
        errors.erpassword = '*Неверный ввод. Пароль может содержать 4-10 символов (русский буквы, английские буквы, цифры, ! или ?)';
    } else {
        errors.erpassword = '';
    }

    // Проверка поля телефона
    if (!znachpol.telephone) {
        errors.ertelephone = '*Поле не может быть пустым';
    } else if (!regular.reg3.test(znachpol.telephone)) {
        errors.ertelephone = "*Неверный ввод. Номер может содержать только цифры и может содержать в начале только одно значение из +7/7/8";
    } else {
        errors.ertelephone = '';
    }

    users.value.forEach(user => {
        if (znachpol.name == user.name) {
            errors.ername = "*Ошибка. Уже существует пользователь с таким именем";
        }
    });


    // Если ошибок нет - выполняем регистрацию
    if (!errors.ername && !errors.erpassword && !errors.ertelephone) {
        useUsers().addUser(znachpol.name, znachpol.password, znachpol.telephone)
        mainbull.mod1 = true
        znachpol.name = null
        znachpol.password = null
        znachpol.telephone = null
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
            <h2 class="mod1h2">Успешная регистрация Аккаунта</h2>
            <br><br><br>
            <button class="mod1btn" @click="pon()">Понял</button>
        </div>
        <div class="modal-back"></div>
    </div>
    <form>
        <h2 class="h2-reg">Регистрация</h2>
        <label for="inp1">Имя&emsp;&nbsp;&emsp;</label><input type="text" id="inp1" placeholder="Введите имя"
            v-model="znachpol.name"
            title="Имя может содержать только от 4 до 10 символов(первая буква заглавная , буквы русского/английского алфавита)"><br>
        <small class="osh">{{ errors.ername }}</small><br>
        <label for="inp2">Пароль&emsp;</label><input type="text" id="inp2" placeholder="Введите пароль"
            v-model="znachpol.password"
            title="Пароль может содержать только 4-10 символов (русский буквы, английские буквы, цифры, ! или ?)"><br>
        <small class="osh">{{ errors.erpassword }}</small><br><br>
        <label for="inp3">Телефон&nbsp;&nbsp;</label><input type="numder" id="inp3" placeholder="Введите телефон"
            v-model="znachpol.telephone"
            title="Неверный ввод. Номер может содержать только цифры и может содержать в начале только одно значение из +7/7/8"><br>
        <small class="osh">{{ errors.ertelephone }}</small><br>
        <button id="inp-regestration" @click.prevent="zareg()">Зарегестрироваться</button>
        <p>Если вы уже зарегестрированны вы можете<RouterLink :to="{ name: 'authorization' }" title="Личный кабинет">
                Авторизоваться</RouterLink>
        </p>
    </form>


</template>
<style scoped>
form {
    margin-left: 400px;
    margin-top: 40px;
    width: 400px;
    padding-left: 130px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

#inp1,
#inp2,
#inp3 {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}


#inp2 {
    margin-top: 20px;
}

#inp-regestration {
    margin-top: 20px;
    background-color: black;
    color: white;
    width: 150px;
    height: 40px;
    border-radius: 10px;
    font-weight: bold;
    border: none;
    transition: transform 0.3s ease;
}

#inp-regestration:hover {
    background-color: #ff7b00;
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
</style>