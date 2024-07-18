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
    component: () => import("../views/Profile/Profile.vue"),
  },
  {
    path: "/update-profile",
    name: "updateProfile",
    component: () => import("../views/Profile/UpdateProfile.vue"),
  },
  {
    path: "/add-new-location",
    name: "addNewLocation",
    component: () => import("../views/Location/AddNewLocation.vue"),
  },
  {
    path: "/delete-location/:locationId",
    name: "deleteLocation",
    component: () => import("../views/Location/DeleteLocation.vue"),
  },
  {
    path: "/update-location/:locationId",
    name: "updateLocation",
    component: () => import("../views/Location/UpdateLocation.vue"),
  },
  {
    path: "/delete-all-locations",
    name: "deleteAllLocations",
    component: () => import("../views/Location/DeleteAllLocations.vue"),
  },
  {
    path: "/menu/location/:locationId",
    name: "menu",
    component: () => import("../views/Menu.vue"),
  },
  {
    path: "/menu/categories/view/:locationId",
    name: "viewCategories",
    component: () => import("../views/Category/ViewCategories.vue"),
  },
  {
    path: "/menu/categories/add/:locationId",
    name: "addCategories",
    component: () => import("../views/Category/AddCategories.vue"),
  },
  {
    path: "/menu/categories/update/:locationId/:categoryId",
    name: "updateCategory",
    component: () => import("../views/Category/UpdateCategory.vue"),
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
