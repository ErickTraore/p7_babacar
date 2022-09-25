import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)


const routes = [{
        path: '/',
        name: 'Home',
        component: Home,


    },
    {
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/Login.vue')
    },
    {
        path: '/logout',
        name: 'Logout',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "logout" */ '../views/Logout.vue')
    },
    {
        path: '/signup',
        name: 'Signup',

        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "signup" */ '../views/Signup.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "profile" */ '../views/Profile.vue')
    }, {
        path: '/updateUserProfile',
        name: 'UpdateUserProfile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
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
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "pageNotFound.vue'" */ '../views/PageNotFound.vue')
    },
   
]

const router = new VueRouter({
    routes
})



export default router