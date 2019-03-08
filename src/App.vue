<template>
  <div id="app">
    <my-navbar></my-navbar>
    <div style="background-color: cornflowerblue; background-size: cover">
      <router-view />
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'

  export default {
    name: 'App',
    components: {
      'my-navbar': Navbar,
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>