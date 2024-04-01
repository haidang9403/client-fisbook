import { createRouter, createWebHistory } from 'vue-router'

// Components
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Login from '@/views/Auth/Login.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Register from '@/views/Auth/Register.vue';

const routes = [
  {
    path: "/",
    component: Home,
    name: "home"
  },
  {
    path: "/product",
    component: Product,
    name: "product",
  },
  {
    path: "/login",
    component: Login,
    name: "login",
    meta: {
      layout: AuthLayout
    }
  },
  {
    path: "/register",
    component: Register,
    name: "register",
    meta: {
      layout: AuthLayout
    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
})

// Guards
// router.beforeEach(async (to, from, next) => {

// });

export default router
