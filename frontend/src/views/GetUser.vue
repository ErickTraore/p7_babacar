<template>
    <div class='group'>
        <div class='group__header'>
            <div id="app">
                <div class='group__header__body'>
                  {{ id }}
                    <h4>Modification de l'utilisateur par l'administrateur</h4>
                    <div>Nom: {{ profile.username }}</div>
                    <div>Email: {{ profile.email }}</div>
                    <div>Biographie: {{ profile.bio }}</div>
                </div>
            </div>
            <form @submit="postData" method="post">
                <div class='group__header__body'>
                    <label>Mettre à jour ma biographie</label> <br> <br>
                    <input 
                            id="username"
                            name="username"
                            type="text"
                            v-model="profile.username"
                    > <br> <br>
                    <input 
                            id="bio"
                            name="bio"
                            type="text"
                            v-model="profile.bio"
                    ><br> <br>
                    <button type="submit">Modifier</button>
                    <button @click="nullUser()">Annuler</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'
  Vue.use(VueAxios, axios);
  export default {
    name: 'GetUser',
    props: ['id'],
    data() {
      return {
        profile: {
          id: this.id,
          username: '',
          bio: ''
        },
      }
    },
    created: function  () {
      this.axios.get('http://localhost:3000/api/users/'+ this.id + '/getUser')
        .then(response => {
          this.profile = response.data
          this.resetForm()
          this.$router.push('/compte');
          response.status(200).json(this.messages);
        })
        .catch(error => console.log(error()))
    },
    methods: {
      nullUser: function () {
        this.$router.push('/compte');
      },
    postData(e) {
                    let objMySession = localStorage.getItem("obj")
                    let myStorageToken = JSON.parse(objMySession)
                    console.log("profile");
                    let token = myStorageToken.myToken;
                    console.log('N° du Token =', token);
                  // console.warn(this.posts);
                this.axios.put('http://localhost:3000/api/users/'+ this.id +'/updateOne', this.profile, null, {
                  headers: {
                   'Authorization': token
                  }  
                })
                  .then(response => {
                    this.profile = response.data
                    this.$router.push({path: '/compte'})
                    response.status(200).json(this.profile)
                    })
                  .catch(function(err) {
                    err.statusCode = 401;
              });
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
      }
    }
  }
</script>
<style scoped>
  
</style>