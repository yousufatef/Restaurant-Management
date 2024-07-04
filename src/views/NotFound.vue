<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <h1 class="text-4xl font-bold mb-4">Page Not Found!</h1>
    <p>
      Go to
      <router-link :to="{ name: 'home' }" class="text-blue-500"
        >Home</router-link
      >
    </p>
  </div>
</template>

<script setup></script>
