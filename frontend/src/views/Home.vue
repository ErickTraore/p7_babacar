<template>
    <div class="group">
        <div v-if= logged >
            <div class="connecte">
            <h3> <i class="fa fa-info-circle"> Vous n'êtes pas connecté</i></h3> 
            </div>
            <ConexionComponent />
        </div>
        <div v-else>
                <div>
                <MessagesListComponent />
                </div>
                <div>
                  <MessageCreateComponent />
                </div>
            </div>
    </div>
</template>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/1.0.16/vue.js"></script>
<script>
  import Vue from 'vue'
  import VueAxios from 'vue-axios'
  import ConexionComponent from '@/components/ConexionComponent.vue'
  import MessagesListComponent from '@/components/MessagesListComponent.vue'
  import MessageCreateComponent from '@/components/MessageCreateComponent.vue'
  import { mapState } from 'vuex'
  export default {
    name: 'Home',
    computed: {
      ...mapState(['logged']),
    },
     components: {
      ConexionComponent,
      MessagesListComponent,
      MessageCreateComponent,
    },
}
</script>
