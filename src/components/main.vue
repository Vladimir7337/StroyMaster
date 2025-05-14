<script setup>
import { RouterLink } from 'vue-router';
import useProducts from '../composables/useProducts';
import gallery from './gallery.vue';

const products = useProducts().products;
</script>

<template>
    <section>
        <gallery />
    </section>
    <section class="section-description">
        <h2 class="sectionh2descount">Акции</h2>
        <hr class="divider">

        <div class="flextovarskidka">
            <RouterLink :to="{ name: 'pageproduct', params: { id: product.id } }" v-for="product in products"
                :key="product.id" class="discountrouter">

                <template v-if="product.discount != ''" class="product-card">
                    <div class="product-card">
                        <img :src="product.imgproduct" :alt="product.title" class="imgtovar">
                        <div class="flexdiscount">
                            <h2>{{ Number(product.price) - (Number(product.price) / 100 * product.discount)
                            }}&nbsp;&#8381;
                            </h2>
                            <div class="discountflex2">
                                <s>{{ Number(product.price) }}&nbsp;&#8381;</s>
                                <p class="discountbox">-{{ product.discount }}%</p>
                            </div>
                        </div>
                        <p>{{ product.title }}</p>
                    </div>
                </template>

            </RouterLink>
        </div>

    </section>
    <section class="about-section">
        <h2 class="textonas">О нас</h2>
        <hr class="divider">
        <div class="about-content">
            <div class="about-text">
                <p>StroyMaster - это современный интернет-магазин строительных материалов, работающий на рынке с 2025
                    года.
                    Мы предлагаем широкий ассортимент качественных отделочных материалов от ведущих производителей.</p>

                <p>Наша миссия - сделать ремонт простым и доступным для каждого. В каталоге вы найдете множество
                    товаров: краски, обои, плитку.</p>

                <p>Мы гордимся:</p>
                <ul class="features-list">
                    <li>Прямыми поставками от производителей</li>
                    <li>Гарантией качества на все товары</li>
                    <li>Быстрой доставкой по всей Ленинградской области и Санкт - Петербургу</li>
                    <li>Постояными скидками и прятными ценами</li>
                </ul>
            </div>
            <img src="https://агалатово.рф/images/pdf/news/lenobl.jpg"
                alt="Наши консультанты помогают с выбором материалов" class="about-image">
        </div>
    </section>
</template>

<style scoped>
.sectionh2descount {
    display: flex;
    justify-content: center;
    font-size: 40px;
}


.imgtovar {
    width: 250px;
    height: 250px;
    margin-left: 25px;
}

.flexdiscount {
    display: flex;
    gap: 20px;
    align-items: center;
}

.discountbox {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70px;
    height: 30px;
    background-color: #ff7b00;
    border-radius: 10px;
    color: white;
    font-weight: bold;
}

.discountflex2 {
    display: flex;
    align-items: center;
    gap: 10px;
}

.product-card {
    padding: 20px;
    border-radius: 8px;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;

    /* Ширина карточки */
    width: 300px;
    /* Высота карточки */
    height: 380px;

    text-decoration: none;
    color: black;
    -webkit-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    -moz-box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
    box-shadow: 0px 0px 51px 2px rgba(34, 60, 80, 0.19);
}

.product-card:hover {
    transform: translateY(-5px);
}

.discountrouter {
    color: black;
    text-decoration: none;
}

.flextovarskidka {
    display: flex;
    justify-content: center;
    gap: 5px;
    margin-bottom: 40px;
    margin-top: 40px;
}


/* О нас */

.about-section {
    width: 1200px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
}

.textonas {
    display: flex;
    justify-content: center;
    text-align: center;
    color: black;
    font-size: 40px;
    margin-bottom: 15px;
}

.divider {
    width: 300px;
    height: 3px;
    background-color: #ff914d;
    border: none;
    margin: 0 auto 30px;
}

.about-content {
    display: flex;
    align-items: center;
    margin-left: 20px;
    gap: 20px;
}

.about-text {
    flex: 1;
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
}



.features-list {
    margin-top: 20px;
    padding-left: 20px;
}

.about-image {
    width: 600px;
    height: 300px;
}
</style>