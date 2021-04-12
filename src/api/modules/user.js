/*
 * @Author: your name
 * @Date: 2021-04-12 15:09:35
 * @LastEditTime: 2021-04-12 17:29:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\api\modules\user.js
 */
import { get, post } from '../request'

// 登录
export const login = params => post('/wms/web/login', params);

// 获取菜单列表
export const obtain = params => get('/wms/web/uth/get_location_tree', params);

// 获取当前管理员信息
export const getUserInfo = params => get('/merchant/info', params);
