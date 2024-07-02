<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
      <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">
        Login
      </h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-6">
          <input
            v-model="state.email"
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
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const state = reactive({
  email: "",
  password: "",
});

const showPassword = ref(false);

const handleSubmit = () => {
  console.log("Form submitted!", state);
};
</script>
