<template>
  <div id="app">   
    <div id="nav"><div>
    <img alt="Vue logo" src="./assets/logo.png"> 
  </div>
  <div>
      <router-link to="/">Home</router-link> |
      <router-link v-if= !testBool  to="/compte">Admin</router-link> |  
      <router-link to="/profile">Profile</router-link> |  
      <router-link v-if=logged to="/login">Login</router-link>  
      <router-link v-else  to="/logout">Logout</router-link> | 
  </div>
  </div>
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['logged']),
     testBool(){
      return this.item.isAdmin
    }
    // ...mapGetters(['nowLogged'])
  },
    data() {
    return {
      item:''
   
    };
  },
   created() {
     let objMySession = localStorage.getItem("obj")
     let myStorageToken = JSON.parse(objMySession)
     let token = myStorageToken.myToken;
    axios
     .get('http://localhost:3000/api/users/me/',{
            headers: {
              'Authorization': token
            }
          })
        .then(response => {
          this.item = response.data

          })
        
        .catch(error => console.log(error()))
  },

  props: {},
  methods: {},
 
};
</script>



