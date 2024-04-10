import OrdersView from "@/views/OrdersView.vue";
import ProductsView from "@/views/ProductsView.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "products",
    component: ProductsView,
  },
  {
    path: "/orders",
    name: "orders",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import("../views/OrdersView.vue"),
    component: OrdersView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
