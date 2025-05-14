<script setup>
import { ref } from 'vue';
import useUsers from "../../composables/useUsers";

const users = useUsers().users

const authorizationpolzovatel = useUsers().authorizationpolzovatel


const newname = ref(null)

const regularnewname = ref(/^[А-ЯЁ][а-яёА-ЯЁ0-9]{3,9}$/)

const errornewname = ref("")

function actnewname() {
    errornewname.value = ""
    // Проверка поля имени
    if (!newname.value) {
        errornewname.value = '*Поле не может быть пустым';
        return
    }
    else if (!regularnewname.value.test(newname.value)) {
        errornewname.value = '*Неверный ввод. Имя должно начинаться с заглавной русской буквы и содержать 4-10 русских букв';
        return
    }


    users.value.forEach(user => {
        if (newname.value == user.name) {
            errornewname.value = "*Ошибка. Уже существует пользователь с таким именем";
            return
        }
    });

    if (useUsers().findUser(authorizationpolzovatel.value).id == 0) {
        errornewname.value = "*Ошибка. Нельзя изменить имя Админа"
        return
    }



    useUsers().findUser(authorizationpolzovatel.value).name = newname.value
    newname.value = null

}

</script>


<template>
    <div class="boxizmname">
        <h3>Изменить имя</h3>
        <form>
            <label for="inp5">Новое имя&nbsp;</label><input type="text" id="inp5" placeholder="Введите новое имя"
                v-model="newname"><br>
            <small class="osh">{{ errornewname }}</small><br><br>
            <input class="btnizmname" type="submit" value="Подтвердить" @click.prevent="actnewname()">
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