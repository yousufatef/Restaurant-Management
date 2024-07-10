<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-md p-8 rounded shadow-lg bg-white">
      <form @submit.prevent="addLocation">
        <LocationFormField
          v-model="state.name"
          label="Restaurant Name"
          placeholder="Enter Restaurant Name"
          :error="v$.name.$error ? v$.name.$errors[0].$message : ''"
        />

        <LocationFormField
          v-model="state.phone"
          label="Phone Number"
          placeholder="Enter Phone Number"
          :error="v$.phone.$error ? v$.phone.$errors[0].$message : ''"
        />

        <LocationFormField
          v-model="state.address"
          label="Restaurant Address"
          placeholder="Enter Restaurant Address"
          :error="v$.address.$error ? v$.address.$errors[0].$message : ''"
        />

        <div class="mt-6">
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add New
          </button>
        </div>

        <div
          v-if="successMessage"
          class="mt-4 p-4 bg-green-100 border font-semibold border-green-400 text-green-700 rounded-lg flex items-center"
        >
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, defineEmits } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useLocationStore } from "../Store/locationStore";
import { useRouter } from "vue-router";
import LocationFormField from "./LocationFormField.vue";

// Define emits
const emit = defineEmits(["close", "success"]);

const state = reactive({
  name: "",
  phone: "",
  address: "",
});
const successMessage = ref("");

// Validation rules
const rules = computed(() => ({
  name: { required },
  phone: { required, minLength: minLength(11) },
  address: { required },
}));

const v$ = useVuelidate(rules, state);
const store = useLocationStore();
const router = useRouter();

// Function to add a new location
const addLocation = async () => {
  v$.value.$validate();
  if (!v$.value.$invalid) {
    try {
      const userId = getUserId();
      await store.addLocation(state, userId);
      successMessage.value = "Location added successfully!";
      emitSuccessMessage(successMessage.value);
      setTimeout(() => {
        router.push({ name: "home" });
        resetForm();
      }, 1000);
    } catch (error) {
      console.error("Error adding location:", error);
    }
  } else {
    console.log(
      "Form validation failed. Please check the fields and try again."
    );
  }
};

// Helper functions
const getUserId = () => {
  const user = localStorage.getItem("user-info");
  if (user) {
    const parsedUser = JSON.parse(user);
    return parsedUser.id;
  }
  return "";
};

const resetForm = () => {
  state.name = "";
  state.phone = "";
  state.address = "";
};

const emitSuccessMessage = (message) => {
  emit("success", message); // Emit success event with message
};
</script>
