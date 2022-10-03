<template>
    <div v-if="loadingTemplate">
        <div class="text-center">
            <b-spinner variant="primary" style="width: 15rem; height: 15rem;" label="Large Spinner"></b-spinner>
        </div>
    </div>
    <div v-else>
        <div id="app" class="group__header">
            <div class="group__header__body">
                <div class="container" v-for="item  in messages" :key="item .id">
                    <div class="group__header__body__first"> 
                        <div class="group__header__body__first__in"> 
                            <img :src="item.attachment" alt="" />
                            <div id="progress-bar">
                            <div></div>
                            </div>
                            <b>Publié par: {{ item .User.username }}</b><b> le
                                {{ new Date(item .createdAt) | dateFormat('DD/MM/YYYY') }} à
                                {{ new Date(item .createdAt) | dateFormat('hh:mm') }} :</b> <br>
                            <div class="group__header__body__first__title"> 
                                <div class="title">Titre:</div>
                                <div class="texte"> {{ item .title }}</div>
                            </div>
                        </div>
                        <div class="group__header__body__first__down"> 
                            {{ item .content }}<br> 
                        </div> 
                    </div>
                    <div class="group__header__body__like">
                        <div class="group__header__body__like__left">
                                <div class="group__header__body__like__left__likes">
                                    <button-1 
                                    id="dolike"
                                    v-on:click="doLike(item .id)"
                                    >
                                    <i class="like fa-thumbs-up fa-lg far"></i>
                                    </button-1>
                                    <span class="spanLikes" _ngcontent-cpa-c6="">{{ item .likes }}</span>
                                </div>
                                <div class="group__header__body__like__left__dislikes">
                                    <button-2
                                        v-on:click="doDislike(item .id)">
                                    <i class="dislike fa-thumbs-down fa-lg far"></i>
                                    </button-2>
                                    <span class="spanDislikes" _ngcontent-cpa-c6="">{{ item .dislikes }}</span>
                                </div>
                        </div>
                        <div class="right">
                                <div class="dislikes">
                                    <button-3
                                        class="btn-1"
                                        v-if="myId == item.UserId"  
                                        @click="showMessageupdate(item .id);"> 
                                        Modifier
                                    </button-3>
                                </div>
                                <div class="dislikes">
                                    <button-4
                                        class="btn-1"
                                        v-if="myId == item.UserId" 
                                        v-on:click="doDelete(item .id)">
                                        <i class="fa fa-trash-o"></i>
                                    </button-4>
                                </div>
                        </div>
                    </div>
                    <ul></ul>
                </div>
            </div>
        </div>
    </div>
</template>              
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  const path = require("path");
  const isLocal = typeof process.pkg === "undefined";
  const basePath = isLocal ? process.cwd() : path.dirname(process.execPath);
  const baseUri = "ipfs://NewUriToReplace";
  const http = require("http");
  var req = require('request');

  import Vue from 'vue'
  import HTTP from 'http'
  import axios from 'axios';
  import { SpinnerPlugin } from 'bootstrap-vue'
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import VueAxios from 'vue-axios'
  import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

   Vue.use(VueFilterDateFormat);
   Vue.use(VueAxios, axios);
   Vue.use(SpinnerPlugin)

  export default {
    name: ' MessagesListComponent',
  
    data() {
      return {
        loadingTemplate: true,
              id: Number,
              myId: Number,
              idImage: '',
              testName: Boolean,
              file: Blob,
              errors: [],
              message: {
                title: '',
                content: '',
                attachment: '',
              },
              image:'',
              selectedFile: null,
              messages: [],
              messages: {},
              likes: 0,
              dislikes:0,
      }
    },
     components: {
    PulseLoader,
    },
    created() {
        let myId = -1;
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        myId = myStorageToken.myId;
        setTimeout(() => {
      axios
        .get('http://localhost:3000/api/messages/')
        .then(response => {
          this.myId = myId
          this.messages = response.data
          })
        .catch(error => console.log(error()))
        .finally(() => 
          this.loadingTemplate = false
        )
    }, 3000)
    },
  methods: {
      showMessageupdate: function (id) {
        this.$router.push({name : 'GetMessage', params : {id :id}});
      },
      resetForm() {
        console.log('Reseting the form')
        var self = this; 
        Object.keys(this.message).forEach(function(key,index) {
          self.message[key] = '';
        });
      },
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
    doDelete: function (id) {
        console.log('position: doDelete dans home.vue');
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:3000/api/messages/' + id + '/del', null, {
            headers: {
              'Authorization': token
            }
          })
          .then(reponse => {
            console.log('Deleting message-1')
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => {
                console.log('Deleting message')
                this.messages = response.data
                this.resetForm()
                res.status(200).json(this.messages);
                })
              .catch(function(err) {
                err.statusCode = 401;
                });
          })
        .catch(function(err) {
              err.statusCode = 401;
              });
    },
    }
}
</script>
<style lang="scss">
    @import 'sass/main.scss';

</style>