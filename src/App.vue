<script setup>
import { useRouter } from 'vue-router'
import useProducts from './composables/useProducts';

const router = useRouter();

import { RouterLink } from 'vue-router';

import menupoisk from "./assets/menupoisk.vue"
import menuheart from './assets/menuheart.vue';
import menubasket from './assets/menubasket.vue';
import menuorders from './assets/menuorders.vue';
import menuaccount from './assets/menuaccount.vue';
import { ref } from 'vue';

const poiskznach = ref("")

function poisk() {
    useProducts().setPoisk(poiskznach.value)
    router.push({ name: 'catalog' })
    poiskznach.value = ""
}

</script>

<template>
    <div class="bodyContainer">
        <header>
            <RouterLink :to="{ name: 'main' }" class="logoflex">
                <img src="./assets/paint-roller.png" alt="StroyMaster" class="logoicon">
                <p class="logoname">StroyMaster</p>
            </RouterLink>
            <RouterLink :to="{ name: 'catalog' }" class="catalog">Каталог</RouterLink>

            <div class="search-container">
                <form @submit.prevent="poisk" class="search-form">
                    <input id="inppoisk" type="text" placeholder="Поиск товаров..." class="search-input"
                        v-model="poiskznach">
                    <button type="submit" class="search-button" title="Поиск">
                        <menupoisk />
                    </button>
                </form>
            </div>

            <nav class="nav-header">
                <RouterLink :to="{ name: 'favourites' }" title="Избранное">
                    <menuheart />
                </RouterLink>
                <RouterLink :to="{ name: 'basket' }" title="Корзина">
                    <menubasket />
                </RouterLink>
                <RouterLink :to="{ name: 'orders' }" title="Заказы">
                    <menuorders />
                </RouterLink>
                <RouterLink :to="{ name: 'account' }" title="Личный кабинет">
                    <menuaccount />
                </RouterLink>
            </nav>
        </header>

        <main>
            <RouterView />

        </main>

        <footer class="site-footer">
            <div class="footer-container">

                <div class="footer-column">
                    <h3 class="footer-title">Контакты</h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>г. Санкт-Петербург, ул. Строителей, 123</span>
                        </li>
                        <li class="footer-item">
                            <i class="fas fa-phone-alt"></i>
                            <a href="tel:+78001234567">8 (800) 123-45-67</a>
                        </li>
                        <li class="footer-item">
                            <i class="fas fa-envelope"></i>
                            <a href="mailto:stroymaster2025@email.ru">stroymaster2025@email.ru</a>
                        </li>
                        <li class="footer-item">
                            <i class="fas fa-clock"></i>
                            <span>Пн-Пт: 9:00-18:00</span>
                        </li>
                    </ul>
                </div>

                <div class="footer-column">
                    <h3 class="footer-title">Навигация</h3>
                    <ul class="footer-list">
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'main' }">Главная</RouterLink>
                        </li>
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'catalog' }">Каталог</RouterLink>
                        </li>
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'favourites' }">Избранное</RouterLink>
                        </li>
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'basket' }">Корзина</RouterLink>
                        </li>
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'orders' }">Заказы</RouterLink>
                        </li>
                        <li class="footer-item">
                            <RouterLink :to="{ name: 'account' }">Личный кабинет</RouterLink>
                        </li>
                    </ul>
                </div>


                <div class="footer-column">
                    <div class="footer-section">
                        <h3 class="footer-title">Мы в соцсетях</h3>
                        <div class="social-icons">
                            <a href="https://vk.com/feed" class="social-icon" aria-label="ВКонтакте">
                                <i class="fab fa-vk"></i>
                            </a>
                            <a href="https://web.telegram.org/k/" class="social-icon" aria-label="Telegram">
                                <i class="fab fa-telegram-plane"></i>
                            </a>
                            <a href="https://www.youtube.com/" class="social-icon" aria-label="YouTube">
                                <i class="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h3 class="footer-title">Способы оплаты</h3>
                        <div class="payment-methods">
                            <i class="fab fa-cc-visa"></i>
                            <i class="fab fa-cc-mastercard"></i>
                            <i class="fab fa-cc-mir"></i>
                            <i class="fas fa-credit-card"></i>
                        </div>
                    </div>
                </div>


                <div class="footer-column">
                    <h3 class="footer-title">Мобильное приложение</h3>
                    <p>Скачайте наше приложение для удобных покупок</p>
                    <div class="app-download">
                        <a href="#" class="app-link">
                            <i class="fab fa-apple"></i>
                            <span>App Store</span>
                        </a>
                        <a href="#" class="app-link">
                            <i class="fab fa-google-play"></i>
                            <span>Google Play</span>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <div class="copyright">© 2025 StroyMaster. Все права защищены.</div>
                <div class="footer-links">
                    <a href="#">Политика конфиденциальности</a>
                    <a href="#">Пользовательское соглашение</a>
                </div>
            </div>
        </footer>
    </div>


</template>

<style scoped>
.bodyContainer {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

main {
    flex-grow: 1;
}

header {
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    z-index: 100;
    top: 0;
    padding: 0.5rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    height: 50px;
    width: 1235px;
}

.logoflex {
    display: flex;
    gap: 20px;
    text-decoration: none;
}

.logoicon {
    width: 32px;
    height: 32px;
    margin-top: 20px;
}


.logoname {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c3e50;
    margin-right: 2rem;
    font-family: 'Sora', sans-serif;
}

.catalog {
    color: white;
    text-decoration: none;
    margin: 0 1rem;
    font-weight: 500;
    transition: color 0.3s;
    background-color: black;
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
}

.catalog:hover {
    background-color: #ff7b00;
    transition: all 0.3s;
}

.search-container {
    flex-grow: 1;
    max-width: 500px;
    margin: 0 2rem;
}

.search-form {
    display: flex;
    width: 100%;
}

.search-input {
    flex-grow: 1;
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.3s;
}

.search-input:focus {
    border-color: #ff7b00;
}

.search-button {
    background-color: black;
    color: white;
    border: none;
    padding: 0 1rem;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
}

.search-button:hover {
    background-color: #ff7b00;
}

.nav-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
}

/* Подвал сайта */

footer {
    margin-top: 40px;
}

.site-footer {
    background-color: #000;
    color: #fff;
    padding: 40px 0 20px;
    font-family: 'Arial', sans-serif;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
}

.footer-column {
    flex: 1;
    min-width: 200px;
    margin-bottom: 30px;
    padding: 0 15px;
}

.footer-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: #fff;
    position: relative;
    padding-bottom: 10px;
}

.footer-title:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background-color: #ff7b00;
}

.footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.footer-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
}

.footer-item i {
    color: #ff7b00;
    width: 20px;
    margin-right: 10px;
    font-size: 16px;
}

.footer-item a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s;
}

.footer-item a:hover {
    color: #ff7b00;
}

.social-icons {
    display: flex;
    gap: 15px;
    margin-top: 15px;
}

.social-icon {
    color: #fff;
    background-color: #333;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.social-icon:hover {
    background-color: #ff7b00;
    transform: translateY(-3px);
}

.social-icon i {
    font-size: 16px;
}

.payment-methods {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
}

.payment-methods i {
    color: #ccc;
    font-size: 28px;
    transition: color 0.3s;
}

.payment-methods i:hover {
    color: #ff7b00;
}

.app-download {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.app-link {
    display: flex;
    align-items: center;
    padding: 8px 15px;
    background-color: #333;
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    transition: all 0.3s;
    width: fit-content;
}

.app-link:hover {
    background-color: #ff7b00;
}

.app-link i {
    font-size: 20px;
    margin-right: 10px;
    color: #fff;
}

.footer-bottom {
    max-width: 1200px;
    margin: 30px auto 0;
    padding: 20px;
    border-top: 1px solid #333;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
}

.copyright {
    color: #999;
    font-size: 14px;
}

.footer-links a {
    color: #999;
    text-decoration: none;
    margin-left: 20px;
    font-size: 14px;
    transition: color 0.3s;
}



main {
    display: flex;
    /* Создаем гибкую структуру */
    flex-direction: column;
    /* Располагаем элементы вертикально */
    min-height: 32vh;
    /* Минимальная высота равна высоте вьюпорта */
}
</style>
