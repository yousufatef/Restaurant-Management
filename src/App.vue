<template>
  <div>
    <NavBar />
    <router-view />
  </div>
</template>

<script setup>
import Home from "./views/Home.vue";
import NavBar from "./components/NavBar.vue";
</script>
