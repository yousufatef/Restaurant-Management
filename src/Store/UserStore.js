import axios from "axios";
import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {},
    LoggedIn: false, // should be a boolean
    loggedInUserId: "",
    numOfCategories: 0, // should be a number
    listOfCategories: [],
    listOfLocations: [],
  }),

  actions: {
    async registerUser({ email, password, name }) {
      try {
        const response = await axios.post("http://localhost:3000/users", {
          name: name,
          email: email,
          password: password,
        });
        this.userData = response.data; // Store response data
        console.log("userData = ", this.userData);
        localStorage.setItem("user-info", JSON.stringify(this.userData)); // Store user-info in localStorage
      } catch (error) {
        console.error("Error:", error);
        throw error; // Optionally rethrow or handle the error as needed
      }
    },
    isUserLoggedIn() {
      const user = localStorage.getItem("user-info");
      if (user) {
        this.LoggedIn = true;
        this.loggedInUserId = JSON.parse(user).id;
      } else {
        this.LoggedIn = false;
      }
    },
    async displayAllCategories(userId, locationId) {
      try {
        const result = await axios.get(
          `http://localhost:3000/categories?userId=${userId}`
        );
        if (result.status === 200) {
          // Filter categories based on locationId since JSON Server doesn't support complex queries
          const filteredCategories = result.data.filter(
            (category) => category.locationId === locationId
          );

          this.listOfCategories = filteredCategories;
          this.numOfCategories = filteredCategories.length;
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Error fetching categories:", error);
      }
    },
    async canUserAccessLocation(userId, locationId, router) {
      try {
        const result = await axios.get(
          `http://localhost:3000/locations?userId=${userId}`
        );
        if (result.status === 200) {
          this.listOfLocations = result.data.filter(
            (location) => location.id === locationId
          );
          if (this.listOfLocations.length !== 1) {
            console.log("List Of Locations:", this.listOfLocations);
            router.push({ name: "home" });
          }
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Error fetching locations:", error);
      }
    },

    async fetchListOfCategories(locationId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/categories?locationId=${locationId}`
        );
        if (response.status === 200) {
          this.listOfCategories = response.data;
          this.numOfCategories = response.data.length;
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
});
