import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        logged: true,

    },

    mutations: {
        nowLogged(state) {
            let objMySession = localStorage.getItem("obj")
            let myStorageToken = JSON.parse(objMySession)
            let token = myStorageToken.myToken;
            if (token === '!null') {
                console.log('je suis un YANKEE');
                console.log('mon_token',
                    token);
                state.logged = true
            } else {
                console.log('je ne suis pas un YANKEE');
                console.log('mon_token', token);
                state.logged = false
            }
            // return `${state.logged}`
            return `state.logged `
        },
        beforeLogged(state) {
            state.logged = true
        }

    },

    actions: {

    },

    getters: {


    }
})