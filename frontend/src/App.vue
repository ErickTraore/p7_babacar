<template>
  <div id="app">
    <div id="nav">
    <div>
    <img alt="Vue logo" src="./assets/logo.png"> 
    </div>
    <div>
      <router-link to="/">Home</router-link> |
      <!-- <router-link to="/signup">Inscription</router-link> |  -->
      <router-link to="/profile">Profile</router-link> |  
      <!-- <router-link to="/postView">LoginNew</router-link> |    -->
      <!-- <router-link to="/updateUserProfile">maj-profile</router-link> |    -->
      <router-link v-if=logged to="/login">Login</router-link>  
      <router-link v-else  to="/logout">Logout</router-link> | 
    </div>
    </div>
    <router-view/>
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['logged']),
    // ...mapGetters(['nowLogged'])

  },
  methods:{
// callLogin(){
// this.$store.commit("nowLogged")
// }
  }
  
}


</script>


