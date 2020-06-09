<template>
  <span>
    <nav>
      <ul class="navbar">
        <li>
          <router-link :to="routes[0].path" class="nav-item">{{routes[0].title}}</router-link>
        </li>
        <li>
          <router-link :to="routes[2].path" class="nav-item">{{routes[2].title}}</router-link>
        </li>
        <li>
          <a class="nav-item" href="#">About Us</a>
        </li>
      </ul>
    </nav>
    <router-view>
      <slot></slot>
    </router-view>
  </span>
</template>

<script>
import { routes } from "../../../routes";

export default {
  data() {
    return {
      routes
    };
  }
};
</script>

<style lang="scss">
</style>