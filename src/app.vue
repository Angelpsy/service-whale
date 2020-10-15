<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container>
        <v-row>
          <div>
            TODO: col left (CRM)
          </div>

          <v-spacer></v-spacer>

          <div>
            TODO: col right (sign out)
          </div>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {}
</script>
