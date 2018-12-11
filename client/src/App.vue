<template>
  <div id="app">
    <top-nav activeIndex="0"></top-nav>
    <router-view/>
  </div>
</template>

<script>
  import 'element-ui/lib/theme-chalk/index.css';
  import topNav from './components/navigator/index';
  import '@/assets/styles/reset.css';

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
  }
</style>
