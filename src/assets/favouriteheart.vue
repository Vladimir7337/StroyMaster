<script setup></script>
<template>
    <svg class="heart" width="200" height="200" viewBox="0 0 24 24">
        <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
</template>
<style scoped>
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f5f5f5;
}

.heart {
    cursor: pointer;
    overflow: visible;
}

.heart path {
    fill: transparent;
    stroke: black;
    stroke-width: 2px;
    transition: all 0.3s ease;
    /* Переносим тень на сам path */
    filter: drop-shadow(0 0 0 transparent);
}

.heart:hover path {
    fill: red;
    stroke: red;
    filter: drop-shadow(0 0 5px rgba(255, 0, 0, 0.7));
}

svg {
    width: 32px;
    height: 32px;
}
</style>