<template>
  <v-container fluid="">
    <v-app-bar dark app>
      <router-link :to="'/'" tag="span" style="cursor: pointer">
        <v-toolbar-title>Sar Delivery</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="(item, index) in menuButton" text :key="`menuButton${index}`" :to="item.route"
        @click="item.handler">
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>

<script>
import Authenticate from '../Authenticate';

export default {
  name: 'AppHeader',
  data() {
    return {
      token: Authenticate.getToken(),
    };
  },
  mounted() {
    Authenticate.setCallback(() => {
      this.token = Authenticate.getToken();
    });
  },
  methods: {
    logOut() {
      Authenticate.logOut();
      this.token = null;
      this.$router.push('/login');
    },
  },
  computed: {
    menuButton() {
      const buttons = [
        {
          title: 'Заказы',
          route: '/orders',
          active: true,
          handler: () => {},
          icon: '',
        },
        {
          title: 'Управление',
          route: '/management',
          active: true,
          handler: () => {},
          icon: '',
        },
        {
          title: 'Выход',
          route: '',
          active: !(this.token === null),
          icon: '',
          handler: this.logOut,
        },
      ];
      return buttons.filter(b => b.active); // TODO: make a watcher!
    },
  },
};
</script>
