<template>
  <div id="app">
    <top-bar ref="topBar"></top-bar>
    <router-view />
  </div>
</template>

<script>
import TopBar from './components/topBar.vue';
import Home from "./views/Home";
export default {
  name: "App",
  components: {
    Home,
    TopBar,
  },
  mounted(){
    // console.log(this.$refs.topBar.tag);
  }
};
</script>
<style scoped>
/* @import './assets/css/normalize.css' */

</style>