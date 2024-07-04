<template>
  <div>
    <NavBar />
    <div class="flex justify-end items-center p-4">
      <p class="mr-2 font-semibold">Welcome, {{ username }}</p>
      <router-link :to="{ name: 'profile' }">
        <button type="button" class="bg-blue-600 text-white px-4 py-2 rounded">
          Profile
        </button>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";

const router = useRouter();
const username = ref("");

onMounted(() => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));
  if (!userInfo) {
    console.log("No user found, redirecting to signup");
    router.push({ name: "signup" });
  } else {
    console.log(userInfo.name);
    if (userInfo.name) {
      // Corrected conditional check
      username.value = userInfo.name;
    }
  }
});
</script>
