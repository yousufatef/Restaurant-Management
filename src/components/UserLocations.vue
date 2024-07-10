<template>
  <div class="p-4">
    <div v-if="allLocations.length > 0" class="overflow-x-auto">
      <caption
        class="font-semibold mb-4 text-left text-gray-600 m-1 flex justify-between items-center"
      >
        <span>All Locations is ({{ allLocations.length }})</span>
        <span>
          <router-link
            :to="{ name: 'deleteAllLocations' }"
            class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >Delete All Locations</router-link
          >
        </span>
      </caption>
      <table class="min-w-full divide-y divide-gray-200 shadow-md rounded-lg">
        <thead class="bg-black opacity-90 text-white">
          <!-- <thead class="bg-blue-500 opacity-90 text-white"> -->
          <tr>
            <th
              v-for="head in heads"
              :key="head"
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
            >
              {{ head }}
            </th>
            <th
              scope="col"
              class="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr
            v-for="(location, index) in allLocations"
            :key="index"
            class="hover:bg-gray-100"
          >
            <td class="px-6 py-4 whitespace-nowrap font-bold">
              {{ location.name }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ location.phone }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ location.address }}</td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium flex gap-2"
            >
              <router-link
                :to="{
                  name: 'deleteLocation',
                  params: { locationId: location.id },
                }"
              >
                <button
                  class="bg-red-500 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Delete
                </button>
              </router-link>
              <router-link
                :to="{
                  name: 'updateLocation',
                  params: { locationId: location.id },
                }"
              >
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Update
                </button>
              </router-link>
              <router-link
                :to="{ name: 'menu', params: { locationId: location.id } }"
              >
                <button
                  class="bg-green-500 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                  Menu
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="bg-orange-100 p-2 text-gray-600">
      No Locations There :(
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from "vue";

const heads = reactive(["Name", "Phone", "Address"]);

const props = defineProps({
  allLocations: {
    type: Array,
    default: () => [],
  },
});
</script>
