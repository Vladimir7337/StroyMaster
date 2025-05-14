<script setup>
import { ref } from 'vue';
import useUsers from "../../composables/useUsers";

const users = useUsers().users

const authorizationpolzovatel = useUsers().authorizationpolzovatel


const newtelephone = ref(null)

const regularnewtelephone = ref(/^(\+7|7|8)\d{10}$/)

const errornewtelephone = ref("")

function actnewtelephone() {
    // Сбрасываем ошибку перед проверками
    errornewtelephone.value = '';

    // 1. Проверка на пустое поле
    if (!newtelephone.value) {
        errornewtelephone.value = '*Поле не может быть пустым';
        return; // Важно: прекращаем выполнение
    }

    // 2. Проверка формата телефона
    if (!regularnewtelephone.value.test(newtelephone.value)) {
        errornewtelephone.value = '*Неверный ввод. Номер может содержать только цифры и может содержать в начале только одно значение из +7/7/8';
        return;
    }

    // 3. Проверка на админа
    if (useUsers().findUser(authorizationpolzovatel.value).id == 0) {
        errornewtelephone.value = "*Ошибка. Нельзя изменить телефон Админа";
        return;
    }

    // Если все проверки пройдены - сохраняем
    useUsers().findUser(authorizationpolzovatel.value).telephone = newtelephone.value;
    newtelephone.value = null;
}

</script>


<template>
    <div class="boxizmname">
        <h3>Изменить телефон</h3>
        <form>
            <label for="inp5">Новый телефон&nbsp;</label><input type="text" id="inp5"
                placeholder="Введите новый телефон" v-model="newtelephone"><br>
            <small class="osh">{{ errornewtelephone }}</small><br><br>
            <input class="btnizmname" type="submit" value="Подтвердить" @click.prevent="actnewtelephone()">
        </form>
    </div>
</template>
<style scoped>
.boxizmname {
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

#inp5 {
    border-radius: 5px;
    height: 20px;
    width: 200px;
}

.btnizmname {
    background-color: black;
    color: white;
    font-weight: bold;
    border-radius: 10px;
    width: 150px;
    height: 30px;
    transition: transform 0.3s ease;
    border: none;
}

.btnizmname:hover {
    background-color: #ff7b00;
}

.osh {
    color: red;
}
</style>