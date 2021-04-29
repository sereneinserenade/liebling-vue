import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { Home } from "@/views";
import { Page, Post, Author, TagPage } from "@/components";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/page/1",
    children: [
      {
        path: "/page/:pageNumber",
        name: "posts",
        component: Page,
      },
      {
        path: "/tag/:tagName",
        name: "tagPage",
        component: TagPage,
      },
      {
        path: "/author/:authorSlug",
        name: "author",
        component: Author,
      },
      {
        path: "/:postSlug",
        name: "post",
        component: Post,
      },
    ],
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
  base: process.env.BASE_URL || "/",
  routes,
  scrollBehavior(to) {
    if (to.name === "post") {
      window.scrollTo(0, 0);
    }
  },
});

const scrollableElementId = "content"; // You should change this
const scrollPositions = Object.create(null);

router.beforeEach((to, from, next) => {
  const element = document.getElementById(scrollableElementId);
  if (element !== null) {
    scrollPositions[`${from.name}`] = element.scrollTop;
  }

  next();
});

window.addEventListener("popstate", () => {
  const currentRouteName = `${router.currentRoute.name}`;

  const element = document.getElementById(scrollableElementId);
  if (element !== null && currentRouteName in scrollPositions) {
    setTimeout(
      () => (element.scrollTop = scrollPositions[currentRouteName]),
      50
    );
  }
});

export default router;
