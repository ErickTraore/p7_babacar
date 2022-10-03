import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
 
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        component: () =>
            import ( /* webpackChunkName: "logout" */ '../views/Logout.vue')
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () =>
            import ( /* webpackChunkName: "signup" */ '../views/Signup.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Profile.vue')
    }, {
        path: '/updateUserProfile',
        name: 'UpdateUserProfile',
        component: () =>
            import ( /* webpackChunkName: "updateUserProfile" */ '../views/UpdateUserProfile.vue')
    },
    {
        path: '/compte',
        name: 'Compte',
        component: () =>
            import ( /* webpackChunkName: "compte.vue" */ '../views/Compte.vue')
    },
    {
        path: '/comptemessages',
        name: 'Comptemessages',
        component: () =>
            import ( /* webpackChunkName: "comptemessages" */ '../views/Comptemessages.vue')
    },
    {
        path: '/getMessage/:id/',
        name: 'GetMessage',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "getMessage" */ '../views/GetMessage.vue'),
    },
    {
        path: '/getUser/:id/',
        name: 'GetUser',
        props: true,
        component: () =>
            import ( /* webpackChunkName: "getUser" */ '../views/GetUser.vue'),
    },
    {
        path: '*',
        name: 'NotFound',
        component: () =>
            import ( /* webpackChunkName: "pageNotFound.vue'" */ '../views/PageNotFound.vue')
    },
]
const router = new VueRouter({
    routes
})
export default router