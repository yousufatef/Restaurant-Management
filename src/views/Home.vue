<template>
  <div>
    <NavBar />
    <div class="flex justify-end items-center p-4">
      <p class="mr-2 font-semibold">Welcome, {{ username }}</p>
      <router-link :to="{ name: 'profile' }">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Profile
        </button>
      </router-link>
    </div>
    <router-link :to="{ name: 'addNewLocation' }">
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 mx-4 mt-4 rounded"
      >
        Add New Restaurant
      </button>
    </router-link>
    <UserLocations :allLocations="allLocations" />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import axios from "axios";
import UserLocations from "../components/UserLocations.vue";

const router = useRouter();
const username = ref("");
const userId = ref("");
const allLocations = ref([]);

onMounted(() => {
  const userInfo = JSON.parse(localStorage.getItem("user-info"));

  if (!userInfo) {
    console.log("No user found, redirecting to signup");
    router.push({ name: "signup" });
    return; // Exit the onMounted hook early if no user info
  }

  userId.value = userInfo.id;

  if (userInfo.name) {
    username.value = userInfo.name;
  }

  axios
    .get(`http://localhost:3000/locations?userId=${userId.value}`)
    .then((response) => {
      allLocations.value = response.data;
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });
});
</script>
