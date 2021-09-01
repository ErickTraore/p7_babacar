<template>
<div id="app">
   <ul>
      <li v-for= "message in messages" :key= "message.id"> 
    <table>
    <thead>
        <tr>
            <th colspan="2">{{ message.title }}</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>{{ message.content }}</td>
        </tr>
        <tr>   
            <td>with two columns</td>
        </tr>
    </tbody>
</table>
</li> 
     </ul>
</div>
</template>


<script>
import axios from 'axios';
  export default{
        data() {
          return {
            messages:[]
          }
        },
        created(){
           axios
          .get('http://localhost:8080/api/messages/')
          .then(reponse => this.messages = reponse.data)
          .catch(error => console.log(error()))
          .catch()
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