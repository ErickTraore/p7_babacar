
<template>
  <div class='group'>
        <div class='group__header'> 
              <form
                @submit="postData" 
                method="post"  
              >
      <div class='group__header__body'>

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
        </div>

                  <button type="submit">Post</button>
              </form>
        </div>
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
}
)
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