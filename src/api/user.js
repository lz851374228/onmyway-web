/*
 * @Author: Zheng Li
 * @Date: 2021-04-12 15:09:35
 * @LastEditTime: 2021-07-20 09:54:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\api\modules\user.js
 */
import axios from './http'

export function login(data) {
  return axios({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return axios({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return axios({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
