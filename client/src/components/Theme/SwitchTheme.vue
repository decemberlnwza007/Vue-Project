<template>
    <div>
        <button @click="toggleTheme">
            Switch to {{ isDarkTheme ? 'Light' : 'Dark' }} Theme
        </button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const isDarkTheme = ref(false)

onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    isDarkTheme.value = savedTheme === 'dark'
    if (isDarkTheme.value) {
        document.body.classList.add('dark-theme')
    }
})

const toggleTheme = () => {
    isDarkTheme.value = !isDarkTheme.value

    if (isDarkTheme.value) {
        document.body.classList.add('dark-theme')
    } else {
        document.body.classList.remove('dark-theme')
    }
}
</script>

<style scoped>
button {
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    background-color: #6a11cb;
    color: white;
    cursor: pointer;
}

button:hover {
    background-color: #5a0f9b;
}
</style>