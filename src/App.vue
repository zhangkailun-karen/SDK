<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <firstdemo></firstdemo> -->
    <router-view/>
  </div>
</template>

<script>
// import firstdemo from './components/ball.vue'

export default {
  name: 'App'
  // components: {
  //   firstdemo
  // }
}
</script>

<style>
html{
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;

}
body{
  background: #999;
}
</style>
