import { createRouter, createWebHistory } from "vue-router";
import { LoginCallback, navigationGuard } from "@okta/okta-vue";
import Home from "../views/Home.vue";
import search from "../views/search.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/blogs",
    name: "Blogs",
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/blogs.vue"),
  },
  {
    path: "/login/callback",
    component: LoginCallback,
  },
  { path: "/blogs/search", component: search },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(navigationGuard);

export default router;
