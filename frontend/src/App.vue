<template>
  <div id="app">
    <div id="nav">
    <div>
    <img alt="Vue logo" src="./assets/logo.png"> 
    </div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> | 
      <!-- <router-link to="/signup">Inscription</router-link> |  -->
      <router-link to="/profile">Profile</router-link> |  
      <!-- <router-link to="/postView">LoginNew</router-link> |    -->
      <!-- <router-link to="/updateUserProfile">maj-profile</router-link> |    -->
      <router-link to="/logout">Logout</router-link> | 
    </div>
    </div>
    <router-view/>
  </div>
</template>




