<template>
  <div>
    <iframe :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import EventBus from './EventBus';
export default {
  name: 'App',
  created(){
    EventBus.on('changePath', (path) => {
      this.url = path
      console.log(path)
    })
  },
  data(){
    return {
      url: ''
    }
  }
}
</script>

<style scoped>
iframe{
  width: 70vw;
  height: 85vh;
}
</style>
