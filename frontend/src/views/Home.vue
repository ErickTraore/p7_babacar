<template>
    <div id="app">
        <div class="group__header__body">

            <div class="container" v-for="item  in messages" :key="item .id">
            <!-- <div v-for="item  in messages | paginate" :key="item .id"> -->
              <!-- <tr v-for="item in items | paginate"> -->
                <div class="group__header__body__first"> 
                   <div class="group__header__body__first__in"> 
                      <b>{{ item .User.username }}</b> à écrit le
                      {{ new Date(item .createdAt) | dateFormat('DD/MM/YYYY') }} à
                      {{ new Date(item .createdAt) | dateFormat('hh:mm') }} : <br>
                      <b>{{ item .title }}</b><br>
                  </div>
                 
                   <div class="group__header__body__first__down"> 
                     {{ item .content }}<br> 
                    </div>             <!-- <u>Nombre de like:</u> {{ message.likes }} -->
                </div>
                <div _ngcontent-cpa-c6="" class="position like-buttons group__header__body__second">
                  <div class="left">
                        <div _ngcontent-cpa-c6="" class="likes">
                            <button id="dolike"
                                    v-on:click="doLike(item .id)">
                                <i _ngcontent-cpa-c6="" class="like fa-thumbs-up fa-lg far"></i>
                            </button>
                            <span class="spanLikes" _ngcontent-cpa-c6="">{{ item .likes }}</span>

                        </div>
                        <div _ngcontent-cpa-c6="" class="dislikes">
                            <button
                                    v-on:click="doDislike(item .id)">
                                <i _ngcontent-cpa-c6="" class="dislike fa-thumbs-down fa-lg far"></i>
                            </button>
                            <span class="spanDislikes" _ngcontent-cpa-c6="">{{ item .dislikes }}</span>
                        </div>
                  </div>
                  <div class="right">
                     <div _ngcontent-cpa-c6="" class="dislikes">
                        <button class="colorRed"
                                v-on:click="doDelete(item .id)">
                           Supprimer votre message
                        </button>
                    </div>
                  </div>

                </div>
                 <ul>
  </ul>
            </div>
        
            <div class='group__header__body'>
                <form @submit="postData" method="post" enctype="multipart/form-data">
                    <label class="labelForm">Nouveau message</label> <br> <br>
                    <input
                            id="title"
                            v-model="posts.title"
                            type="text"
                            name="title"
                            placeholder="Titre"
                    > <br> <br>

                    <input
                            id="content"
                            v-model="posts.content"
                            type="text"
                            name="content"
                            placeholder="Contenu"
                    > <br> 
           <div>
                          <div v-if="!image">
                            <h2>Select an image</h2>
                            <input type="file" @change="onFileSelected">
                          </div>
                          <div v-else>
                            <img :src="image" />
                            <button @click="removeImage">Remove image</button>
                          </div>
                        </div>
            <br><br>
                      <button type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  import Vue from 'vue'
  import axios from 'axios';
  import VueAxios from 'vue-axios'
  import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

  Vue.use(VueFilterDateFormat);
  Vue.use(VueAxios, axios)
  export default {
    data() {
      return {
        selectedFile: null,
        image:'',
        messages: [],
        likes: 0,
        dislikes:0,
        posts: {
          title: null,
          content: null,
          loading: false
          },
      }
    },
    created() {
      axios
        .get('http://localhost:3000/api/messages/')
        .then(response => {
          this.messages = response.data

          })
        
        .catch(error => console.log(error()))
    },

  methods: {
    
      doLike: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:3000/api/messages/' + id + '/vote/like', null, {
            headers: {
              'Authorization': token
            }
          }
        )
          .then(() => {
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))

          })
          .catch(error => console.log(error()))
      },
      doDislike: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:3000/api/messages/' + id + '/vote/dislike', null, {
            headers: {
              'Authorization': token
            }
          }
        )
          .then(() => {
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
          })
          .catch(error => console.log(error()))
      },
      postData(e) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;



        this.axios.post('http://localhost:3000/api/messages/new/', this.posts, {
            headers: {
              'Authorization': token
            }
          }
        )
          .then(() => {
            this.posts = {
              title: null,
              content: null,
              attachment: null
            };
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
          })
          .catch(error => console.log(error()))

        e.preventDefault();
      },

      onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    },  
      doDelete: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:3000/api/messages/' + id + '/del', null, {
            headers: {
              'Authorization': token
            }
          })
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
      },
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
    .group__header__body {
        padding: 1rem;
        border-radius: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: rgb(35, 49, 82);
    }
    .group__header__body__first {
        height: 100%;
        margin: 5px;
    }
    .group__header__body__first__in {
        font-size: 10px;


     }
    .group__header__body__first__down {
        font-size: 14px;
        background-color:white;


     }
     .group__header__body__second {
        height: 100%;
        /* background-color: rgb(104, 161, 18); */

    }
    .like-buttons[_ngcontent-cpa-c6] {

        display: flex;
    }
    .dislikes[_ngcontent-cpa-c6], .likes[_ngcontent-cpa-c6] {
        margin: 0 .3em;
    }
  .position{
        display: flex;
justify-content: space-between;

  }
  .left{
        display: flex;
        

  }
  .right{
        display: flex;

  }
 .spanLikes{
padding: 0px 7px 0px 7px;
background: rgb(134, 228, 139);
border: solid 1px black;

 }
  .spanDislikes{
padding: 0px 7px 0px 7px;
background: rgb(230, 122, 122);
border: solid 1px black;
 }
 .colorRed{
   color: red;
   font-size: 8px;
   }
   .container{
    border: solid 5px rgb(189, 182, 182);
    background: rgba(248, 247, 247, 0.801);
    border-radius: 20px;
    margin: 5px;
   }
   .labelForm {
     color:white;
   }
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
</style>