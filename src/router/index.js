import { createRouter, createWebHistory } from "vue-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("@/views/Signin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("@/views/Signup.vue"),
  },
  {
    path: "/addtask",
    name: "AddTask",
    component: () => import("@/components/AddTask.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  if (requiresAuth) {
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
        unsubscribe();
        resolve(user);
      });
    });

    if (user) {
      next();
    } else {
      next({ name: "Singin" });
    }
  } else {
    next();
  }
});

export default router;
