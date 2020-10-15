<template>
  <div class="p-login">
    <v-card
      elevation="3"
      :loading="loading"
      class="p-login__card"
    >
      <LoginForm
        :login="login"
        :password="password"
        :is-can-submit="isCanSubmit"
        :loading="loading"
        @change-field="onChangeField"
        @submit="onSubmit"
      />
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import LoginForm from '@/components/_login/form/index.vue';

type Field = 'login' | 'password';

// Просто для упрощения разработки
const DEFAULT_LOGIN = process.env.NODE_ENV === 'development' && process.env.VUE_APP_DEV_AUTH_LOGIN ? process.env.VUE_APP_DEV_AUTH_LOGIN : '';
const DEFAULT_PASSWORD = process.env.NODE_ENV === 'development' && process.env.VUE_APP_DEV_AUTH_PASSWORD ? process.env.VUE_APP_DEV_AUTH_PASSWORD : '';

@Component({
  components: {
    LoginForm,
  },
})
export default class LoginPage extends Vue {
  login = DEFAULT_LOGIN;

  password = DEFAULT_PASSWORD;

  loading = false;

  get urlToRedirect(): string {
    return this.$route.query.redirectTo as string || '/list';
  }

  get isAuth(): boolean {
    return this.$store.getters['auth/isAuth'];
  }

  get isCanSubmit(): boolean {
    return !!this.login && !!this.password;
  }

  @Watch('isAuth')
  onAuthChanged(val: boolean) {
    if (val) {
      this.redirectAfterLogin();
    }
  }

  onChangeField({ field, value }: {field: Field; value: string}): void {
    this[field] = value;
  }

  async onSubmit() {
    this.loading = true;
    try {
      await this.$store.dispatch('auth/login', {
        login: this.login,
        password: this.password,
      });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }

  redirectAfterLogin() {
    this.$router.replace(this.urlToRedirect);
  }
}
</script>

<style>
.p-login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.p-login__card {
  width: 380px;
  min-height: 388px;
}
</style>
