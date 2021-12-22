<template>
   <div class="nav">
     <div class="chargement"> </div>
        <div>
            <button class="btn btn-danger" type="button" disabled>
              <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
              Loading...
            </button>   
        </div>

        <div>
        <p>Je suis un vrai YANKEE</p>
        <button class="btn"> Moi je clique</button>
        </div>
        <div class="nav__in" id="app">   
                  <img alt="Vue logo" src="./assets/logo4.png"> 
        </div>
                <div class="nav__down">
                  <router-link class="nav__down__first" to="/">Home</router-link> 
                  <router-link class="nav__down__first" to="/profile">Profile</router-link>  
                  <router-link class="nav__down__first" v-if=logged to="/login">Login</router-link>  
                  <router-link class="nav__down__first" v-else  to="/logout">Logout</router-link> 
                  <router-link class="nav__down__first" v-if= testBool  to="/compte">Admin-users</router-link> 
                  <router-link class="nav__down__first" v-if= testBool  to="/comptemessages">Admin-messages</router-link> 
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
<style lang="scss">
    @import 'sass/main.scss';



.nav{
  padding: 20px;
}
.nav__in{
  display:flex;
 margin: 0 auto;
border: 3px solid black;
 width: 320px;
height: 50px;
border-radius: 30px;
}
.nav__down{
  padding: 20px;


}
.nav__down__first{
border: 3px solid black;
width: auto;
height: auto;
border-radius: 30px;
border: 3px solid rgb(230, 122, 122);
margin: 5px;
padding: 5px;
font-size: 10px;
font-weight: bold;
background: rgb(231, 216, 216);
text-decoration:none;
}


img {
  width: 100%;
  height: 100%;
  border-radius: 30px;
  margin:  auto;
}
.chargement {
    border: 10px solid #f3f3f3;
    border-top: 10px solid #99E2D0;
    border-bottom: 10px solid #FF79DA;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    -ms-border-radius: 50%;
    -o-border-radius: 50%;
    animation: spin 3s;
    opacity: 0;
    margin: auto;
    position: absolute;
    z-index: 2;
    top: 0%;
    left: 0%;
    right: 0%;
    bottom: 0%;
    -webkit-animation: spin 3s;
}
</style>


