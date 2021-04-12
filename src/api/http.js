/*
 * @Author: your name
 * @Date: 2021-04-09 15:09:49
 * @LastEditTime: 2021-04-12 18:00:03
 * @LastEditors: Please set LastEditors
 * @Description: axios封装
 * @FilePath: \onmyway-web\src\api\http.js
 */
import axios from 'axios'
import store from '../store'
import router from '../router';
import { getToken } from '../utils/user'
import { Notification } from 'element-ui';

// 配置请求地址公共部分
if (process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://localhost'
} else if (process.env.NODE_ENV === 'debug') {
  axios.defaults.baseURL = ''
} else if (process.env.NODE_ENV === 'production') {
  axios.defaults.baseURL = ''
}

// 请求超时时间
axios.defaults.timeout = 5000;
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 此处将token存放在Vuex中，进行查询和保存。
    if (store.getters.token) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  error => {
    // Network Error:网络连接失败。
    // 服务器连接失败，跳转至服务器连接失败显示界面。
    // 在服务器连接成功后返回当前页面
    if (error.message === 'Network Error') {
      Notification({
        title: '提示',
        showClose: true,
        message: '服务器连接失败，请稍后再试！',
        type: 'error'
      });
      router.replace({
        path: '/network_error',
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    }
    // 以下需根据后端接口统一规定哪些错误方式，进行异常错误处理。
    if (error.response.status) {
      switch (error.response.status) {
        //401:未登录，请求要求用户的身份认证
        //未登录则跳转登录页面，并携带当前页面的路径
        //在登录成功后返回当前页面，这一步需要在登录页操作
        case 401:
          Notification({
            title: "提示",
            showClose: true,
            message: '请登录！',
            type: 'error'
          });
          router.replace({
            path: '/login',
            query: {
              redirect: router.currentRoute.fullPath
            }
          });
          break;

        // 403 token过期，服务器理解请求客户端的请求，但是拒绝执行此请求
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          Notification({
            title: "提示",
            showClose: true,
            message: '登录过期，请重新登录',
            type: 'error'
          });
          //清除token

          //跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
          setTimeout(() => {
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
          }, 1000);
          break;

        //404请求不存在，服务器无法根据客户端的请求找到资源
        case 404:
          Notification({
            title: "提示",
            showClose: true,
            message: '网络请求不存在',
            type: 'error'
          });
          break;
        //其他错误，直接抛出错误提示
        default:
          Notification({
            title: "提示",
            showClose: true,
            message: error.response.data.message,
            type: 'error'
          });
      }
    }
    return Promise.reject(error.response);
  }
);
export default axios