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
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
  },
  {
    path: "/update-profile",
    name: "updateProfile",
    component: () => import("../views/UpdateProfile.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "notfound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
router.beforeEach((to, from, next) => {
  const formattedTitle = `${to.name.charAt(0).toUpperCase()}${to.name
    .slice(1)
    .toLowerCase()} | Restaurant Management`;
  document.title = formattedTitle;
  next();
});
export default router;
