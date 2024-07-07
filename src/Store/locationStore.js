import axios from "axios";
import { defineStore } from "pinia";

export const useLocationStore = defineStore("user", {
  state: () => ({
    locationData: {},
  }),

  actions: {
    async addLocation({ name, phone, address }, userId) {
      try {
        const response = await axios.post("http://localhost:3000/locations", {
          name,
          phone,
          address,
          userId,
        });

        this.locationData = response.data; // Store response data
        console.log("locationData =", this.locationData);

        // Store location-info in localStorage
        localStorage.setItem(
          "location-info",
          JSON.stringify(this.locationData)
        );

        return this.locationData; // Optionally return data for further handling
      } catch (error) {
        console.error("Error:", error);
        throw error; // Optionally rethrow or handle the error as needed
      }
    },
  },
});
