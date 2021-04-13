/*
 * @Author: your name
 * @Date: 2021-04-12 15:44:23
 * @LastEditTime: 2021-04-13 16:41:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\router\index.js
 */
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export const constantRoutes = [
    {
        path: '/home',
        component: ()=>import('@/pages/home/home.vue'),
        hidden: true,
    },
]

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})
const router = createRouter()
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}
export default router
