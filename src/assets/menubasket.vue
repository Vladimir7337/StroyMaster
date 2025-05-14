<script setup></script>
<template>
    <div class="action-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
    </div>
</template>
<style scoped>
.action-link {
    color: #2c3e50;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: all 0.3s;
    padding: 0.5rem;
    border-radius: 4px;
}

.action-link:hover {
    color: #ff7b00;
    background-color: #f5f5f5;
}
</style>