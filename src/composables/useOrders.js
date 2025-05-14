import { computed, reactive, watch, ref } from "vue";

const orders = ref([]);
try {
    if (localStorage.getItem("orders") === null) {
        orders.value = [
            
        ]
    }
    else {
        orders.value = JSON.parse(localStorage.getItem("orders"))
    }
}

catch (error) {
    orders.value = [
       
    ]
}

watch(
    orders,
    (newValue) => {
        localStorage.setItem("orders", JSON.stringify(newValue))
    },
    {deep: true}
)

function addOrders(authorizationpolzovatelId, numberproduct, totalprice) { 
    orders.value.push ({
        authorizationpolzovatelId: authorizationpolzovatelId,
        numberproduct: numberproduct,
        totalprice: totalprice,
    })
}



export default function useOrders () {
    return {orders, addOrders}
}

// localStorage.clear()