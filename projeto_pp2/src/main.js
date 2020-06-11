import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import StarRating from 'vue-star-rating';

import * as Vue2Leaflet from "vue2-leaflet";
import 'leaflet/dist/leaflet.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// FontAwesome
library.add(faCheckCircle);
library.add(faUsers);
library.add(faTimes);
library.add(faGithub);
library.add(faChevronLeft);
library.add(faWikipediaW);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

// Leaflet
Vue.component('l-map', Vue2Leaflet.LMap);
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer);
Vue.component('l-marker', Vue2Leaflet.LMarker);

// StarRating
Vue.component('star-rating', StarRating);

// Router and routes
import { routes } from "./routes";

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes
});

new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
