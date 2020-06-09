import Home from "./components/home/Home.vue";
import Maps from "./components/map/Map.vue";

export const routes = [
  {
    path: "/",
    component: Home,
    title: "Home"
  },
  {
    path: "/",
    component: Home,
    title: "About us"
  },
  {
    path: "/map",
    component: Maps,
    title: "Map"
  }
];
