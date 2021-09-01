<template>
<div id="app">
<h2> Mon profile.</h2>
<h3> Pseudo: {{ profile.username }} </h3>
<h3> mail: {{ profile.email }} </h3>
<h3> Biographie: {{ profile.bio }} </h3>
<h3> Mot de pass: Changer de mot de pass </h3>
</div>
</template>

<script>
import axios from 'axios';
export default{
        data() {
          return {
            profile: '',
          }
        },
        created(){
          let objMySession = localStorage.getItem("obj")
          let myStorageToken = JSON.parse(objMySession)
          console.log("profile");
          let token = myStorageToken.myToken;
          console.log(token);
           axios
          .get('http://localhost:8080/api/users/me/', {
  headers: {
    'Authorization': token
  }
})
          // .then(reponse => console.log(reponse.data))
          .then(reponse => this.profile = reponse.data)
          .catch(error => console.log(error()))
        }
  } 

</script>
<style scoped>

table,
td {
    border: 1px solid #333;
}

thead,
tfoot {
    background-color: #333;
    color: #fff;
}
</style>