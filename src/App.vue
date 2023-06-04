<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <HeaderControl />
    <SideView />
  </div>
</template>

<script>
import HeaderControl from "./components/HeaderControl.vue";
import SideView from "./components/SideView.vue";
export default {
  name: "App",
  components: {
    HeaderControl,
    SideView,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  background: #e5e2db;
  user-select: none;
}
</style>
