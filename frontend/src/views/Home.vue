<template>
   <div class='group'>
      <div class='group__header'> 
          <div id="app">
             <div v-for= "message in messages" :key= "message.id"> 
                <div>
                  {{ message.title }}                    
                  {{ message.content }}
                  {{ message.Likes }}
                  {{ message.createdAt }}
                  {{ message.id }}
							</div> 
              <div _ngcontent-cpa-c6="" class="like-buttons">
                <div _ngcontent-cpa-c6="" class="likes">
                    <button button v-on:click="dolike( message.id )"><i _ngcontent-cpa-c6="" class="like fa-thumbs-up fa-lg far"></i></button>
                    <span _ngcontent-cpa-c6="">{{ message.likes }}</span>
                 </div> 
                 <div _ngcontent-cpa-c6="" class="dislikes">
                    <button button v-on:click="dodislike( message.id )"> <i _ngcontent-cpa-c6="" class="dislike fa-thumbs-down fa-lg far"></i></button>
                    <span _ngcontent-cpa-c6="">{{ message.dislikes }}</span>
                    </div> 
              </div>
             </div>
          </div>
      </div>
   </div>
</template>
<script>
import Vue from 'vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
  export default{
        data() {
          return {
            messages:[],
            like:"",
            dislike:""
          }
        },
        created(){
          axios
          .get('http://localhost:8080/api/messages/')
          .then(reponse => this.messages = reponse.data)
          .catch(error => console.log(error()))
        },
         methods: {
                  dolike: function (id) {
                   let objMySession = localStorage.getItem("obj")
                  let myStorageToken = JSON.parse(objMySession)
                  console.log("profile");
                  let token = myStorageToken.myToken;
                  console.log(token);
                                this.axios.post('http://localhost:8080/api/messages/'+id+'/vote/like',this.posts, {
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
                  },
                  dodislike: function (id) {
                   let objMySession = localStorage.getItem("obj")
                  let myStorageToken = JSON.parse(objMySession)
                  console.log("profile");
                  let token = myStorageToken.myToken;
                  console.log(token);
                                this.axios.post('http://localhost:8080/api/messages/'+id+'/vote/dislike',this.posts, {
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
  .like-buttons[_ngcontent-cpa-c6]{
    display:flex;
  }
  .dislikes[_ngcontent-cpa-c6], .likes[_ngcontent-cpa-c6]{
    margin:0 .3em;
  }
</style>