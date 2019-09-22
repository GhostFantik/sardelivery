<template>
  <v-container >
      <v-layout align-center justify-center wrap>
        <v-flex xs12 md4>
          <v-dialog v-model="dialog">
          <v-card>
            <v-layout align-center justify-center>
              <v-flex xs6>
                <v-card-title>#{{order.id}} {{order.name}}</v-card-title>
                <v-card-text>
                  <h3>Описание: {{order.body}}</h3>
                  <h4>Адрес: {{order.address}}</h4>
                  <h5>Метод оплаты: {{order.paymentMethod}}</h5>
                  <h5>Vk: <a :href="getVk">click me</a></h5>
                  <h5>Статус: {{statusNames[order.status].name}}</h5>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-form v-model="orderForm.validForm">
                  <v-text-field label="Цена" v-model="order.price"
                                :rules="orderForm.priceRules"
                                :disabled="order.status >= 1"></v-text-field>
                  <v-text-field label="Комментарий"></v-text-field>
                </v-form>
              </v-flex>
            </v-layout>
            <v-card-actions>
              <v-btn v-for="(item, index) in cardButton"
                     @click="item.action"
                     :key="`cardButton${index}`"
                     :disabled="!item.active">
                {{item.title}}
              </v-btn>
            </v-card-actions>
          </v-card>
          </v-dialog>
        </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios';
import config from '../../config';
import StatusNames from '../mixins/StatusNames';

export default {
  name: 'Order',
  data() {
    return {
      dialog: true,
      orderForm: {
        validForm: true,
        priceRules: [
          v => !!v || 'Обязательное поле!',
          v => !(Number.isNaN(Number(v))) || 'Введите ЧИСЛО!',
          v => v > 0 || 'Цена должна быть больше нуля!',
        ],
      },
      order: { status: 0},
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      try {
        const result = await axios.get(`${config.apiUrl}orders/${this.id}`);
        this.order = result.data;
      } catch (e) {
        console.log(e.message);
      }
    },
    async setPriceOrder() {
      try {
        if (this.orderForm.validForm) {
          const obj = {
            id: this.order.id,
            price: this.order.price,
          };
          const result = await axios.post(`${config.apiUrl}orders/setPrice`, obj);
          this.closeDialog();
        }
      } catch (e) {
        console.log(e.message);
      }
    },
    async rejectOrder() {
      try {
        const obj = {
          id: this.order.id,
          comments: this.order.comments,
        };
        const result = await axios.post(`${config.apiUrl}orders/rejectByAdmin`, obj);
        this.closeDialog();
      } catch (e) {
        console.log(e.message);
      }
    },
    async completeOrder() {
      try {
        const result = await axios.post(`${config.apiUrl}orders/complete?id=${this.order.id}`);
        this.closeDialog();
      } catch (e) {
        console.log(e.message);
      }
    },
    closeDialog() {
      this.dialog = false;
    },
  },
  computed: {
    cardButton() {
      return [
        {
          title: 'Установить цену',
          action: this.setPriceOrder,
          active: this.orderForm.validForm && this.order.status === 0,
        },
        {
          title: 'Отклонить',
          action: this.rejectOrder,
          active: this.order.status === 0 || false,
        },
        {
          title: 'Завершить',
          action: this.completeOrder,
          active: this.order.status === 2 || false,
        },
      ];
    },
    getVk() {
      return ("https://vk.com/id" + this.order.vkId);
    },
  },
  watch: {
    dialog(val) {
      if (val === false) this.$router.push('/orders');
    },
  },
  props: ['id'],
  mixins: [StatusNames],
};
</script>

<style scoped>

</style>
