<template>
  <div>
    <NavBar />
    <div class="flex justify-between items-center m-5 p-5">
      <router-link
        :to="{
          name: 'addCategories',
          params: { locationId: state.locationId },
        }"
        class="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
      >
        Add Category
      </router-link>
      <router-link
        :to="{
          name: 'menu',
          params: { locationId: state.locationId },
        }"
        class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none transition duration-200"
      >
        Back to Menu
      </router-link>
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
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../Store/UserStore";
import { useLocationStore } from "../Store/locationStore";
import NavBar from "../components/NavBar.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const locationStore = useLocationStore();
const state = reactive({
  userId: "",
  locationId: route.params.locationId,
  locationName: "",
  locationAddress: "",
});
// const getLocationInfo = async (userId, locationId) => {
//   try {
//     const result = await axios.get(
//       `http://localhost:3000/locations?userId=${userId}`
//     );
//     if (result.status === 200) {
//       const locationDetails = result.data.filter(
//         (location) => location.id === locationId
//       );
//       if (locationDetails.length === 1) {
//         state.locationName = locationDetails[0].name;
//         state.locationAddress = locationDetails[0].address;
//         console.log(locationDetails[0]);
//         console.log(state.locationName);
//       } else {
//         console.log("Location not found");
//       }
//     }
//   } catch (error) {
//     console.error("Error fetching location info:", error);
//   }
// };
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
    store.canUserAccessLocation(state.userId, state.locationId, router);
    locationStore.getLocationInfo(state.userId, state.locationId);
  }
});
</script>
