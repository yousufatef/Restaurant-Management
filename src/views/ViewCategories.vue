<template>
  <div>
    <NavBar />
    <div class="flex justify-between items-center m-5 p-5">
      <router-link
        :to="{
          name: 'addCategories',
          params: { locationId: locationId },
        }"
        class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
      >
        Add Category
      </router-link>
      <router-link
        :to="{
          name: 'menu',
          params: { locationId: locationId },
        }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
      >
        Back to Menu
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import NavBar from "../components/NavBar.vue";

const route = useRoute();
const locationId = ref(route.params.locationId);
console.log(locationId);
</script>
