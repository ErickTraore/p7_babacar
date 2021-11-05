import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged: true,

    },

    mutations: {
        NOW_LOGGED(state) {
            state.logged = false

        },
        BEFORE_LOGGED(state) {
            state.logged = true
        }

    },

    actions: {
        nowLogged(context) {
            context.commit("NOW_LOGGED")
        },
        beforeLogged(context) {
            context.commit("BEFORE_LOGGED")

        }
    },

    getters: {


    }
})