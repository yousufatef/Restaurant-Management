<template>
  <div>
    <button
      @click="showForm = true"
      class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 m-5 rounded"
    >
      Add New Restaurant
    </button>

    <PopupForm
      v-if="showForm"
      @close="showForm = false"
      @success="handleSuccess"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import PopupForm from "./PopupForm.vue";

const showForm = ref(false);

const handleSuccess = (message) => {
  alert(message); // Output the success message to console (for verification)
  showForm.value = false; // Close the form upon success
};
</script>
