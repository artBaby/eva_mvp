import Vue from 'vue'
import Router from 'vue-router'
import firebase from "firebase";
import LoginPage from "@/components/LoginPage";
import ProductCompany from "@/components/ProductCompany";
import TrailerCompany from "@/components/TrailerCompany";

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/eva_mvp/login'
        },
        {
            path: '*',
            redirect: '/eva_mvp/login'
        },
        {
            path: '/eva_mvp/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/eva_mvp/productCompany',
            name: 'ProductCompany',
            component: ProductCompany,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/eva_mvp/trailerCompany',
            name: 'TrailerCompany',
            component: TrailerCompany,
            meta: {
                requiresAuth: true
            }
        }
    ],
    mode: 'history'
});

// router.beforeEach(((to, from, next) => {
//     const currentUser = firebase.auth().currentUser;
//     const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
//
//     console.log(currentUser)
//     console.log(requiresAuth)
//     if (!currentUser && requiresAuth) {
//         console.log(1)
//         next('/login');
//     }
//     // else if (currentUser && !requiresAuth) {
//     //     next('/home');
//     // }
//         else if (currentUser && requiresAuth) {
//         console.log(2)
//             currentUser.getIdTokenResult()
//                 .then(function (
//                     {
//                         claims
//                     }) {
//
//                     if (claims.productCompany === true) {
//                         console.log(44)
//                         if (to.path !== '/productCompany')
//                             return next('/productCompany')
//                     }
//                     if (claims.trailerCompany === true) {
//                         console.log(55)
//                         if (to.path !== '/trailerCompany')
//                             return next('/trailerCompany')
//                     }
//                 })
//     }
//
//     else {
//         console.log(3)
//         next();
//     }
// }));

router.beforeEach((to, from, next) => {

    firebase.auth().onAuthStateChanged(userAuth => {

        if (userAuth) {
            firebase.auth().currentUser.getIdTokenResult()
                .then(function ({
                                    claims
                                }) {
                    console.log("LoginPage")
                    if (claims.productCompany || LoginPage.data().userRole === 'productCompany')  {
                        if (to.path !== '/eva_mvp/productCompany')
                            return next({
                                path: '/eva_mvp/productCompany',
                            })
                    } else if (claims.trailerCompany) {
                        if (to.path !== '/eva_mvp/trailerCompany')
                            return next({
                                path: '/eva_mvp/trailerCompany',
                            })
                    }

                })
        } else {
            if (to.matched.some(record => record.meta.requiresAuth)) {
                next({
                    path: '/login',
                    // query: {
                    //     redirect: to.fullPath
                    // }
                })
            } else {
                next()
            }
        }

    })

    next()

})

export default router;
