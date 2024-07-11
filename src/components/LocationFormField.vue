<template>
  <div class="mb-6">
    <input
      :type="type"
      :value="modelValue"
      @input="updateValue"
      :placeholder="placeholder"
      class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none transition duration-200"
    />
    <span v-if="error" class="text-red-500 text-sm">
      {{ error }}
    </span>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";

const props = defineProps({
  modelValue: String,
  type: { type: String, default: "text" },
  placeholder: String,
  error: String,
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};
</script>
