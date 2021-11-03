<template>
  <div class="Logout">
      <p>Merci de votre visite
            <button v-on:click="logoutClick" >  Se Déconnecter </button> </p> <br> 
       <p> Continuer votre visite  
            <button v-on:click="continuerClick" >  Retour page d'accueille  </button> </p>
         <!-- <a href="/Singnup#/signup">page d'acceuil/a> -->


  </div>
</template>

<script>
// @ is an alias to /src

export default {
   methods: {
      logoutClick: function () {
    
         window.localStorage.clear()
        //  <a href = "/login"> page d'acceuil </a> 

        },
      continuerClick: function () {
    
        //  this.
          this.$router.push('/') 

        }
}
}

</script>