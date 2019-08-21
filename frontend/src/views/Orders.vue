<template>
  <v-container fluid>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Id</th>
          <th class="text-left">Name</th>
          <th class="text-left">Address</th>
          <th class="text-left">Payment Method</th>
          <th class="text-left">Status</th>
          <th class="text-left"></th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in orders" :key="`order${index}`"
          :class="statusNames[item.status].color">
        <td>{{item.id}}</td>
        <td>{{item.name}}</td>
        <td>{{item.address}}</td>
        <td>{{item.paymentMethod}}</td>
        <td>{{statusNames[item.status].name}}</td>
        <td><v-btn :to="`/orders/${item.id}`">Подробнее</v-btn></td>
      </tr>
      </tbody>
    </v-simple-table>
    <router-view></router-view>
  </v-container>
</template>

<script>
import axios from 'axios';
import config from '../../config';
import StatusNames from '../mixins/StatusNames';

export default {
  name: 'Orders',
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    async getOrders() {
      try {
        const result = await axios.get(`${config.apiUrl}orders/`);
        this.orders = result.data;
        this.orders.sort(
          (a, b) => (this.statusNames[a.status].priority - this.statusNames[b.status].priority),
        );
      } catch (e) {
        console.log(e.message);
      }
    },
  },
  mounted() {
    this.getOrders();
  },
  beforeRouteUpdate(to, from, next) {
    if (to.path === '/orders') this.getOrders();
    next();
  },
  mixins: [StatusNames],
};
</script>

<style scoped>

</style>
