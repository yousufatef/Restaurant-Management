import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {},
    LoggedIn: "",
    loggedInUserId: "",
    numOfCategories: "",
    listOfCategories: [],
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

          console.log(this.listOfCategories);
          console.log(userId);
          console.log(locationId);
        }
      } catch (error) {
        // Log any errors that occur during the request
        console.error("Error fetching categories:", error);
      }
    },
  },
});
