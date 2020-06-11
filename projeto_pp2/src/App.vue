<template>
  <div id="app">
    <navbar>
      <home></home>
    </navbar>
  </div>
</template>

<script>
  import Home from "./components/home/Home";
  import Navbar from "./components/shared/nav/Nav";

  export default {
    components: {
      home: Home,
      navbar: Navbar
    }
  };
</script>

<style lang="scss">
  @import "./styles/main.scss";
</style>
