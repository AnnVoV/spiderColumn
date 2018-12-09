// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import axios from 'axios';
import App from './App'
import router from './router'

// axios 拦截配置
axios.interceptors.response.use((response) => {
  const { data } = response;
  return data.data || {};
}, (err) => {
  return Promise.reject(err);
})

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
