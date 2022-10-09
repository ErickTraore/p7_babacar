<template>
    <div>
        <div class="preview">
            <div class="preview__symbol">
              <img alt="logo1"  src="./assets/plus/ico/icon-left-font-monochrome-black.svg" class="" />
            </div>
            <!-- <div class="preview__texte">
              <img alt="logo2"  src="./assets/plus/icon-left-font-monochrome-black.svg" />
            </div> -->
        </div>
        <nav class="navbar navbar-expand-sm navbar-dark">
          <div class="container-fluid">
            <button class="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#mynavbar"
                    aria-label="btn-navbar"
                    >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="mynavbar">
              <ul class="navbar-nav me-auto">
                <li class="nav-item">
                  <router-link class="nav-link" to="/">Messagerie</router-link> 
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/profile">Profile</router-link>  
                </li>
                <li class="nav-item">
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" v-if=logged to="/login">Login</router-link>  
                  <router-link class="nav-link" v-else  to="/logout">Logout</router-link> 
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" v-if= testBool  to="/compte">Admin-users</router-link> 
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" v-if= testBool  to="/comptemessages">Admin-messages</router-link> 
                </li>
              </ul>
              <form class="d-flex">
                <input class="form-control me-2" type="text" placeholder="Search">
                <button class="btn btn-primary" type="button">Search</button>
              </form>
            </div>
          </div>
        </nav>
        <router-view/>
        <FooterComponent />
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios';
import FooterComponent from '@/components/FooterComponent.vue';

Vue.use(VueAxios, axios)
import { mapState } from 'vuex'
export default {
computed: {
  ...mapState(['logged']),
    testBool(){
    return this.item.isAdmin
  }
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
  components: {
    FooterComponent
  },
  props: {},
  methods: {
  },
};
</script>
<style lang="scss">
    @import 'sass/main.scss';
navbar-toggler-icon{
  color:black;
}
</style>


