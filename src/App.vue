<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
<!--      <div class="d-flex align-center">-->
<!--        <v-img-->
<!--          alt="Vuetify Logo"-->
<!--          class="shrink mr-2"-->
<!--          contain-->
<!--          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"-->
<!--          transition="scale-transition"-->
<!--          width="40"-->
<!--        />-->

<!--        <v-img-->
<!--          alt="Vuetify Name"-->
<!--          class="shrink mt-1 hidden-sm-and-down"-->
<!--          contain-->
<!--          min-width="100"-->
<!--          src="https://cdn.vuetifyjs.com/images/log os/vuetify-name-dark.png"-->
<!--          width="100"-->
<!--        />-->
<!--      </div>-->

      <v-spacer></v-spacer>

      <v-btn
        router-link to="/start"
        target="_self"
        text>
        <span class="mr-2">Выход</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    </v-app-bar>

<!--    <v-content>-->
<!--      <StartPage/>-->
<!--    </v-content>-->
      <v-content>
          <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
// import StartPage from './components/StartPage';

export default {
  name: 'App',

  // components: {
  //     StartPage,
  // },

  data: () => ({
    //
  }),
};
</script>
