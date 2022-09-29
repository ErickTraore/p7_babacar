<template>
  <div class="group">
      <div class="group__header">
        <div id="app">
            <div class="group__header__body">
                <h3>
                    Se déconnecter
                </h3>
                <div class="Logout__header__body__first">
                  
                  <div class="Logout__header__body__first__in">
                      Merci de votre visite:
                          <button @click="logoutClick"> Se Déconnecter </button> 
                    </div> <br> 
                    <div class="Logout__header__body__second">
                      Continuer votre visite:  
                          <button @click="continuerClick" >  Retour page d'accueille  </button> 
                    </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default {
   methods: {
      logoutClick () {
        this.$store.dispatch('beforeLogged')
         window.localStorage.clear()
        //  window.location.reload();

          this.$router.push('/login') 

        },
      continuerClick: function () {
    // 
          this.$router.push('/') 

        }
        
}
}

</script>
<style lang="scss" scoped>
    @import 'sass/main.scss';

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
      background-color: $tertiary;
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
  .Logout__header__body__first__in {
      /* font-family: "Lato"; */
      background-color: rgb(200, 255, 0) !important;
      border-radius: 20px !important;
      padding: 5px;
      }
  .Logout__header__body__second {
      /* font-family: "Lato"; */
      background-color: rgb(255, 247, 0) !important;
      border-radius: 20px !important;
      padding: 5px;
      }
      button{
        border-radius: 5px !important;
      }
 
  
   
</style>