export default `<template>
  <div>
    <h1>{{message}}</h1>
    <hr/>
    <section>
      <p>Listening to Events</p>
      <button v-on:click="counter += 1">Add 1</button>
      <p>The button above has been clicked {{ counter }} times.</p>
    </section>
  </div>
</template>
<script>
export default{
  data(){
    return{
      message: 'write something',
      counter: 0,
    }
  }
}
</script>
<style>
  h1{
    color: green;
  }
</style>
`