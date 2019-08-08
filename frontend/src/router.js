import Vue from 'vue';
import Router from 'vue-router';
import Orders from './views/Orders.vue';
import Order from './views/Order.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
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
