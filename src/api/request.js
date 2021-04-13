/*
 * @Author: your name
 * @Date: 2021-04-09 15:28:11
 * @LastEditTime: 2021-04-13 13:46:22
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

/** 
* downloadFile方法，对应post请求 
* @param {String} url [请求的url地址] 
* @param {Object} params [请求时携带的参数] 
*/
export function downloadFile(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                const data = res;
                let r = new FileReader();
                r.onload = function () {
                    try {
                        let resData = JSON.parse(this.result);
                        // 判断文件导出是否出错。
                        // if (resData && resData["code"] && resData["code"] === "1") {
                        //     alert('文件导出失败')
                        // }
                    } catch (err) {
                        let blob = new Blob([data], {
                            type: "'application/actet-stream;charset=utf-8'"
                        });
                        let filename = params.fileName + "." + params.fileType
                        if (window.navigator.msSaveOrOpenBlob) {
                            navigator.msSaveBlob(blob, filename);
                        } else {
                            let link = document.createElement("a");
                            let body = document.querySelector("body");
                            link.href = window.URL.createObjectURL(blob);
                            link.download = filename;
                            link.style.display = "none";
                            body.appendChild(link);
                            link.click();
                            body.removeChild(link);
                            window.URL.revokeObjectURL(link.href);
                        }
                    }
                };
                r.readAsText(data);
                resolve(res);
            }).catch(err => {
                reject(err.data);
            })
    });
}
