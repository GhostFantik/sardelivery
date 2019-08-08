<template>
  <v-container fluid="">
    <v-app-bar dark app>
      <router-link :to="'/'" tag="span" style="cursor: pointer">
        <v-toolbar-title>Sar Delivery</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn v-for="(item, index) in menuButton" text :key="`menuButton${index}`" :to="item.route">
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </v-container>
</template>

<script>
export default {
  name: 'AppHeader',
  computed: {
    menuButton() {
      return [
        {
          title: 'Заказы',
          route: '/orders',
          icon: '',
        },
        {
          title: 'Управление',
          route: '/management',
          icon: '',
        },
      ];
    },
  },
};
</script>
