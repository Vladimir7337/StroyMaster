<script setup>
import { reactive, ref } from 'vue';
import useUsers from "../../composables/useUsers";
import { onMounted } from 'vue';

const users = useUsers().users

const authorizationpolzovatel = useUsers().authorizationpolzovatel

const newpassword = ref(null)

const regularpassword = ref(/^[a-zA-Zа-яёА-ЯЁ0-9?!][a-zA-Zа-яёА-ЯЁ0-9?!]{3,9}$/)

const errorpassword = ref("")

function actnewpassword() {
    // Проверка поля пароля
    if (!newpassword.value) {
        errorpassword.value = '*Поле не может быть пустым';
    } else if (!regularpassword.value.test(newpassword.value)) {
        errorpassword.value = '*Неверный ввод. Пароль должен содержать 4-10 символов (русские буквы, цифры, ! или ?)';
    } else {
        errorpassword.value = '';
    }

    if (useUsers().findUser(authorizationpolzovatel.value).id == 0) {
        errorpassword.value = "*Ошибка. Нельзя изменить пароль Админа"
    }

    if (!errorpassword.value) {
        useUsers().findUser(authorizationpolzovatel.value).password = newpassword.value
        newpassword.value = null
    }

}

const bulls = reactive({
    bullformone: true,
    bullformtwo: false,
})

onMounted(() => {
    // Сбрасываем при каждом монтировании компонента
    bulls.bullformone = true;
    bulls.bullformtwo = false;
});

const erroroldpassword = ref(null)

const oldpassword = ref(null)

function provercaold() {
    if (useUsers().findUser(authorizationpolzovatel.value).password == oldpassword.value) {
        bulls.bullformone = false
        bulls.bullformtwo = true
    }
    else {
        erroroldpassword.value = "*Неправильный пароль"
    }
}

</script>


<template>
    <div class="boxizmparol">
        <h3>Изменить пароль</h3>
        <form v-if="bulls.bullformone">
            <label for="inpx">Старый пароль&nbsp;</label><input type="text" id="inpx"
                placeholder="Введите страрый пароль" v-model="oldpassword"><br>
            <small class="osh">{{ erroroldpassword }}</small><br><br>
            <input class="btnizmparol" type="submit" value="Подтвердить" @click.prevent="provercaold()">
        </form>
        <br>
        <form v-if="bulls.bullformtwo">
            <label for="inpy">Новый пароль&nbsp;</label><input type="text" id="inpy" placeholder="Введите новый пароль"
                v-model="newpassword"><br>
            <small class="osh">{{ errorpassword }}</small><br><br>
            <input class="btnizmparol" type="submit" value="Подтвердить" @click.prevent="actnewpassword()">
        </form>
    </div>
</template>
<style scoped>
.boxizmparol {
    width: 400px;
    height: 400px;
    border-radius: 10px;
    margin-left: 80px;
    margin-top: 20px;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

#inpx {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}

#inpy {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}

.btnizmparol {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 150px;
    height: 30px;
    transition: transform 0.3s ease;
    border: none;
}

.btnizmparol:hover {
    background-color: #ff7b00;
}

.osh {
    color: red;
}
</style>