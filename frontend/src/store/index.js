import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged: false,
        accessToken: false,
    },

    mutations: {
        set_login(state) {
            state.logged = !state.logged
        },
    },

    actions: {
        setLogin({ commit }) {
            commit('set_login')
        },
    },

    getters: {
        loggedIn(state) {
            return state.logged || false
        },
    }

})