<template>
  <nav
    class="bg-gray-500 text-white flex justify-center gap-5 items-center p-3 my-2 mx-5"
  >
    <div>
      <router-link to="/" class="text-xl font-bold">Home</router-link>
    </div>
    <button
      class="text-white bg-transparent border border-white py-2 px-4 rounded hover:bg-white hover:text-gray-700 transition duration-300"
      @click="Logout"
    >
      Logout
    </button>
  </nav>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
const router = useRouter();
const Logout = () => {
  localStorage.clear();
  router.push({ name: "login" });
};
</script>
