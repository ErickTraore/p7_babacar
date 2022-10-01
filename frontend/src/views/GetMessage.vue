<template>
    <div>
      <!-- <h3>Modification</h3>
      <p>My message number</p> 
      <p>  {{ id }} </p> -->
      <div class='group__header__body'>
        <form @submit="onPostData" method="post" enctype="multipart/form-data" name="message" id="this.id">
            <h3><label class="labelForm">Modification messagerie</label></h3> <br> <br>
              <p v-if="errors.length">
                        <b>Merci de corriger les erreurs suivantes : </b>
                      <ul>
                          <li v-for="error in errors" :key="error">{{ error }}</li>
                      </ul>
              </p>
                    <label>Titre</label>

              <input 
                id="title"
                v-model="posts.title"
                type="text"
                name="title"
              >
              <br><br>
              <label>Message</label>
              <input 
                id="content"
                v-model="posts.content"
                type="text"
                name="content"
              >
              <br><br>
              <input
                id="attachment"
                v-model="posts.attachment"
                type="hidden"
                name="attachment"
              > 
              <br> 
                <div>
                    <div v-if="!image">
                        <h3>Modifier image</h3>
                    <div id="list"> </div>
                    <input 
                            id="file" 
                            type="file" 
                            @change="onFileSelected"
                            name="attachment"
                            alt="mon-image"
                    >
                    </div>
                    <div v-else>
                      <div v-if="loadingImage" class="progress">
                        <div class="value v-80 striped animate s-10">Chargement...</div>
                      </div>
                      <div v-else>
                        <img :src="image" />
                      </div>
                      <button @click="removeImage">Remove image</button>
                    </div>
                </div> <br><br>
                <div>
                </div>
              <button 
                type="submit"
                value="val"

              >
                Envoyer
              </button>
      </form>
      </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  import Vue from 'vue'
  import HTTP from 'http'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  import FormData from 'form-data'


   Vue.use(VueAxios, axios);

  const http = require("http");
  var req = require('request');

    export default {
        name: 'GetMessage',
        props: ['id'],
        data() {
      return {
        loading: false,
        loadingTemplate: true,
        loadingImage: true,
              id: Number,
              myId: Number,
              idImage: '',
              testName: Boolean,
              image:'',
              selectedFile: null,
              file: Blob,
              errors: [],
              message: {
                title: '',
                content: '',
                attachment: '',
              },
              posts: {
                id: this.id,
                title: '',
                content: '',
                attachment: '',
              },
    }
  },
  
  created: function  () {
    console.log('Je teste');
    console.log(this.id);
    console.log('fin des testes');

        this.axios.get('http://localhost:3000/api/messages/' + this.id + '/getMessage')
        .then(response => {
          this.posts = response.data
          this.message = response.data
          console.log(this.posts)
          console.log(this.posts.title)
        })
        .catch(function(err) {
                err.statusCode = 401;
              });  
  },
  methods: {
      showMessageupdate: function (id) {
        this.$router.push({name : 'GetMessage', params : {id :id}});
      },
      resetForm() {
        console.log('Reseting the form')
        var self = this; //you need this because *this* will refer to Object.keys below`

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
        if (!this.posts.title) {
          this.errors.push('Veillez saisir le titre');
          }
         else if (this.posts.title.length >= 30 || this.posts.title.length <= 3){
          this.errors.push('Votre titre doit comprendre entre 4 et 30 caractères.');
        }
        if (!this.posts.content) {
          this.errors.push('Veillez saisir le message');
        } else if (this.posts.content.length >= 550 || this.posts.content.length <= 3){
          this.errors.push('Votre message doit contenir entre 4 et 550 caractères.');
        }
        if (!this.errors.length) {
          console.log('Vérification des inputs --> OK')
          return this.post(this.posts);
        }
      },
        post: function (posts, e) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.put('http://localhost:3000/api/messages/' + this.id +'/updateMessage', posts, {
            headers: {
              'Authorization': token
            }
          }
        )
         .then(reponse => {
            this.message = reponse.data
            console.log('message crée ok')
            axios
              .get('http://localhost:3000/api/messages/')
              .then(response => {
                this.messages = response.data
                this.resetForm()
                this.image = '';
                this.$router.push('/comptemessages');
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
      // }

          }
}
</script>