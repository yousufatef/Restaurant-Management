<template>
  <div>
    <NavBar />
    <LocationForm @success="handleSuccess" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import LocationForm from "../components/LocationForm.vue";
import NavBar from "../components/NavBar.vue";

const handleSuccess = (message) => {
  console.log(`Success: ${message}`);
};
</script>
