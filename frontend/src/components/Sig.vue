<template>
  <div class='group'>
   <div class='group__header'> 
      <form
        id="app"
        @submit="checkForm"
        action="http://localhost:8080/api/users/register/"
        method="post"
        
      >
      <div class='group__header__body'>
        <p v-if="errors.length">
          <b>Please correct the following error(s):</b>
          <ul>
            <li v-for="error in errors" :key="error">{{ error }}</li>
          </ul>
        </p>  
          <p>
        <label for="username">Pseudo :</label>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
        >
      </p> 
        <p>
        <label for="email">Email :</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
        >
      </p> 
      <p>
        <label for="password">Password :</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
        >
      </p> 
          <button class="btn"> Submit</button>
   </div>

      </form>
   </div>
  </div>
</template>
<script>
import axios from 'axios';
  export default{
     name: 'PostFormAxios',
        data() {
          return {
            errors: [],
            username: null,
            bio: null,
            email: null,
            password: null,
            PASSWORD_REGEX: /^(?=.*\d).{4,8}$/

          }
        },
         methods:{
        submitForm(){
           axios
          // .post('http://localhost:8080/api/users/register/',this.form)
          .then(reponse => this.users = reponse.data)
          .catch(error => console.log(error()))
          .catch()
        },
        checkForm: function (e) {
              this.errors = [];
               if (!this.password) {
                  this.errors.push('Password required.');
                } else if (!this.validPassword(this.password)) {
                  this.errors.push('Password: entre  4 et 12 caractères(au moins un chiffre');
                }
              
               if(!this.username || this.username.length >= 13 || this.username.length <= 3) {
                this.errors.push('Pseudo: entre  4 et 12 caractères');
              }

                  if (!this.email) {
                  this.errors.push('Email required.');
                } else if (!this.validEmail(this.email)) {
                  this.errors.push('Votre email est invalide.');
                }

                if (!this.errors.length) {
                  return true;
                }
                e.preventDefault();
              },
              validEmail: function (email) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);

              },
                validPassword: function (password) {
                var re = /^(?=.*\d).{4,8}$/;
                return re.test(password);
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
.group__header{
  font-size:1.2rem;
  align-items: center;
  background-color:rgba(10, 10, 10, 0.288);
  padding:1rem;
  border-radius:2rem;
  color:white;
  }
  .group__header__body{
        padding: 1rem;
        background-color:rgba(14, 14, 15, 0.205);
        border-radius:2rem;
        margin-top:1rem;
        margin-bottom:1rem;
        }
</style>