<template>
  <div> 
  <form
    @submit="postData" 
    method="post"  
  >
    <!-- <input
      id="username"
      v-model="posts.username"
      type="text"
      name="username"
      placeholder="username"
    > <br> <br>
    <input
      id="email"
      v-model="posts.email"
      type="text"
      name="email"
      placeholder="Email"
    > <br> <br> -->

<label>Biographie </label>
    <input
      id="bio"
      v-model="posts.bio"
      type="text"
      name="bio"
      placeholder="Biographie"
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
                      username: '',
                      email: '',
                      bio: '',
                        }
                }
              },
        methods:{
              postData(e){
                    let objMySession = localStorage.getItem("obj")
                    let myStorageToken = JSON.parse(objMySession)
                    console.log("profile");
                    let token = myStorageToken.myToken;
                    console.log('N° du Token =', token);
                  // console.warn(this.posts);
                this.axios.put('http://localhost:8080/api/users/me/',this.posts,{
                  headers: {
                   'Authorization': token}  
                })
                  .then(reponse => console.log(reponse.data))
                  .then(reponse => {
                    this.user = reponse.data
                    })
                  .catch(error => console.log(error()))

                e.preventDefault();
              }
      
          }
  }
</script>
<style scoped>

table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}
</style>