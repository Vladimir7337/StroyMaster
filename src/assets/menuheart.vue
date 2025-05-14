<script setup></script>
<template>
    <div class="action-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
                d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
            </path>
        </svg>
    </div>
</template>
<style>
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