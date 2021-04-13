/*
 * @Author: your name
 * @Date: 2021-04-12 15:09:35
 * @LastEditTime: 2021-04-13 10:37:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\api\modules\user.js
 */
import { get, post } from '../request'
const article = {
    login: params => post('/wms/web/login', params),
    obtain: params => get('/wms/web/uth/get_location_tree', params),
}
export default article;
