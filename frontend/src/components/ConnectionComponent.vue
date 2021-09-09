<template>
    <div class='group__header'>
        <form @submit="postData" method="post">
            <div class='group__header__body'>
                <input
                        id="email"
                        name="email"
                        placeholder="Email"
                        type="text"
                        v-model="posts.email"
                > <br> <br>

                <input
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        type="password"
                        v-model="posts.password"
                > <br> <br>
                <button type="submit">Se connecter</button>
            </div>
        </form>
    </div>
</template>

<script>
  import Vue from 'vue'
  import axios from 'axios'
  import VueAxios from 'vue-axios'

  Vue.use(VueAxios, axios)
  export default {
    name: 'PostComponent',
    data() {
      return {
        posts: {
          email: null,
          password: null,
        }
      }
    },
    methods: {
      postData(e) {
        this.axios.post('http://localhost:8080/api/users/login/', this.posts)
          .then(response => {
            this.user = response.data
            // stock token dans localStorage
            let objMySession = {
              myId: this.user.$userId,
              myToken: this.user.$token
            }
            let sessionStore = JSON.stringify(objMySession);
            localStorage.setItem("obj", sessionStore);
            // redirect to /home
            this.$router.push({path: '/'});
          })
          .catch(error => console.log(error()))

        e.preventDefault();
      }

    }
  }
</script>
<style scoped>
    * {
        box-sizing: border-box;
    }
    .group__header {
        font-size: 1.2rem;
        align-items: center;
        background-color: rgba(10, 10, 10, 0.288);
        padding: 1rem;
        border-radius: 2rem;
        color: white;
    }
    .group__header__body {
        padding: 1rem;
        background-color: rgba(14, 14, 15, 0.205);
        border-radius: 2rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
</style>