import { computed, reactive, watch, ref } from "vue";

const basketproducts = ref([]);
try {
    if (localStorage.getItem("basketproducts") === null) {
        basketproducts.value = [
            
        ]
    }
    else {
        basketproducts.value = JSON.parse(localStorage.getItem("basketproducts"))
    }
}

catch (error) {
    basketproducts.value = [
       
    ]
}

watch(
    basketproducts,
    (newValue) => {
        localStorage.setItem("basketproducts", JSON.stringify(newValue))
    },
    {deep: true}
)

function addProductbasket(productId, authorizationpolzovatelId) { 
    // const newFavouriteId = favourites.value[favourites.value.length-1].id +1
    basketproducts.value.push ({
        // id: newFavouriteId,
        productId: productId,
        authorizationpolzovatelId: authorizationpolzovatelId,
        countproduct: 1,
    })
}

function deleteProductbasket(productId) {
    // Находим индекс элемента с указанным productId
    const index = basketproducts.value.findIndex(
        item => item.productId === productId
    );
    
    // Если элемент найден - удаляем его
    if (index !== -1) {
        basketproducts.value.splice(index, 1);
        return true; // Возвращаем true при успешном удалении
    }
    
    return false; // Возвращаем false, если товар не был найден в избранном
}

export default function useBasket () {
    return {basketproducts, addProductbasket, deleteProductbasket}
}

// localStorage.clear()