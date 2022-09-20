<template>
    <div>
      <h3>Modification</h3>
      <p>My message number</p>
      <p>  {{ id }} </p> 
      <div>
        <input 
          id="title"
          v-model="posts.title"
          type="text"
          name="title"
        >
        <br><br>
        <input 
          id="content"
          v-model="posts.content"
          type="text"
          name="content"
        >
        <br><br>

      </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  import Vue from 'vue'
  import HTTP from 'http'
  import axios from 'axios';
  import VueAxios from 'vue-axios'

   Vue.use(VueAxios, axios);

  const http = require("http");
  var req = require('request');

    export default {
        name: 'GetMessage' ,
        props: ['id'],
        data() {
      return {
              Id: this.id,
              errors: [],
              message: {
                title: '',
                content: '',
                attachment: '',
              },
              posts: {
                title: '',
                content: '',
                attachment: '',
              },
    }
  },
  created: function  () {
    console.log('Je teste');
    console.log(this.id);
    console.log('fin des testes');

        this.axios.get('http://localhost:3000/api/messages/' + this.id + '/getMessage')
        .then(response => {
          this.posts = response.data
          // this.posts.title = response.data.title
          // this.posts.content = response.data.content
          // this.attachment = response.data.attachment
          console.log(this.posts)
          console.log(this.posts.title)
        
        })
        .catch(function(err) {
                err.statusCode = 401;
              });  }
}
</script>