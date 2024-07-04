<template>
  <div>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="max-w-md w-full bg-white p-8 rounded-lg shadow-xl">
        <h1 class="text-3xl font-extrabold text-center mb-6 text-blue-600">
          Profile
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
            <span v-if="v$.name.$error" class="text-red-500 text-sm"
              >Name is required</span
            >
          </div>
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
          <div>
            <button
              type="submit"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Update Now
            </button>
            <router-link
              :to="{ name: 'home' }"
              class="w-full inline-block text-center text-bg-blue-700 font-semibold py-3 px-4 transition duration-200 mt-4"
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
import { computed, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import axios from "axios";

const showPassword = ref(false);
const router = useRouter();
const state = reactive({
  name: "",
  email: "",
  password: "",
  userId: "",
});
const rules = computed(() => ({
  name: { required },
  email: { required, email },
  password: { required },
}));

const v$ = useVuelidate(rules, state);

const handleUpdate = async () => {
  v$.value.$validate();

  if (!v$.value.$invalid) {
    try {
      const result = await axios.put(
        `http://localhost:3000/users/${state.userId}`,
        { name: state.name, email: state.email, password: state.password }
      );
      console.log(result);
      localStorage.setItem("user-info", JSON.stringify(result.data));
      alert("Update successful!");
    } catch (error) {
      alert("Update unsuccessful! Please try again.");
    }
  } else {
    alert("Update unsuccessful! Validation failed.");
  }
};

onMounted(() => {
  const user = localStorage.getItem("user-info");
  if (user) {
    const userInfo = JSON.parse(localStorage.getItem("user-info"));
    state.name = userInfo.name;
    state.email = userInfo.email;
    state.password = userInfo.password;
    state.userId = userInfo.id;
    console.log(state.name);
  } else {
    console.log("User info not found");
  }
});
</script>
