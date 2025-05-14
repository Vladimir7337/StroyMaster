<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'
import useUsers from "../composables/useUsers"
import { RouterLink } from 'vue-router';

const users = useUsers().users

const authorizationpolzovatel = useUsers().authorizationpolzovatel
const router = useRouter();

const znachpolauth = reactive({
    nameauth: null,
    passwordauth: null,
    telephoneauth: null,
})

const errorsauth = reactive({
    ernameauth: '',
    erpasswordauth: '',
    ertelephoneauth: '',
    ernotpolzovatel: '',
})

function avtoriz() {

    if (znachpolauth.nameauth == null) {
        errorsauth.ernameauth = "*Ошибка. Введено пустое поле"
    }
    else {
        errorsauth.ernameauth = ''
    }

    if (znachpolauth.passwordauth == null) {
        errorsauth.erpasswordauth = "*Ошибка. Введено пустое поле"
    }
    else {
        errorsauth.erpasswordauth = ''
    }

    if (znachpolauth.telephoneauth == null) {
        errorsauth.ertelephoneauth = "*Ошибка. Введено пустое поле"
    }
    else {
        errorsauth.ertelephoneauth = ''
    }


    if ((znachpolauth.nameauth != null) && (znachpolauth.passwordauth != null) && (znachpolauth.telephoneauth != null)) {
        // Ищем пользователя
        const foundUser = users.value.find(user =>
            znachpolauth.nameauth == user.name &&
            znachpolauth.passwordauth == user.password && znachpolauth.telephoneauth == user.telephone
        );

        if (foundUser) {
            useUsers().setAuthorizedUser(foundUser)
            router.push('/account')
            znachpolauth.nameauth = null
            znachpolauth.passwordauth = null
            znachpolauth.telephoneauth = null
        } else {
            errorsauth.ernotpolzovatel = "!Введенный пользователь не зарегестрирован"
        }
    }

}


</script>

<template>
    <form>
        <h2 class="h2-authoriz">Авторизация</h2>
        <label for="inp3">Имя&emsp;&nbsp;&emsp;</label><input type="text" id="inp3" placeholder="Введите имя"
            v-model="znachpolauth.nameauth"><br>
        <small class="osh">{{ errorsauth.ernameauth }}</small><br>
        <label for="inp4">Пароль&emsp;</label><input type="text" id="inp4" placeholder="Введите пароль"
            v-model="znachpolauth.passwordauth"><br>
        <small class="osh">{{ errorsauth.erpasswordauth }}</small><br><br>
        <label for="inp5">Телефон&emsp;</label><input type="text" id="inp5" placeholder="Введите телефон"
            v-model="znachpolauth.telephoneauth"><br>
        <small class="osh">{{ errorsauth.ertelephoneauth }}</small><br><br>

        <small class="osh">{{ errorsauth.ernotpolzovatel }}</small>
        <button id="inp-authorization" @click.prevent="avtoriz()">Авторизоваться</button>
        <p>Если вы не авторизованы то вам нужно <RouterLink :to="{ name: 'regestration' }" title="Личный кабинет">
                Зарегестрироваться</RouterLink>
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

#inp3,
#inp4,
#inp5 {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}

.h2-authoriz {
    font-size: 40px;
}

#inp4 {
    margin-top: 20px;
}

#inp-authorization {
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

#inp-authorization:hover {
    background-color: #ff7b00;
}

.osh {
    color: red;
}
</style>