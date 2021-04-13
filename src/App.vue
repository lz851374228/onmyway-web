<!--
 * @Author: your name
 * @Date: 2021-04-08 17:42:48
 * @LastEditTime: 2021-04-13 10:34:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \onmyway-web\src\App.vue
-->
<template>
  <div id="app">
    <button @click="handleButton">按钮</button>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    handleButton() {
      this.$api.article
        .login({ username: 11 })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
</style>
