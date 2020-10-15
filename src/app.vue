<template>
  <v-app class="app">
    <v-app-bar
      app
      color="primary"
      dark
      height="53"
      elevation="0"
    >
      <v-container>
        <v-row>
          <div class="app__logo">
            CRM
          </div>

          <v-spacer></v-spacer>

          <div class="app__logout">
            <v-btn
              v-if="isAuth"
              small
              light
              color="white"
              elevation="0"
              @click="onLogout"
            >Sign out</v-btn>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main class="app__main">
      <router-view/>
    </v-main>

    <v-footer
      app
      :height="66"
      class="app__footer"
      color="#ebebeb"
    >
      <span class="app_copy">
        © 2020 — CRM
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  loading = false;

  get isAuth(): boolean {
    return this.$store.getters['auth/isAuth'];
  }

  async onLogout() {
    this.loading = true;
    try {
      await this.$store.dispatch('auth/logout');
      this.$router.replace({ name: 'Login' });
    } catch (e) {
      console.log(e);
    } finally {
      this.loading = false;
    }
  }
}
</script>

<style>
.app {}
.app__logo {
  font-weight: 900;
  font-size: 24px;
  line-height: 28px;
  padding-left: 20px;
}
.app__main {
  background: #f5f5f5;
}
.app__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.87);
}
.app_copy {
  font-size: 14px;
  line-height: 22px;
}
</style>
