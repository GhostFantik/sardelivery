export default {
  data() {
    return {
      statusNames: {
        0: { name: 'Ожидает обработки!', color: 'light-blue lighten-1', priority: 0 },
        1: { name: 'Ожидает подтверждение клиента!', color: 'yellow lighten-3', priority: 3 },
        2: { name: 'Клиент подтвердил заказ!', color: 'light-green lighten-1', priority: 1 },
        3: { name: 'Заказ выполнен!', color: 'light-green lighten-4', priority: 4 },
        4: { name: 'Клиент отклонил заказ!', color: 'red accent-1', priority: 2 },
        5: { name: 'Администратор отклонил заказ!', color: 'red lighten-3', priority: 5 },
      },
    };
  },
};
