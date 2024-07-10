<template>
  <div>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">
          Update Locations
        </h1>
        <form @submit.prevent="handleUpdate">
          <div class="mb-6">
            <input
              v-model="state.name"
              type="text"
              placeholder="Enter Your Name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              :class="{ 'border-red-500': v$.name.$error }"
            />
            <span v-if="v$.name.$error" class="text-red-500 text-sm">
              Name is required
            </span>
          </div>
          <div class="mb-6">
            <input
              v-model="state.phone"
              type="text"
              placeholder="Enter Your Phone"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              :class="{ 'border-red-500': v$.phone.$error }"
            />
            <span v-if="v$.phone.$error" class="text-red-500 text-sm">
              {{ v$.phone.$errors[0].$message }}
            </span>
          </div>
          <div class="mb-6">
            <input
              v-model="state.address"
              type="text"
              placeholder="Enter Your Address"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              :class="{ 'border-red-500': v$.address.$error }"
            />
            <span v-if="v$.address.$error" class="text-red-500 text-sm">
              Address is required
            </span>
          </div>
          <div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update Now
            </button>
            <router-link
              :to="{ name: 'home' }"
              class="w-full inline-block text-center text-blue-700 font-semibold py-3 px-4 transition duration-200 mt-4"
            >
              Go To Home
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import axios from "axios";

const router = useRouter();
const route = useRoute();
const state = reactive({
  name: "",
  phone: "",
  address: "",
  locationId: "",
  userId: "",
});

const rules = computed(() => ({
  name: { required },
  phone: { required },
  address: { required },
}));

const v$ = useVuelidate(rules, state);

const handleUpdate = async () => {
  v$.value.$validate();

  if (!v$.value.$invalid) {
    try {
      const result = await axios.put(
        `http://localhost:3000/locations/${state.locationId}`,
        {
          name: state.name,
          phone: state.phone,
          address: state.address,
          userId: state.userId,
        }
      );
      alert("Update successful!");
    } catch (error) {
      console.error("Error updating location:", error);
      alert("Update unsuccessful! Please try again.");
    }
  } else {
    alert("Update unsuccessful! Validation failed.");
  }
};

const validatingUserLocation = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/locations/${state.locationId}`
    );
    if (response.status === 200 && response.data.userId === state.userId) {
      state.name = response.data.name;
      state.phone = response.data.phone;
      state.address = response.data.address;
    } else {
      console.warn("No location data found or unauthorized access.");
      alert(
        "Location data not found or you do not have access to this location."
      );
      router.push({ name: "home" });
    }
  } catch (error) {
    console.error("Error fetching location data:", error);
    alert("Error fetching location data. Please try again.");
  }
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    const userInfo = JSON.parse(user);
    state.userId = userInfo.id;
    state.locationId = route.params.locationId;
    validatingUserLocation();
  } else {
    router.push({ name: "signup" });
  }
});
</script>
