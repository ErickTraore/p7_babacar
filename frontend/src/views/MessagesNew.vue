
<template>
  <div> 
  <form
    @submit="postData" 
    method="post"  
  >
    <input
      id="title"
      v-model="posts.title"
      type="text"
      name="title"
      placeholder="title"
    > <br> <br>

    <input
      id="content"
      v-model="posts.content"
      type="text"
      name="content"
      placeholder="content"
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
                      title: null,
                      content: null,
                        }
                }
              },
        methods:{
              postData(e){
                  let objMySession = localStorage.getItem("obj")
                  let myStorageToken = JSON.parse(objMySession)
                  console.log("profile");
                  let token = myStorageToken.myToken;
                  console.log(token);
                this.axios.post('http://localhost:8080/api/messages/new/',this.posts, {
  headers: {
    'Authorization': token
  }
})
                  // .then(reponse => console.log(reponse.data))
                  .then(reponse => {
                    this.message = reponse.data
                    
                    })
                  .catch(error => console.log(error()))

                e.preventDefault();
              }
      
          }
  }
</script>
