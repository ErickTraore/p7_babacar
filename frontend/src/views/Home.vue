<template>
    <div id="app">

        <div class="group">
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

        <div class='group__header__body'>
            <div v-for="message in messages" :key="message.id">
                <div>
                    <b>{{ message.User.username }}</b> à écrit le
                    {{ new Date(message.createdAt) | dateFormat('DD/MM/YYYY') }} à
                    {{ new Date(message.createdAt) | dateFormat('hh:mm') }} : <br>
                    <b>{{ message.title }}</b><br>
                    {{ message.content }}<br>
                    <u>Nombre de like:</u> {{ message.likes }}
                </div>
                <div _ngcontent-cpa-c6="" class="like-buttons">
                    <div _ngcontent-cpa-c6="" class="likes">
                        <button
                                v-on:click="doLike(message.id)">
                            <i _ngcontent-cpa-c6="" class="like fa-thumbs-up fa-lg far"></i>
                        </button>
                    </div>
                    <div _ngcontent-cpa-c6="" class="dislikes">
                        <button
                                v-on:click="doDislike(message.id)">
                            <i _ngcontent-cpa-c6="" class="dislike fa-thumbs-down fa-lg far"></i>
                        </button>
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
  import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

  Vue.use(VueFilterDateFormat);
  Vue.use(VueAxios, axios)
  export default {
    data() {
      return {
        messages: [],
        like: "",
        dislike: "",
        posts: {
          title: null,
          content: null,
        }
      }
    },
    created() {
      axios
        .get('http://localhost:8080/api/messages/')
        .then(response => this.messages = response.data)
        .catch(error => console.log(error()))
    },
    methods: {
      doLike: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:8080/api/messages/' + id + '/vote/like', null, {
            headers: {
              'Authorization': token
            }
          }
        )
          .then(() => {
            axios
              .get('http://localhost:8080/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))

          })
          .catch(error => console.log(error()))
      },
      doDislike: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:8080/api/messages/' + id + '/vote/dislike', null, {
            headers: {
              'Authorization': token
            }
          }
        )
          .then(() => {
            axios
              .get('http://localhost:8080/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
          })
          .catch(error => console.log(error()))
      },
      postData(e) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:8080/api/messages/new/', this.posts, {
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
              .get('http://localhost:8080/api/messages/')
              .then(response => this.messages = response.data)
              .catch(error => console.log(error()))
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
    .group__header__body {
        padding: 1rem;
        background-color: rgba(14, 14, 15, 0.205);
        border-radius: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .like-buttons[_ngcontent-cpa-c6] {
        display: flex;
    }
    .dislikes[_ngcontent-cpa-c6], .likes[_ngcontent-cpa-c6] {
        margin: 0 .3em;
    }
</style>