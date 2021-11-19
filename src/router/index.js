import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "@/views/dashboard/Dashboard.vue"
      ),
  },
  {
    path: "/forms",
    name: "forms",
    component: () =>
      import(/* webpackChunkName: "forms" */ "@/views/forms/Forms.vue"),
  },
  {
    path: "/form-builder",
    name: "form-builder",
    component: () =>
      import(
        /* webpackChunkName: "form-builder" */ "@/views/form-builder/FormBuilder.vue"
      ),
  },
  {
    path: "/help",
    name: "help",
    component: () =>
      import(/* webpackChunkName: "help" */ "@/views/help/Help.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
