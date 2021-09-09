<template>
    <div class="connection">
        <div class='group'>
            <SignInComponent/>
            <p>OU</p>
            <ConnectionComponent/>
        </div>
    </div>
</template>

<script>
  import SignInComponent from '@/components/SignInComponent.vue'
  import ConnectionComponent from '@/components/ConnectionComponent.vue'

  export default {
    name: 'Connection',
    components: {
      SignInComponent,
      ConnectionComponent
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
</style>