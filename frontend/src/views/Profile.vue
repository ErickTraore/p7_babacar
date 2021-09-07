<template>
  <div class='group'>
      <div class='group__header'> 
          <div id="app">
      <div class='group__header__body'>
          <h2> Mon profile.</h2>
          <div> Pseudo: {{ profile.username }} </div>
          <div> mail: {{ profile.email }} </div>
          <div> Biographie: {{ profile.bio }} </div>
      </div>
      </div>
    </div>
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