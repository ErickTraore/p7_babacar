<template>
<div class='group'>
   <div class='group__header'> 
     <div>CONEXION</div>
      <form
        @submit="postData" 
        method="post"  
      >
                  <div class='group__header__body'>
                    <input
                      id="email"
                      v-model="posts.email"
                      type="text"
                      name="email"
                      placeholder="Email"
                    > <br> <br>

                    <input
                      id="password"
                      v-model="posts.password"
                      type="password"
                      name="password"
                      placeholder="Password"
                    > <br> <br>
                      <button type="submit">Conexion</button>
                  </div>
      </form>  
     <div>Vous n'avez pas de compte:</div>
     <div>
       <a href="/Singnup#/signup">Créer un compte</a>

       </div>

   </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
  export default{
     name: 'ConexionComponent',
        data() {
                return {
                    posts: {
                      email: null,
                      password: null,
                        }
                }
              },
        methods:{
              postData(e){
                  // console.warn(this.posts);
                this.axios.post('http://localhost:3000/api/users/login/',this.posts)
                  // .then(reponse => console.log(reponse.data))
                  .then(reponse => {
                    this.user = reponse.data
                    // stokage token dans localStorage
                    let objMySession = {
                      myId: this.user.$userId,
                      myToken: this.user.$token
                      }
                    let sessionStore = JSON.stringify(objMySession);
                    localStorage.setItem("obj",sessionStore);
                    this.$router.push({path: '/'});
                    })
                  .catch(error => console.log(error()))

                e.preventDefault();
              }
      
          }
  }
</script>
<style scoped>

.group {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
* {
  box-sizing: border-box;
}
.group__header{
  font-size:1.2rem;
  align-items: center;
  background-color:rgba(10, 10, 10, 0.288);
  padding:1rem;
  border-radius:2rem;
  color:white;
  }
  .group__header__body{
        padding: 1rem;
        background-color:rgba(14, 14, 15, 0.205);
        border-radius:2rem;
        margin-top:1rem;
        margin-bottom:1rem;
        }
</style>