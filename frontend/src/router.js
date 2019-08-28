import Vue from 'vue';
import Router from 'vue-router';
import Authenticate from './Authenticate';
import Orders from './views/Orders.vue';
import Order from './views/Order.vue';
import Login from './views/Login.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/orders',
      meta: { requireAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      meta: { requireAuth: true },
      children: [
        {
          path: ':id',
          name: 'order',
          component: Order,
          props: true,
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (!Authenticate.isLogin()) next({ path: '/login' });
    else next();
  } else next();
});
export default router;
