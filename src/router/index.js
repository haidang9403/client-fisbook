import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
// Components
import Home from '@/views/Home.vue';
import Product from '@/views/Product.vue';
import Login from '@/views/Auth/Login.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import Register from '@/views/Auth/Register.vue';
import ProductAll from '@/components/product/ProductAll.vue';
import ProductDetail from '@/components/product/ProductDetail.vue';
import Borrow from '@/views/Borrow.vue';
import { watch } from 'vue';
import Profile from '@/views/Profile.vue';
import AccountInfo from '@/components/profiles/AccountInfo.vue';
import OrderFollow from '@/components/profiles/OrderFollow.vue';
import ChangePassword from '@/components/profiles/ChangePassword.vue';
import mainPath from '@/utils/mainPath';
import NotFound from '@/views/NotFound.vue';

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
    children: [
      {
        path: "",
        component: ProductAll,
        name: 'product all',
      },
      {
        path: ":id",
        component: ProductDetail,
        name: "product details",
      }
    ]
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
  },
  {
    path: "/borrow",
    component: Borrow,
    name: "borrow"
  },
  {
    path: "/profile",
    component: Profile,
    name: "profile",
    children: [
      {
        path: "",
        component: AccountInfo,
        name: "info account"
      },
      {
        path: "borrow",
        component: OrderFollow,
        name: "follow borrow"
      },
      {
        path: "change-password",
        component: ChangePassword,
        name: "change password"
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { layout: AuthLayout }
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
router.beforeEach(async (to, from, next) => {
  const auth = useAuth();
  const { getLogin } = auth;
  const isAuth = await getLogin();

  if (!isAuth && (to.name === 'borrow' || mainPath(to.path) === '/profile')) {
    console.log(to.path)
    next({ name: 'login' });
  } else if (isAuth && (to.name === 'login' || to.name === 'register')) {
    next({ name: 'home' })
  } else {
    next()
  }
});

export default router
