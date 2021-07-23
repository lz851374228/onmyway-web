/*
 * @Author: Zheng Li
 * @Date: 2021-04-08 17:42:48
 * @LastEditTime: 2021-07-20 10:18:50
 * @LastEditors: Please set LastEditors
 * @Description: 全局入口文件
 * @FilePath: \onmyway-web\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'//vue-router management
import store from './store'//Vuex management
import './permission' // Routing permission control

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
