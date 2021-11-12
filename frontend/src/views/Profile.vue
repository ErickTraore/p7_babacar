<template>
    <div class='group'>
        <div class='group__header'>
            <div id="app">
                <div class='group__header__body'>
                    <h2>Mon profil</h2>
                    <div>Pseudo: {{ profile.username }}</div>
                    <div>Email: {{ profile.email }}</div>
                    <div>Biographie: {{ profile.bio }}</div>
                </div>
            </div>
          
            <form @submit="postData" method="post">
                <div class='group__header__body'>
                    <label>Mettre à jour ma biographie</label><br>
                    <textarea
                            id="bio"
                            name="bio"
                            placeholder="Biographie"
                            type="text"
                            v-model="posts.bio"
                    ></textarea><br>
                    <button type="submit">Soumettre</button>
                </div>
            </form>
            <form @submit="postData" method="post">
                <div class='group__header__body'>
                    <label>Mettre à jour ma photo profile</label> <br>
                   <div id='main'>
                    <input type="file" name="picture" id="picture"><br>
                    <!-- Input text lié à une variable de vuejs pour le texte alternatif de l'image -->
                    <input type="text" name="alt-picture" id="" placeholder="alt text" v-model="alt_text"> <br>
                    <!-- Le bouton d'envoi lié à une fonction d'envoi -->
                    <button @click="envoi()">Envoyer</button>
                </div>
                </div>
                <div>
                    <button class="colorRed" @click="delProfil()">Supprimer mon compte</button>

                </div>
            </form>
        </div>

    </div>
</template>

<script>
  import axios from 'axios';
// import { mapState } from 'vuex';

  export default {
     name: 'App',
    data() {
      return {
        alt_text: '',
        profile: '',
        posts: {
          username: '',
          email: '',
          bio: '',
        }
      }
    },
    created() {
      let objMySession = localStorage.getItem("obj")
      let myStorageToken = JSON.parse(objMySession)
      let token = myStorageToken.myToken;
      axios
        .get('http://localhost:3000/api/users/me/', {
          headers: {
            'Authorization': token
          }
        })
        .then(response => this.profile = response.data)
        .catch(error => console.log(error()))
    },
    methods: {
      postData(e) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;

        this.axios.put('http://localhost:3000/api/users/me/', this.posts, {
          headers: {
            'Authorization': token
          }
        })
          .then(response => {
            this.profile.bio = response.data.bio
          })
          .catch(error => console.log(error()))

        e.preventDefault();
      }, 
      delProfil() {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;

        this.axios.post('http://localhost:3000/api/users/delProfil', null, {
          headers: {
            'Authorization': token
          }
        })
          .then(response => {
            this.profile = response.data
          })
          .catch(error => console.log(error()))

      },envoi(){
      // Récupération de l'image
      let img = document.getElementById('picture').files[0]
      // Création d'un formData obligatoire pour envoi de l'image
        var formData = new FormData()
        formData.append('img', img)
        formData.append('alt_text', this.alt_text)
        // Envoi des données sur l'url du serveur (mettez la votre) en POST en envoyant le formData contenant notre image et notre texte
        axios.post('http://localhost:3000/upload_image', formData)
          .then((resp) => {
            console.log(resp)
          })
          .catch((err) => {
            console.log(err.response)
          })
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

    .group__header {
        font-size: 1.2rem;
        align-items: center;
        padding: 1rem;
        border-radius: 2rem;
        color: white;
          background-color: rgb(35, 49, 82);



    }

    .group__header__body {
        padding: 1rem;
        background-color: rgba(196, 192, 192, 0.849);

        border-radius: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    .colorRed{
   color: red;
   font-size: 10px;
   }
</style>