<template>
   <div class="nav">
            <div class="nav__in" id="app">   
                  <img alt="Vue logo" src="./assets/logo4.png"> 
            </div>
            <div class="nav__down">
              <router-link to="/">Home</router-link> |
              <router-link to="/profile">Profile</router-link> |  
              <router-link v-if=logged to="/login">Login</router-link>  
              <router-link v-else  to="/logout">Logout</router-link> | 
              <router-link v-if= testBool  to="/compte">Admin</router-link> 

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
<style>

.nav__in{
border: 3px solid rgb(151, 143, 143);
}
.nav__down{
   width: 100%;
  height: 100%;
background-color: rgb(168, 165, 160);}
img {
  width: 100%;
  height: 100%;
}
</style>


