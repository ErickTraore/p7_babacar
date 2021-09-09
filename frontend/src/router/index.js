import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/connect',
        name: 'Connect',
        component: () =>
            import ('../views/Connection.vue')
    }, {
        path: '/profile',
        name: 'Profile',
        component: () =>
            import ('../views/Profile.vue')
    }, {
        path: "/logout",
        name: "logout",
        component: {
            beforeRouteEnter() {
                logout()
            }
        }
    }, {
        path: '*',
        name: 'Home',
        component: Home
    },
]

const router = new VueRouter({
    routes
})

const logout = () => {
    localStorage.removeItem('obj');
    router.push('/connect');
}

router.beforeEach((to, from, next) => {
    if (to.name !== 'Connect' && !localStorage.getItem('obj')) next({ name: 'Connect' })
    else next()
})

export default router