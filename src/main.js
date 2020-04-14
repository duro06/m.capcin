import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Vuex from "vuex";
import axios from "axios";
// import vueNumeral from "vue-numeral-filter";
import FlashMessage from "@smartweb/vue-flash-message";
import VueCarousel from "vue-carousel";
import infiniteScroll from "vue-infinite-scroll";

import "bulma-badge/dist/css/bulma-badge.min.css";
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Vuex, axios);
// Vue.use(vueNumeral, { locale: "en-gb" });
Vue.use(FlashMessage);
Vue.use(VueCarousel);
Vue.use(infiniteScroll);
import { writeNotif } from "./services/notif_service";

window.addEventListener("beforeunload", function() {
  if (store.getters.loggedIn) {
    writeNotif();
    localStorage.setItem("level", store.getters.levelAccess);
    localStorage.setItem("mie", store.state.profile.id);
  }
});
//for Mobile

// eslint-disable-next-line no-undef
$(window).bind("beforeunload", function() {
  if (store.getters.loggedIn) {
    writeNotif();
    localStorage.setItem("level", store.getters.levelAccess);
    localStorage.setItem("mie", store.state.profile.id);
  }
});
// eslint-disable-next-line no-undef
$(window).bind("online", function() {
  alert("online");
});
// eslint-disable-next-line no-undef
$(window).bind("offline", function() {
  alert("offline");
});
// eslint-disable-next-line no-undef
$(window).bind("load", function() {
  if (
    localStorage.getItem("level") == "Mitra" &&
    localStorage.getItem("access_token")
  ) {
    store.dispatch("order/ambilOrder");
    // alert("OK");
    console.log("load");
  }
});
Vue.config.productionTip = false;

new Vue({
  // capcin,
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
