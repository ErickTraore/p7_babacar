<template>
    <div id="app">
        <div class='group__header__body'>

            <div v-for="item  in messages" :key="item .id">
            <!-- <div v-for="item  in messages | paginate" :key="item .id"> -->
              <!-- <tr v-for="item in items | paginate"> -->
                <div>
                    <b>{{ item .User.username }}</b> à écrit le
                    {{ new Date(item .createdAt) | dateFormat('DD/MM/YYYY') }} à
                    {{ new Date(item .createdAt) | dateFormat('hh:mm') }} : <br>
                    <b>{{ item .title }}</b><br>
                    {{ item .content }}<br>                  <!-- <u>Nombre de like:</u> {{ message.likes }} -->
                </div>
                <div _ngcontent-cpa-c6="" class="like-buttons">
                    <div _ngcontent-cpa-c6="" class="likes">
                        <button id="dolike"
                                v-on:click="doLike(item .id)">
                            <i _ngcontent-cpa-c6="" class="like fa-thumbs-up fa-lg far"></i>
                        </button>
                        <span _ngcontent-cpa-c6="">{{ item .likes }}</span>

                    </div>
                    <div _ngcontent-cpa-c6="" class="dislikes">
                        <button
                                v-on:click="doDislike(item .id)">
                            <i _ngcontent-cpa-c6="" class="dislike fa-thumbs-down fa-lg far"></i>
                        </button>
                        <span _ngcontent-cpa-c6="">{{ item .dislikes }}</span>
                    </div>
                     <div _ngcontent-cpa-c6="" class="dislikes">
                        <button
                                v-on:click="doDelete(item .id)">
                           Supprimez 
                        </button>
                    </div>
                </div>
                 <ul>
    <!-- <li v-for="pageNumber in totalPages">
      <a href="#" @click="setPage(pageNumber)">{{ pageNumber+1 }}</a>
    </li> -->
  </ul>
            </div>
        
            <div class='group__header__body'>
                <form @submit="postData" method="post">
                    <label>Nouveau message</label> <br> <br>
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
                    > <br> <br>

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
            };
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
          })
          .catch(error => console.log(error()))

        e.preventDefault();
      },  
      doDelete: function (id) {
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
    }
  }
</script>
<style scoped>
    .group {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border:3px solid red ;
    }
    .group__header__body {
        padding: 1rem;
        border-radius: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
        background-color: rgb(172, 204, 214);
        border:3px solid rgb(66, 63, 63) ;


    }
    .like-buttons[_ngcontent-cpa-c6] {

        display: flex;
    }
    .dislikes[_ngcontent-cpa-c6], .likes[_ngcontent-cpa-c6] {
        margin: 0 .3em;
    }
    .dolile{
        border:10px solid rgba(29, 22, 22, 0.075) ;

    }
 
</style>