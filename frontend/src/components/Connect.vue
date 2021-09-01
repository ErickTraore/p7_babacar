<template>
  <div> 
  <form
    @submit="postData" 
    method="post"  
  >
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
      <button type="submit">Post</button>
  </form>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

  export default{
     name: 'PostComponent',
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
                this.axios.post('http://localhost:8080/api/users/login/',this.posts)
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
                    console.log(this.user.$userId)
                    console.log(this.user.$token)
                    })
                  .catch(error => console.log(error()))

                e.preventDefault();
              }
      
          }
  }
</script>
