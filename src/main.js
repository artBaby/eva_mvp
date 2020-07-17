import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import * as app_firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/storage'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

export const firebase = app_firebase

Vue.config.productionTip = false

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

export const db = app_firebase.firestore()
export const storageRef = app_firebase.storage().ref()

export const usersRef = db.collection('users')
export const roomsRef = db.collection('chatRooms')

export const filesRef = storageRef.child('files')

export const dbTimestamp = firebase.firestore.FieldValue.serverTimestamp()
export const deleteDbField = firebase.firestore.FieldValue.delete()

let app = '';

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


Vue.prototype.userCompanyName = ''

