/*
 * @Author: zheng li
 * @Date: 2021-04-13 16:31:18
 * @LastEditTime: 2021-04-13 17:26:29
 * @LastEditors: Please set LastEditors
 * @Description: 用于获取、设置、移除token值的方法工具
 * @FilePath: \onmyway-web\src\utils\auth.js
 */

import Cookies from 'js-cookie'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
