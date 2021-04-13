<!--
 * @Author: your name
 * @Date: 2021-04-08 17:42:48
 * @LastEditTime: 2021-04-13 17:29:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\App.vue
-->
<template>
  <div id="app"></div>
</template>

<script>
import { setToken } from '@/utils/auth' // get token from cookie
export default {
  name: "App",
  mounted(){
    setToken('11111111111111')
  },
  methods: {},
};
</script>

<style>
</style>
