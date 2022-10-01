<template>
     <div class="group">
         <div id="app" class="group__header">
        <div class='group__header__body'>
        <div class="container"  v-for="item  in users" :key="item .id">
                <div class="group__header__body__first"> 
                    <div class="group__header__body__first__in"> 
                    <div  _ngcontent-cpa-c6="">
                        Compte crée le:{{ new Date(item .createdAt) | dateFormat('DD/MM/YYYY') }} à
                        {{ new Date(item .createdAt) | dateFormat('hh:mm') }} : <br>
                        dernière maj le:{{ new Date(item .updatedAt) | dateFormat('DD/MM/YYYY') }} à
                        {{ new Date(item .updatedAt) | dateFormat('hh:mm') }} : <br>
                    <div class="group__header__body__first__title"> 
                      <label>Nom: </label><p> {{  item .username }}</p><br>
                    </div>
                    <div class="group__header__body__first__down"> 
                      <label>Prénom: </label><p>{{ item .bio }}</p><br> 
                    </div>
                    <div class="group__header__body__first__down"> 
                      <label>Email: </label><p>{{ item .email }}</p><br> 
                    </div>            
                </div>
                <div class="group__header__body__button"> 
                    <div>
                        <button
                            class="btn-1"
                            @click="showUserUpdate(item .id);"> 
                            Modifier
                        </button>
                    </div>
                    <div>
                        <button
                         class="btn-1"
                          @click="destroyUser(item .id)">
                          <i class="fa fa-trash-o" aria-hidden="true"></i>
                        </button>                
                    </div>
                </div>
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  import Vue from 'vue'
  import axios from 'axios';
  import VueAxios from 'vue-axios'
  import VueFilterDateFormat from '@vuejs-community/vue-filter-date-format';

  Vue.use(VueFilterDateFormat);
  Vue.use(VueAxios, axios)
  export default {
    name: 'Compte',
    data() {
      return {
        id: Number,
        user: '',
        users: [],
      }
    },
  created() {
      axios
        .get('http://localhost:3000/api/users/')
        .then(response => {
          this.users= response.data
          })
        .catch(error => console.log(error()))
    },
     methods: {
      showUserUpdate: function (id) {
        this.$router.push({name : 'GetUser', params : {id :id}});
      },
      destroyUser: function (id) {
        let objMySession = localStorage.getItem("obj")
        let myStorageToken = JSON.parse(objMySession)
        let token = myStorageToken.myToken;
        this.axios.post('http://localhost:3000/api/users/' + id + '/del', null, {
            headers: {
              'Authorization': token
            }
          })
          .then(response => {
          this.user= response.data
            axios
              .get('http://localhost:3000/api/users/')
              .then(response => {
                this.users= response.data
                })
              .catch(error => console.log(error()))
                })
          .catch(error => console.log(error()))
      }
   }
  }
</script>
<style scoped>
.group__header__body__button{
  height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 10px;
 }
 /*  label {
  color: blue;
  font-size: 12px;
 } */

</style>