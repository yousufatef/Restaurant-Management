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
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
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
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            @click="handleLogin"
          >
            Login
          </button>
          <button
            type="button"
            class="w-full bg-gray-200 hover:bg-gray-300 text-blue-700 font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            @click="handleRegister"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import axios from "axios";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "../Store/UserStore";

const state = reactive({
  email: "",
  password: "",
});
const store = useUserStore();

const showPassword = ref(false);
const router = useRouter();

const rules = computed(() => {
  return {
    email: { required, email },
    password: { required },
  };
});

const v$ = useVuelidate(rules, state);

const handleLogin = async () => {
  await v$.value.$validate(); // Assuming $validate() is async
  if (!v$.value.$invalid) {
    const response = await axios.get(`http://localhost:3000/users`, {
      params: {
        email: state.email,
        password: state.password,
      },
    });
    if (response.status === 200 && response.data.length > 0) {
      localStorage.setItem("user-info", JSON.stringify(response.data[0]));
      // const userInfo = JSON.parse(localStorage.getItem("user-info"));
      // console.log(userInfo.name);
      alert("Logged In");
      router.push({ name: "home" });
    } else {
      alert("Login failed. Invalid email or password.");
    }
  }
};

const handleRegister = () => {
  router.push({ name: "signup" }); // Replace routing to signup page
};
</script>
