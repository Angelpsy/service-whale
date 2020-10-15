import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import store from '@/store';
import Home from '../views/home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/login/index.vue'),
    meta: {
      isRequireGuest: true,
    },
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/list/index.vue'),
    meta: {
      isRequireAuth: true,
    },
  },
  {
    path: '/list/:id',
    name: 'Item',
    component: () => import(/* webpackChunkName: "item" */ '../views/item/index.vue'),
    props: true,
    meta: {
      isRequireAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuth = store.getters['auth/isAuth'];

  if (to.matched.some((record) => record.meta.isRequireAuth)) {
    if (!isAuth) {
      next({
        name: 'Login',
        query: {
          redirectTo: to.fullPath,
        },
      });
    } else {
      next();
    }
  }

  if (to.matched.some((record) => record.meta.isRequireGuest)) {
    if (isAuth) {
      next({
        name: 'List',
      });
    } else {
      next();
    }
  }
});

export default router;
