<template>
  <div class="group">
      <div v-if= logged >
          <div class="connecte">
          <h3> <i class="fa fa-info-circle"> Vous n'êtes pas connecté</i></h3> 
          </div>
          <ConexionComponent />
      </div>
      <div v-else>
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
                          <div v-if= "item.attachment" class= "group__header__body__first__in__image">
                            <img :src= "item.attachment" alt= "monImage" />
                              <div id= "progress-bar">
                                <div></div>
                              </div>
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
                                    <button
                                    aria-label="btn-dolike"
                                    v-on:click="doLike(item .id)"
                                    >
                                    <i class="like fa-thumbs-up fa-lg far"></i>
                                    </button>
                                    <span class="spanLikes" _ngcontent-cpa-c6="">{{ item .likes }}</span>
                                </div>
                                <div class="group__header__body__like__left__dislikes">
                                    <button
                                        v-on:click="doDislike(item .id)"
                                        aria-label="btn-doDislike">
                                    <i class="dislike fa-thumbs-down fa-lg far"></i>
                                    </button>
                                    <span class="spanDislikes" _ngcontent-cpa-c6="">{{ item .dislikes }}</span>
                                </div>
                        </div>
                    <div class="group__header__body__like">
                        <div class="group__header__body__like__left">
                                <div class="group__header__body__like__left__but">
                                    <button
                                        aria-label="btn-dislikes"
                                        v-if="myId == item.UserId"  
                                        @click="showMessageupdate(item .id);"> 
                                        Modifier
                                    </button>
                                </div>
                        <div class="group__header__body__like__left__but">
                                    <button
                                        aria-label="btn-delete"
                                        v-if="myId == item.UserId" 
                                        v-on:click="doDelete(item .id)">
                                        <i class="fa fa-trash-o"></i>
                                    </button>
                                  </div>
                        </div>
                      </div>
                    </div>
                    <ul></ul>
                        </div>
                      </div>
                    </div>
              </div>
              <div class='group__header__body'>
                        <form @submit="onPostData" method="post" enctype="multipart/form-data" name="message">
                          <h3> <i class="connecte fas fa-comment"> Votre messagerie</i></h3> 
                            <p v-if="errors.length">
                                <b>Merci de corriger les erreurs suivantes : </b>
                                <ul>
                                <li v-for="error in errors" :key="error">{{ error }}</li>
                                </ul>
                            </p>
                            <label for="title"> Titre</label>
                              <input
                                  id="title"
                                  v-model="message.title"
                                  type="text"
                                  name="title"
                                  placeholder="Titre"
                              > <br> <br>
                              <label for="content">Message</label>
                              <textarea
                                  id="content"
                                  v-model="message.content"
                                  type="text"
                                  name="content"
                                  placeholder="Contenu"
                              ></textarea>
                              <input
                                  id="attachment"
                                  v-model="message.attachment"
                                  type="hidden"
                                  name="attachment"
                              > <br> 
                              <div>
                                  <div v-if="!image">
                                    <h3> <i class="connecte fas fa-comment"> Inserer une image</i></h3> 
                                      <div id="list">
                                      </div>
                                      <label for ="file">Votre image</label>
                                      <input 
                                          id="file" 
                                          type="file" 
                                          @change="onFileSelected"
                                          name="attachment"
                                          alt="example"
                                      >
                                  </div>
                                  <div v-else>
                                      <div v-if="loadingImage" class="progress">
                                              <div class="value v-80 striped animate s-10">Chargement...</div>
                                      </div>
                                      <div v-else>
                                              <img :src="image" />
                                      </div>
                                      <button 
                                      id="remove"
                                      @click="removeImage"
                                      aria-label="remove"
                                      >
                                      Remove image
                                      </button>
                                  </div>
                              </div><br><br>
                              <div>
                              </div>
                              <button
                                  id="soumission"
                                  type="submit" 
                                  aria-label="submit"
                                  value="val"
                              >
                              <i class="fa fa-paper-plane "></i>
                              </button> 
                        </form>
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
import FormData from 'form-data'
import { mapGetters } from 'vuex'
import { mapState } from 'vuex'
import ConexionComponent from '@/components/ConexionComponent.vue'

 Vue.use(VueFilterDateFormat);
 Vue.use(VueAxios, axios);
 Vue.use(SpinnerPlugin)

export default {
  name: 'Home',
  computed: {
    ...mapGetters(["imageExist"]),
    ...mapState(['logged']),
  },
  data() {
    return {
      loading: false,
      loadingTemplate: true,
      loadingImage: false,
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
            posts: {
                title:'',
                content: '',
                attachment:'' ,
                loading: false
        },
        color: '#071b46',
        color1: 'red',
        size: '45px',
        margin: '2px',
        radius: '2px'
    }
  },
   components: {
  PulseLoader,
  ConexionComponent,
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
      //you need this because *this* will refer to Object.keys below`
      //Iterate through each object field, key is name of the object field`
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
  onPostData(e) {
    e.preventDefault();
      this.errors = [];
      if (!this.message.title) {
        this.errors.push('Veillez saisir le titre');
        }
       else if (this.message.title.length >= 30 || this.message.title.length <= 3){
        this.errors.push('Votre titre doit comprendre entre 4 et 30 caractères.');
      }
      if (!this.message.content) {
        this.errors.push('Veillez saisir le message');
      } else if (this.message.content.length >= 550 || this.message.content.length <= 3){
        this.errors.push('Votre message doit contenir entre 4 et 550 caractères.');
      }
      if (!this.errors.length) {
        console.log('Vérification des inputs --> OK')
        return this.post(this.message);
      }
    },
      post: function (message, e) {
      let objMySession = localStorage.getItem("obj")
      let myStorageToken = JSON.parse(objMySession)
      let token = myStorageToken.myToken;
      this.axios.post('http://localhost:3000/api/messages/new/', message, {
          headers: {
            'Authorization': token
          }
        }
      )
       .then(reponse => {
          this.message = reponse.data
          console.log('message crée ok')
          this.$router.push('/')
        })
        .catch(function(err) {
              err.statusCode = 401;
            });
    },
  onFileSelected(e) {
    this.selectedFile = e.target.files[0];
    var files = e.target.files || e.dataTransfer.files;
    if (!files.length)
      return;
    this.createImage(files[0]);
  },
  createImage(file, next) {
    var image = new Image();
    var reader = new FileReader();
    var vm = this;
    reader.onload = (e) => {
      vm.image = e.target.result;
    };
    reader.readAsDataURL(file);
    if(this.image)
      return; 
      this.pushImage();
  },
  pushImage(e) {
      let objMySession = localStorage.getItem("obj")
      let myStorageToken = JSON.parse(objMySession)
      let token = myStorageToken.myToken;
      const util = require('util');
      var fileName = fileName;
      var formData = new FormData();
      var imagefile = document.querySelector('#file');
      console.log('Mon imageFile[0] :',imagefile.files[0]);
      formData.append("file", imagefile.files[0]);
      setTimeout(() => {
      axios
      .post('http://localhost:3000/api/messages/upload', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data' 
        }
    })   
   .then((res) => {
     console.log('valeure reçu par le back:',res.data);
     console.log('valeure res.data.idImage:',res.data.idImage);
        return res.data.idImage;
   })
   .then(function(idImage){
     const attachment = document.querySelector("#attachment");
        attachment.value = "http://localhost:3000/images/"+idImage;
        attachment.dispatchEvent(new Event('input'));
        response.status(200).json({idImage})
   })
  .catch(function(err) {
   err.statusCode = 401;
   })
  .finally(() => 
        this.loadingImage = false
      )
        }, 1000)
},
  removeImage: function(e) {
      let objMySession = localStorage.getItem("obj")
      let myStorageToken = JSON.parse(objMySession)
      let token = myStorageToken.myToken;
      var fileName = this.selectedFile.name;
      
      console.log('Envoie dufichier pour écrasement',fileName);
      var formData = new FormData();
      formData.append("file", this.selectedFile);
      axios.post('http://localhost:3000/api/messages/delLienImage', formData, {
        headers: {
          'Authorization': token,
          'Content-Type': 'multipart/form-data' 
        }
    })   
    this.image = '';
    console.log('Le fichier vient d\'être effacé du navigateur');
    this.message.attachment = '';
    console.log('L\'url du fichier vient d\'être effacé du formulaire');
    e.preventDefault();
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