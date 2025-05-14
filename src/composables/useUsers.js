import { computed, reactive, watch, ref } from "vue";

const authorizationpolzovatel = ref()

function setAuthorizedUser(user) {
    authorizationpolzovatel.value = user.id;
}

const users = ref([]);

try {
    if (localStorage.getItem("users") === null) {
        users.value = [{id: 0, name: "Админ",password: "1234", telephone: "+78906785645"}]
    }
    else {
        users.value = JSON.parse(localStorage.getItem("users"))
    }
}

catch (error) {
    users.value = [{id: 0, name: "Админ",password: "1234", telephone: "+78906785645"}]
}

watch(
    users,
    (newValue) => {
        localStorage.setItem("users", JSON.stringify(newValue))
    },
    {deep: true}
)

if (localStorage.getItem("authorizationpolzovatel")) {
    authorizationpolzovatel.value = Number(localStorage.getItem("authorizationpolzovatel"));
}else{
    authorizationpolzovatel.value = NaN
}
  
// Автоматическое сохранение при изменении
watch(
    authorizationpolzovatel,
    (newValue) => {
        localStorage.setItem("authorizationpolzovatel", newValue);
    }
);







// добавление пользователя
function addUser(userName, userPassword, userTelephon) { 
    // высчитываем id пользователя 
    const newUserId = users.value[users.value.length-1].id +1
    // добавляем наконец пользователя  
    users.value.push ({
        // высчитанныый нами ip
        id: newUserId,
        // и полученный извне name
        name: userName,
        password: userPassword,
        telephone: userTelephon,
    })
}



// поиск пользователя
// В функцию передаётся id пользователя, возвращает целиком пользователя
function findUser(userId) { 
    return users.value.find((user)=>user.id === userId)  
}

// удаление пользователя
function deleteUser(deletedUserId) {
    const deletedUserPos = users.value.indexOf(findUser(deletedUserId))
    users.value.splice(deletedUserPos,1)
}

export default function useUsers () {
    return {users, authorizationpolzovatel, addUser, findUser, deleteUser, setAuthorizedUser}
}


console.log(users.value)
// localStorage.clear() 