<template>
  <div>
    <NavBar />
    <div class="flex justify-between items-center m-5 p-5">
      <!-- Router links and other HTML code -->
    </div>

    <div class="flex flex-col justify-center items-center gap-5">
      <div class="flex flex-col justify-center items-center">
        <h1 class="font-semibold text-2xl">
          {{ locationStore.locationName }}
        </h1>
        <h1>{{ locationStore.locationAddress }}</h1>
      </div>
      <div class="w-full max-w-md p-8 rounded shadow-lg bg-white">
        <form @submit.prevent="handleAddCategory">
          <div class="mb-6">
            <input
              type="text"
              placeholder="Enter Category Name"
              v-model="state.categoryName"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition duration-200"
            />
            <span
              v-if="v$.categoryName.$error && v$.categoryName.required"
              class="text-red-500 text-sm"
            >
              Name is required
            </span>
          </div>
          <div class="mt-6">
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none transition duration-200"
            >
              Add New Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "../components/NavBar.vue";
import { useUserStore } from "../Store/UserStore";
import { useLocationStore } from "../Store/locationStore";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required, minLength, maxLength } from "@vuelidate/validators";

const route = useRoute();
const router = useRouter();
const store = useUserStore();
const locationStore = useLocationStore();
const state = reactive({
  userId: "",
  locationId: route.params.locationId,
  categoryName: "",
});
const listOfUserCategories = reactive([]);

const rules = computed(() => ({
  categoryName: { required, minLength: minLength(3), maxLength: maxLength(15) },
}));

const v$ = useVuelidate(rules, state);

const handleAddCategory = async () => {
  try {
    await v$.value.$validate();

    const categoryNameLower = state.categoryName.toLocaleLowerCase();
    const filterCategoryName = listOfUserCategories.filter(
      (v) => v.name.toLocaleLowerCase() === categoryNameLower
    );

    if (!v$.value.$invalid) {
      if (filterCategoryName.length > 0) {
        alert("Category Name already exists.");
      } else {
        await locationStore.addCategory(
          state.categoryName,
          state.userId,
          state.locationId
        );
        setTimeout(() => {
          router.push({
            name: "menu",
            params: { locationId: state.locationId },
          });
        }, 500);
      }
    } else {
      alert("Form validation failed. Please check the fields and try again.");
    }
  } catch (error) {
    alert(
      "An error occurred during the category addition process. Please try again later."
    );
    console.error(error); // Log the error for debugging
  }
};

const displayUserCategories = async (userId, locationId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/categories?userId=${userId}`
    );

    if (response.status === 200) {
      const userCategories = response.data;
      listOfUserCategories.length = 0; // Clear the existing array
      userCategories
        .filter((category) => category.locationId === locationId)
        .forEach((category) => listOfUserCategories.push(category));
      console.log(listOfUserCategories);
    } else {
      console.error("Failed to fetch categories:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching location info:", error);
  }
};

onMounted(async () => {
  const user = localStorage.getItem("user-info");
  if (!user) {
    console.log("No user found, redirecting to signup");
    router.push({ name: "signup" });
    return;
  }

  const userInfo = JSON.parse(user);
  state.userId = userInfo.id;
  state.userName = userInfo.name;

  try {
    await store.canUserAccessLocation(state.userId, state.locationId, router);
    await locationStore.getLocationInfo(state.userId, state.locationId);
    await displayUserCategories(state.userId, state.locationId);
  } catch (error) {
    console.error("Error fetching location info:", error);
    // Handle error (e.g., redirect, show message)
  }
});
</script>
