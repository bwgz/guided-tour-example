<script setup lang="ts">

const clickHandler = () => {
    localStorage.removeItem('home-world-tour');
    localStorage.removeItem('new-about-page-tour');
} 
</script>

<template>
    <div class="about">
        <h1>This is an about page</h1>
        <button @click="clickHandler">Reset Tours</button>
    </div>
</template>
