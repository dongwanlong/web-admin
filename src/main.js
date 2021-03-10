import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './scss/index.scss'
import axios from 'axios'
import config from './config.js'

axios.defaults.baseURL = config.apiUrl;
axios.interceptors.request.use(function (config) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = userInfo?userInfo.token:"unlogin";
  if (token) {
      config.headers.accessToken = token;
      return config;
  }
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (data) {
  if(data.data.res==2){
    localStorage.clear();
    window.location.reload();
  }else{
    return data;
  }
}, function (error) {
  return Promise.reject(error);
});

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
