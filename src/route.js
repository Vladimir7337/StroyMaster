import {createRouter, createWebHashHistory} from "vue-router"

import main from "./components/main.vue"
import catalog from "./components/catalog.vue"
import pageproduct from "./components/pageproduct.vue"
import favourites from "./components/favourites.vue"
import basket from "./components/basket.vue"
import orders from "./components/orders.vue"
import account from "./components/account.vue"
import regestration from "./components/regestration.vue"
import authorization from "./components/authorization.vue"

import changeName from "./components/userCabinet/changeName.vue"
import changePassword from "./components/userCabinet/changePassword.vue"
import changeTelephone from "./components/userCabinet/changeTelephone.vue"

const routes = [
    {path: '/', component: main, name: 'main'},
    {path: '/catalog', component: catalog, name: 'catalog'},
    {path: '/pageproduct/:id', component: pageproduct, name: 'pageproduct'},
    {path: '/favourites', component: favourites, name: 'favourites'},
    {path: '/basket', component: basket, name: 'basket'},
    {path: '/orders', component: orders, name: 'orders'},
    {path: '/account', component: account, name: 'account', children: [
        {path: 'changeName', component: changeName, name: 'changeName'},
        {path: 'changePassword', component: changePassword, name: 'changePassword'},
        {path: 'changeTelephone', component: changeTelephone, name: 'changeTelephone'},
    ]},
    {path: '/regestration', component: regestration, name: 'regestration'},
    {path: '/authorization', component: authorization, name: 'authorization'},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})