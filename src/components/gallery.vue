<script setup>
import { ref, onMounted } from 'vue'
import imggallery1 from "../assets/imggallery1.webp"
import imggallery2 from "../assets/imggallery2.jpg"
import imggallery3 from "../assets/imggallery3.jpg"
import imggallery4 from "../assets/imggallery4.jpg"

// Карусель
const x = ref(0)
const carouselItems = ref([])

function funR() {
    if (x.value < carouselItems.value.length - 1) {
        x.value += 1
    } else {
        x.value = 0
    }
    updateTransform()
}

function funL() {
    if (x.value > 0) {
        x.value -= 1
    } else {
        x.value = carouselItems.value.length - 1
    }
    updateTransform()
}

function updateTransform() {
    document.documentElement.style.setProperty("--transfX", x.value * (-1000) + "px")
}

// Переходы
const reg = /[0-9]/g
const inputValue = ref('')
const outputMessage = ref('')

function perehod() {
    const a = inputValue.value

    if (a.match(reg)) {
        if (a.length == a.match(reg).length) {
            const num = Number(a)

            if (num > 0 && num <= carouselItems.value.length) {
                outputMessage.value = "Слайд найден"
                x.value = num - 1
                updateTransform()
            } else {
                outputMessage.value = "Слайд не найден"
            }
        } else {
            outputMessage.value = "Неверный код"
        }
    } else {
        outputMessage.value = "Неверный код"
    }
}

// Инициализация после монтирования компонента
onMounted(() => {
    carouselItems.value = document.getElementsByClassName('def')
    updateTransform() // Установим начальное положение
})
</script>

<template>
    <div class="flexbox">
        <div class="box-carousel">
            <div class="buttons"> <button id="btnM" @click="funL">&lt;</button> </div>
            <div class="wrapper">
                <div class="carousel">
                    <div class="def">
                        <div class="slide-content"> <img :src=imggallery1 alt="Маляр с обоями">
                            <div class="slide-overlay">
                                <h3>StroyMaster</h3>
                                <p>Интернет магазин стройматериалов</p>
                            </div>
                        </div>
                    </div>
                    <div class="def">
                        <div class="slide-content"> <img :src=imggallery2 alt="Обои">
                            <div class="slide-overlay">
                                <h3>Обои на любой вкус</h3>
                                <p>От классики до современных 3D-решений</p>
                            </div>
                        </div>
                    </div>
                    <div class="def">
                        <div class="slide-content"> <img :src=imggallery3 alt="Плитка">
                            <div class="slide-overlay">
                                <h3>Плитка для каждого помещения</h3>
                                <p>Водостойкая, износостойкая, дизайнерская</p>
                            </div>
                        </div>
                    </div>
                    <div class="def">
                        <div class="slide-content"> <img :src=imggallery4 alt="Краска">
                            <div class="slide-overlay">
                                <h3>Краски для любых поверхностей</h3>
                                <p>Акриловые, силиконовые, фактурные - профессиональные составы</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons"> <button id="btnP" @click="funR">&gt;</button> </div>
        </div>
    </div>
</template>
<style scoped>
.flexbox {
    display: flex;
    justify-content: center;
    margin-top: 40px;
}

:root {
    --transfX: 0px;
}

.wrapper {
    width: 1000px;
    display: flex;
    overflow: hidden;
    border-radius: 16px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
}

.wrapper:hover {
    box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.2);
}

.carousel {
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    transform: translateX(var(--transfX));
}

.def {
    overflow: hidden;
    width: 1000px;
    height: 500px;
    position: relative;
}

.slide-content {
    position: relative;
    width: 100%;
    height: 100%;
}

.slide-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
}

.def:hover .slide-content img {
    transform: scale(1.03);
}

.slide-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 100%);
    color: white;
    padding: 40px;
    padding-top: 80px;
}

.slide-overlay h3 {
    font-size: 32px;
    margin-bottom: 12px;
    color: white;
    font-weight: 800;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.slide-overlay p {
    font-size: 20px;
    margin-bottom: 0;
    line-height: 1.5;
    max-width: 80%;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.box-carousel {
    display: flex;
    gap: 15px;
    align-items: center;
    position: relative;
}

#btnM,
#btnP {
    width: 60px;
    height: 60px;
    font-weight: 800;
    font-size: 24px;
    border-radius: 50%;
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: black;
}

#btnM:hover,
#btnP:hover {
    background-color: #ff7b00;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
</style>
