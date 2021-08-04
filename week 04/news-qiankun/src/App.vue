<template>
  <div id="app">
    <h1>新闻浏览</h1>
    <main>
      <div id="title"></div>
      <div id="context"></div>
    </main>
  </div>
</template>

<script>
import { registerMicroApps, start, initGlobalState } from 'qiankun';

export default {
  name: 'App',
  mounted(){
    registerMicroApps([
      {
        name: 'titleContainer',
        entry: '//localhost:8081',
        container: '#title',
        activeRule: '/#/title',
      },
      {
        name: 'contextContainer',
        entry: '//localhost:8082',
        container: '#context',
        activeRule: ['/#/title', '/#/title/:contextId'],
      },
    ]);
    let state = {
      path: ''
    }
    initGlobalState(state);
    start({ singular: false });
  }, 
}
</script>

<style scoped>
*{
  margin: unset;
  padding: unset;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h1{
  text-align: left;
  line-height: 10vh;
  height: 10vh;
}
main{
  display: flex;
  height: 87vh;
  overflow: hidden;
}
#title{
  display: inline-block;
  width: 33%;
}
#context{
   display: inline-block;
}
</style>
