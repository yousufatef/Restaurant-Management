import axios from "axios";
import { defineStore } from "pinia";

export const useLocationStore = defineStore("locationStore", {
  state: () => ({
    locationData: {},
    locationName: "",
    locationAddress: "",
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
    async getLocationInfo(userId, locationId) {
      try {
        const result = await axios.get(
          `http://localhost:3000/locations?userId=${userId}`
        );
        if (result.status === 200) {
          const locationDetails = result.data.filter(
            (location) => location.id === locationId
          );
          if (locationDetails.length === 1) {
            this.locationName = locationDetails[0].name;
            this.locationAddress = locationDetails[0].address;
          } else {
            console.log("Location not found");
          }
        }
      } catch (error) {
        console.error("Error fetching location info:", error);
      }
    },
    async addCategory(name, userId, locationId) {
      try {
        const result = await axios.post(`http://localhost:3000/categories`, {
          name,
          userId,
          locationId,
        });
      } catch (error) {
        console.error("Error fetching location info:", error);
      }
    },
  },
});
