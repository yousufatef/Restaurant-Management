<template>
  <div>
    <NavBar />
    <form
      @submit.prevent="handleDelete"
      class="flex justify-center items-center h-screen"
    >
      <section class="w-full max-w-md p-8 rounded shadow-lg bg-white">
        <div class="flex flex-col gap-1 mb-5">
          <h1 class="text-3xl font-bold mb-1">Delete Restaurant Locations</h1>
          <p class="text-red-600">
            Are you sure you want to delete All Locations?
          </p>
        </div>
        <div class="flex gap-3 justify-center">
          <button
            type="submit"
            class="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-200"
          >
            Delete
          </button>
          <router-link
            :to="{ name: 'home' }"
            class="w-full text-blue-700 font-semibold text-center inline-block py-2 px-4"
            aria-label="Go Back"
          >
            Go Back
          </router-link>
        </div>
      </section>
    </form>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { reactive, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const userId = ref("");
const allLocationsId = reactive([]);

const router = useRouter();
const route = useRoute();

const handleDelete = async () => {
  try {
    for (let i = 0; i < allLocationsId.length; i++) {
      const response = await axios.delete(
        `http://localhost:3000/locations/${allLocationsId[i]}`
      );
      console.log("Location deleted successfully:", response.data);
    }
    router.push({ name: "home" });
  } catch (error) {
    console.error("Error deleting location:", error);
    alert("Failed to delete location. Please try again later.");
  }
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (!user) {
    router.push({ name: "home" });
  } else {
    userId.value = JSON.parse(user).id;
    const result = axios
      .get(`http://localhost:3000/locations/?userId=${userId.value}`)
      .then((response) => {
        const responseLen = response.data.length;
        for (let i = 0; i < responseLen; i++) {
          allLocationsId.push(response.data[i].id);
        }
      });
  }
});
</script>
