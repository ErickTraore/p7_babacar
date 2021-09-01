<template>
  <div class="postComponent">
      <h1> Soumettre form data à l' API</h1>
    <PostComponent/>
  </div>
</template>

<script>
// @ is an alias to /src
import PostComponent from '@/components/PostComponent.vue'

export default {
  name: 'PostView',
  components: {
    PostComponent
  }
};
</script>