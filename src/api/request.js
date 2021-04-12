/*
 * @Author: your name
 * @Date: 2021-04-09 15:28:11
 * @LastEditTime: 2021-04-12 18:00:24
 * @LastEditors: Please set LastEditors
 * @Description: 请求方法封装
 * @FilePath: \onmyway-web\src\api\request.js
 */
import axios from "./http.js"

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, { params: params }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/** 
* post方法，对应post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err.data);
            })
    });
}

export default axios