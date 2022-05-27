import Vue from "vue";
import VueRouter from "vue-router";
import ScreenWithWavingPoints from "../views/ScreenWithWavingPoints.vue";
import exportDocx from "../views/exportDocx";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "ScreenWithWavingPoints",
    component: ScreenWithWavingPoints,
  },
  {
    path: "/exportDocx",
    name: "exportDocx",
    component: exportDocx,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
