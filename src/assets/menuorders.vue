<script setup></script>
<template>
    <div class="action-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="16.5" y1="9.4" x2="7.5" y2="4.2"></line>
            <path
                d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z">
            </path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
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