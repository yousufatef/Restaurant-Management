<template>
  <div>
    <NavBar />
    <form
      @submit.prevent="handleDelete"
      class="flex justify-center items-center h-screen"
    >
      <section class="w-full max-w-md p-8 rounded shadow-lg bg-white">
        <div class="flex flex-col gap-1 mb-5">
          <h1 class="text-3xl font-bold mb-1">
            Delete Restaurant #({{ state.itemLocation }})
          </h1>
          <p class="text-red-600">
            Are you sure you want to delete this location?
          </p>
          <div class="my-2">
            <p><span class="font-bold">Name: </span>{{ state.name }}</p>
            <p><span class="font-bold">Phone: </span>{{ state.phone }}</p>
            <p><span class="font-bold">Address: </span>{{ state.address }}</p>
          </div>
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
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const state = reactive({
  name: "",
  phone: "",
  address: "",
  userId: "",
  itemLocation: "",
});

const router = useRouter();
const route = useRoute();

const handleDelete = async () => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/locations/${state.itemLocation}`
    );
    console.log("Location deleted successfully:", response.data);

    // Clear state variables after successful deletion
    state.name = "";
    state.phone = "";
    state.address = "";

    router.push({ name: "home" });
  } catch (error) {
    console.error("Error deleting location:", error);
    alert("Failed to delete location. Please try again later.");
  }
};

const validatingUserLocation = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/locations?id=${state.itemLocation}&userId=${state.userId}`
    );
    state.name = response.data[0].name;
    state.phone = response.data[0].phone;
    state.address = response.data[0].address;
  } catch (error) {
    console.error("Error fetching location data:", error);
  }
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (!user) {
    router.push({ name: "home" });
  } else {
    state.itemLocation = route.params.locationId;
    state.userId = JSON.parse(user).id;
    validatingUserLocation();
  }
});
</script>
