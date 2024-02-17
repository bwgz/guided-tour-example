<script setup lang="ts">
import { useTour} from "@/tours/tours";
import GuidedTour from "@/components/GuidedTour.vue";

const tour = useTour("new-about-page-tour");
</script>

<template>
  <nav  hello-world-tour-step="5">
    <router-link to="/">Home</router-link> |
    <router-link to="/about"><span new-about-page-tour-step="1">About</span></router-link>
  </nav>
  <router-view/>
  <GuidedTour v-if="tour" :tour="tour" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
