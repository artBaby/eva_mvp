import Vue from 'vue'
import Router from 'vue-router'
import SignUp from "@/components/SignUp";
import StartPage from "@/components/StartPage";

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/start'
        },
        {
            path: '/start',
            name: 'Home',
            component: StartPage
        },
        {
            path: '/login',
            name: 'SignUp',
            component: SignUp
        }
    ],
    mode: 'history'
})
