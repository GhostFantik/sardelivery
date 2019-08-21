<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12"
             sm="8"
             md="4">
        <v-alert :type="alert.type" dismissible v-model="alert.show">
          {{alert.message}}
        </v-alert>
        <v-card>
          <v-toolbar dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-form v-model="validForm">
              <v-text-field
                label="username"
                type="text"
                :rules="this.formRules"
                v-model="userData.login"
              ></v-text-field>
              <v-text-field
                label="password"
                type="password"
                :rules="this.formRules"
                v-model="userData.password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark @click="logIn">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Authenticate from '../Authenticate';

export default {
  name: 'login',
  data() {
    return {
      alert: {
          show: false,
          message: '',
          type: 'error',
      },
      validForm: false,
      userData: {
        login: undefined,
        password: undefined,
      },
      formRules: [
        v => !!v || 'Обязательное поле!',
      ],
    };
  },
  methods: {
    async logIn() {
      if (this.validForm) {
        if (!Authenticate.isLogin()) {
          const token = await Authenticate.logIn(
            {
              username: this.userData.login,
              password: this.userData.password,
            },
          );
          if (token === null) this.showAlert('Login failed', 'error');
          else await this.$router.push('/');
        }
      }
      else this.showAlert('Both fields must be filed!', 'warning');
    },
    showAlert(message, type = 'info') {
      this.alert.show = true;
      this.alert.message = message;
      this.alert.type = type;
    },
  },
};
</script>

<style scoped>

</style>
