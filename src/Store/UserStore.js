import axios from "axios";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    userData: {},
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
  },
});
