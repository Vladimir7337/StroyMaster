import { computed, reactive, watch, ref } from "vue";

const favourites = ref([]);
try {
    if (localStorage.getItem("favourites") === null) {
        favourites.value = [
            
        ]
    }
    else {
        favourites.value = JSON.parse(localStorage.getItem("favourites"))
    }
}

catch (error) {
    favourites.value = [
       
    ]
}

watch(
    favourites,
    (newValue) => {
        localStorage.setItem("favourites", JSON.stringify(newValue))
    },
    {deep: true}
)

function addFavourite(productId, authorizationpolzovatelId) { 
    // const newFavouriteId = favourites.value[favourites.value.length-1].id +1
    favourites.value.push ({
        // id: newFavouriteId,
        productId: productId,
        authorizationpolzovatelId: authorizationpolzovatelId,
    })
}

function deleteFavourite(productId) {
    // Находим индекс элемента с указанным productId
    const index = favourites.value.findIndex(
        item => item.productId === productId
    );
    
    // Если элемент найден - удаляем его
    if (index !== -1) {
        favourites.value.splice(index, 1);
        return true; // Возвращаем true при успешном удалении
    }
    
    return false; // Возвращаем false, если товар не был найден в избранном
}

export default function useFavourites () {
    return {favourites, addFavourite, deleteFavourite}
}

// localStorage.clear()