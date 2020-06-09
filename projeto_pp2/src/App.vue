<template>
  <!-- <div id="app">
    <nav>
      <ul>
        <li v-for="route in routes">
          <router-link :to="route.path ? route.path : '/'">
            {{ route.title }}
          </router-link>
        </li>
      </ul>
    </nav>
    <router-view></router-view>
  </div>-->
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

// var gitLink = new Vue({
//   el: "#gitLink",
//   data: {
//     name: "gitLink-el"
//   },
//   methods: {
//     send: function(event) {
//       alert("sent");
//     }
//   }
// });
</script>

<style lang="scss">
@import "./styles/main.scss";
</style>
