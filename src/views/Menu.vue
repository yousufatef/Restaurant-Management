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
  </div>
</template>

<script setup>
import NavBar from "../components/NavBar.vue";
import { reactive, onMounted } from "vue";
import { useUserStore } from "../Store/UserStore";
import { useRoute, useRouter } from "vue-router";

const store = useUserStore();
const route = useRoute();
const router = useRouter();

const state = reactive({
  userId: "",
  userName: "",
  locationId: route.params.locationId,
  numOfCategories: 0, // assuming this comes from store or somewhere
});

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
    console.log("Location ID:", state.locationId);
    store.isUserLoggedIn();
    store.displayAllCategories(state.userId, state.locationId);
    // Example of setting numOfCategories, replace with actual logic
  }
});
</script>
