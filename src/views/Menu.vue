<template>
  <div>
    <NavBar />
    <div
      class="font-semibold mb-4 p-5 text-left text-gray-600 m-5 flex justify-between items-center"
    >
      <router-link
        :to="{
          name: 'viewCategories',
          params: { locationId: state.locationId },
        }"
        class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
      >
        View/Add Category
      </router-link>
      <button
        class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
        v-if="store.numOfCategories > 0"
      >
        Add New Item
      </button>
    </div>
    <div class="flex flex-col justify-center items-center">
      <h1 class="font-semibold text-3xl">
        {{ locationStore.locationName }}
      </h1>
      <h1>{{ locationStore.locationAddress }}</h1>
    </div>
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { reactive, onMounted } from "vue";
import { useUserStore } from "../Store/UserStore";
import { useLocationStore } from "../Store/locationStore";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

const store = useUserStore();
const locationStore = useLocationStore();
const route = useRoute();
const router = useRouter();

const state = reactive({
  userId: "",
  userName: "",
  locationId: route.params.locationId,
  numOfCategories: 0,
});

const getLocationInfo = async (userId, locationId) => {
  try {
    const result = await axios.get(
      `http://localhost:3000/locations?userId=${userId}`
    );
    if (result.status === 200) {
      const locationDetails = result.data.filter(
        (location) => location.id === locationId
      );
      if (locationDetails.length === 1) {
        state.locationName = locationDetails[0].name;
        state.locationAddress = locationDetails[0].address;
        console.log(locationDetails[0]);
        console.log(state.locationName);
      } else {
        console.log("Location not found");
      }
    }
  } catch (error) {
    console.error("Error fetching location info:", error);
  }
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (!user) {
    console.log("No user found, redirecting to signup");
    router.push({ name: "signup" });
    return; // Exit the onMounted hook early if no user info
  } else {
    const userInfo = JSON.parse(user);
    state.userId = userInfo.id;
    state.userName = userInfo.name;

    store.isUserLoggedIn();
    store.displayAllCategories(state.userId, state.locationId);
    store.canUserAccessLocation(state.userId, state.locationId, router);
    locationStore.getLocationInfo(state.userId, state.locationId);
  }
});
</script>
