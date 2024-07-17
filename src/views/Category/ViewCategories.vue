<template>
  <div>
    <NavBar />
    <div class="p-5">
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
      <div v-if="store.listOfCategories.length > 0" class="overflow-x-auto">
        <caption
          class="font-semibold mb-4 text-left text-gray-600 m-1 flex justify-between items-center"
        >
          <span>All categories is ({{ store.listOfCategories.length }})</span>
          <span>
            <router-link :to="{ name: 'deleteAllLocations' }"
              ><button
                class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded focus:outline-none transition duration-200"
              >
                Delete All Locations
              </button></router-link
            >
          </span>
        </caption>
        <table class="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
          <thead class="bg-gray-500 text-white">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(category, index) in store.listOfCategories"
              :key="index"
              class="hover:bg-gray-100"
            >
              <td class="px-6 py-4 whitespace-nowrap font-bold">
                {{ category.name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-red-600 hover:text-red-900">DELETE</button>
                |
                <button class="text-blue-600 hover:text-blue-900">
                  UPDATE
                </button>
                |
                <button class="text-green-600 hover:text-green-900">
                  VIEW
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="bg-orange-100 p-2 text-gray-600">
        No Locations There :(
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../Store/UserStore";
import { useLocationStore } from "../../Store/locationStore";
import NavBar from "../../components/NavBar.vue";
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

onMounted(async () => {
  const user = localStorage.getItem("user-info");
  if (!user) {
    console.log("No user found, redirecting to signup");
    router.push({ name: "signup" });
    return; // Exit the onMounted hook early if no user info
  } else {
    const userInfo = JSON.parse(user);
    state.userId = userInfo.id;
    state.userName = userInfo.name;
    await store.canUserAccessLocation(state.userId, state.locationId, router);
    await locationStore.getLocationInfo(state.userId, state.locationId);

    // Fetch the list of categories after ensuring access and location info are fetched
    await store.fetchListOfCategories(state.locationId);
  }
  console.log(store.listOfCategories);
});
</script>
