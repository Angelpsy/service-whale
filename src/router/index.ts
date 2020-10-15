import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
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
  },
  {
    path: '/list',
    name: 'List',
    component: () => import(/* webpackChunkName: "list" */ '../views/list/index.vue'),
  },
  {
    path: '/list/:id',
    name: 'Item',
    component: () => import(/* webpackChunkName: "item" */ '../views/item/index.vue'),
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
