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
        <form @submit.prevent="handleUpdateCategory">
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
              Update Category
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import NavBar from "../../components/NavBar.vue";
import { useUserStore } from "../../Store/UserStore";
import { useLocationStore } from "../../Store/locationStore";
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
  categoryId: route.params.categoryId,
});

const currentCategoryName = ref("");

const listOfUserCategories = reactive([]);

const rules = computed(() => ({
  categoryName: { required, minLength: minLength(3), maxLength: maxLength(15) },
}));

const v$ = useVuelidate(rules, state);

const handleUpdateCategory = async () => {
  try {
    await v$.value.$validate();

    const categoryNameLower = state.categoryName.toLowerCase();
    const filterCategoryName = listOfUserCategories.filter(
      (v) => v.name.toLowerCase() === categoryNameLower
    );

    if (!v$.value.$invalid) {
      if (filterCategoryName.length > 0) {
        console.log("Category name already exists.");
        // Use a notification system to inform the user
      } else {
        try {
          const result = await axios.put(
            `http://localhost:3000/categories/${state.categoryId}`,
            {
              name: state.categoryName,
              userId: state.userId,
              locationId: state.locationId,
            }
          );
          if (result.status === 200) {
            console.log("Updated Category Name");
            setTimeout(() => {
              router.push({
                name: "viewCategories",
                params: { locationId: state.locationId },
              });
            }, 500);
          }
        } catch (error) {
          console.error("Error updating category:", error);
          // Use a notification system to inform the user
        }
      }
    } else {
      // Use a notification system to inform the user
      console.error("Validation errors:", v$.value.$errors);
    }
  } catch (error) {
    // Use a notification system to inform the user
    console.error("Unexpected error:", error);
  }
};

const fetchCategoryInfo = async (categoryId) => {
  try {
    const response = await axios.get(
      `http://localhost:3000/categories/${categoryId}`
    );

    if (response.status === 200) {
      const categoryData = response.data;
      currentCategoryName.value = categoryData.name;
      state.categoryName = categoryData.name;
    } else {
      console.error("Failed to fetch category info:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching category info:", error);
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
    await store.canUserAccessCategory(
      state.userId,
      state.locationId,
      state.categoryId,
      router
    );
    await locationStore.getLocationInfo(state.userId, state.locationId);
    await displayUserCategories(state.userId, state.locationId);
    await fetchCategoryInfo(state.categoryId);
  } catch (error) {
    console.error("Error during initialization:", error);
  }
});
</script>
