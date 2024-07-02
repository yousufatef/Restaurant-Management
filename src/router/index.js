import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

// component with import for lazy loading == component: () => import("../views/Home.vue")

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/sign-up",
    name: "signup",
    component: () => import("../views/Signup.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
