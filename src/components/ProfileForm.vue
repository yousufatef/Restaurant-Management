<template>
  <div>
    <NavBar />
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">
          Profile
        </h1>
        <form @submit.prevent>
          <div class="mb-6">
            <input
              v-model="state.name"
              disabled
              type="text"
              placeholder="Enter Your Name"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
          <div class="mb-6">
            <input
              v-model="state.email"
              disabled
              type="email"
              placeholder="Enter Your Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
            />
          </div>
          <div class="mb-6">
            <div class="relative">
              <input
                v-model="state.password"
                :type="showPassword ? 'text' : 'password'"
                disabled
                placeholder="Enter Your Password"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
              />
              <input
                type="checkbox"
                v-model="showPassword"
                class="absolute right-4 top-3 h-5 w-5"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              v-if="editable"
              @click="handleUpdate"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update Now
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from "./NavBar.vue";
import { useRouter } from "vue-router";
import { onMounted, reactive, ref } from "vue";

const state = reactive({
  name: "",
  email: "",
  password: "",
});
const showPassword = ref(false);
const editable = ref(true); // Add editable state to control edit mode
const router = useRouter();

const handleUpdate = () => {
  router.push({
    name: "updateProfile",
  });
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    const userInfo = JSON.parse(user);
    state.name = userInfo.name;
    state.email = userInfo.email;
    state.password = userInfo.password;
    console.log(state.name);
  } else {
    // Handle the case where user-info is not found in localStorage
    console.log("User info not found");
    editable.value = false; // Disable editing if user info is not found
  }
});
</script>
