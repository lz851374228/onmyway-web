/*
 * @Author: your name
 * @Date: 2021-04-08 17:42:48
 * @LastEditTime: 2021-04-12 17:42:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from './api' // 导入api接口

Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
