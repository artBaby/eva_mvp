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
                    v-if="this.$router.currentRoute.path !== '/eva_mvp/login'"
                    @click="logout"
                    text>
                <span class="mr-2">Выход</span>
                <v-icon>mdi-open-in-new</v-icon>
            </v-btn>
        </v-app-bar>

        <v-content class="pa-0">
            <router-view></router-view>
        </v-content>

        <!--      <v-bottom-navigation-->
        <!--              :value="activeBtn"-->
        <!--              grow-->
        <!--              color="teal"-->
        <!--      >-->
        <!--          <v-btn>-->
        <!--              <span>Recents</span>-->
        <!--              <v-icon>mdi-history</v-icon>-->
        <!--          </v-btn>-->

        <!--          <v-btn>-->
        <!--              <span>Favorites</span>-->
        <!--              <v-icon>mdi-heart</v-icon>-->
        <!--          </v-btn>-->

        <!--          <v-btn>-->
        <!--              <span>Nearby</span>-->
        <!--              <v-icon>mdi-map-marker</v-icon>-->
        <!--          </v-btn>-->
        <!--      </v-bottom-navigation>-->
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
        },

    };
</script>
