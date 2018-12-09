<template>
  <div id="app">
    <top-nav activeIndex="0"></top-nav>
    <router-view/>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  import topNav from './components/navigator/index';

  export default {
    name: 'App',
    components: {
      topNav,
    }
  };
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
