<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      clipped-left
      class="elevation-1"
    >

        Эва Логистикс

        <v-spacer></v-spacer>

      <v-btn
        @click="logout"
        text>
        <span class="mr-2">Выход</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>

    </v-app-bar>

      <v-content class="pa-0">
          <router-view></router-view>
      </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'App',
    data: () => ({
        userCompanyName: ''
    }),
    methods: {
      logout: function () {
          firebase.auth().signOut().then(() => {
              this.$router.replace('login')
          })
      },
        fillUserName() {
            switch (this.email) {
                case 'otprav@m.ru':
                    this.$userCompanyName = 'ООО Ева Логистикс Интернешнл Лимитед';
                    break;
                default:
                    this.$userCompanyName = 'ООО Без Названия';
            }
            return this.$userCompanyName;
        }
    },

};
</script>
