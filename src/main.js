import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
// import '@/styles/main.scss';
import firebase from "firebase";

Vue.config.productionTip = false

let app = '';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDgedFxjyi1chnXJTto-PA30SSNr9cFxY0",
  authDomain: "eva-mvp.firebaseapp.com",
  databaseURL: "https://eva-mvp.firebaseio.com",
  projectId: "eva-mvp",
  storageBucket: "eva-mvp.appspot.com",
  messagingSenderId: "161599101075",
  appId: "1:161599101075:web:e2d58afebdc1f889895566"
};
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
    }

)

// new Vue({
//   router,
//   vuetify,
//   render: h => h(App)
// }).$mount('#app')
