<template>
    <div class='group'>
        <div class='group__header'>
            <div id="app">
                <div class='group__header__body'>
                    <h3>Mon profil</h3>
                <div class="Logout__header__body">
                    <div class="Logout__header__body__first__in">
                      <div>Pseudo: {{ profile.username }}</div>
                      <div>Email: {{ profile.email }}</div>
                      <div>Biographie: {{ profile.bio }}</div>
                    </div>
                </div>
              </div>
            </div>
            <form @submit="postData" method="post">
                <div class='group__header__body'>
                    <label>Mettre à jour ma biographie</label> <br> <br>
                    <textarea
                            id="bio"
                            name="bio"
                            placeholder="Biographie"
                            type="text"
                            v-model="posts.bio"
                    ></textarea> <br> <br>
                    <div class="valid">
                      <div class="valid__in">
                        <button type="submit">Validez</button>
                      </div>
                      <div class="valid__in">
                        <button @click='goHome()'>Annulez</button>
                      </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
// import { mapState } from 'vuex';
  export default {
    data() {
      return {
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
        .then(response => {
          this.profile = response.data
          this.posts = response.data
          this.testUser = this.profile.testUser
          console.log(this.testUser) // this.$store.dispatch("beforeLogged")
      if(this.testUser == 'testOk'){
       this.$store.dispatch("beforeLogged")
      }
        })
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
            this.$router.push('/')
            response.status(200).json(this.profile);
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
      },
      goHome() {
            this.$router.push('/')
      }

    }
  }
</script>
<style lang="scss">
    @import 'sass/main.scss';
   .valid {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
  }
  button {
      background-color: white
       !important;
      border-radius: 20px !important;
      padding: 5px;
      }
 
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
      background-color: rgb(35, 49, 82);
      margin-bottom: 2rem;

  }
  .group__header__body {
      padding: 1rem;
      background-color: rgba(196, 192, 192, 0.849);
      border-radius: 2rem;
      margin-top: 1rem;
      margin-bottom: 2rem;
  }
  h3 {
      display: flex;
      padding: 1rem;
      background-color: rgba(196, 192, 192, 0.849);
      border-radius: 2rem;
      justify-content: center;
      margin-bottom: 2rem;

  }
</style>