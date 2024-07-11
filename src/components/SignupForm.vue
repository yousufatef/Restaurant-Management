<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
      <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">
        Sign Up
      </h1>
      <form @submit.prevent>
        <div class="mb-6">
          <input
            v-model="state.name"
            type="text"
            placeholder="Enter Your Name"
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition duration-200"
            :class="{ 'border-red-500': v$.name.$error }"
          />
          <span v-if="v$.name.$error" class="text-red-500 text-sm"
            >Name is required</span
          >
        </div>
        <div class="mb-6">
          <input
            v-model="state.email"
            type="email"
            placeholder="Enter Your Email"
            class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition duration-200"
            :class="{ 'border-red-500': v$.email.$error }"
          />
          <span v-if="v$.email.$error" class="text-red-500 text-sm">{{
            v$.email.$errors[0].$message
          }}</span>
        </div>
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="state.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter Your Password"
              class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition duration-200"
              :class="{ 'border-red-500': v$.password.$error }"
            />
            <input
              type="checkbox"
              v-model="showPassword"
              class="absolute right-4 top-3 h-5 w-5"
            />
          </div>
          <span v-if="v$.password.$error" class="text-red-500 text-sm"
            >Password is required</span
          >
        </div>
        <div class="flex gap-3">
          <button
            type="submit"
            @click="handleSignup"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded focus:outline-none transition duration-200"
          >
            Sign Up Now
          </button>
          <button
            type="button"
            class="w-full bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold py-3 px-4 rounded focus:outline-none transition duration-200"
            @click="handleLogin"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useUserStore } from "../Store/UserStore";

const store = useUserStore();
const state = reactive({
  name: "",
  email: "",
  password: "",
});
const showPassword = ref(false);

const router = useRouter();
const rules = computed(() => {
  return {
    name: { required },
    email: { required, email },
    password: { required },
  };
});
const v$ = useVuelidate(rules, state);

const handleSignup = async () => {
  try {
    v$.value.$validate();

    if (!v$.value.$invalid) {
      await store.registerUser(state);
      alert("Registration successful!");
      router.push({ name: "home" });
    } else {
      alert("Form validation failed. Please check the fields and try again.");
    }
  } catch (error) {
    alert(
      "An error occurred during the signup process. Please try again later."
    );
  }
};
const handleLogin = () => {
  router.push({ name: "login" }); // Replace routing to signup page
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    router.push({ name: "home" });
  }
});
</script>
