import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import Vuex from "vuex";
import axios from "axios";
import vWow from "v-wow";
import FlashMessage from "@smartweb/vue-flash-message";
import VueCarousel from "vue-carousel";
import infiniteScroll from "vue-infinite-scroll";

import "bulma-badge/dist/css/bulma-badge.min.css";

Vue.use(Vuex, axios);
// Vue.use(axios);
Vue.use(vWow);
Vue.use(FlashMessage);
Vue.use(VueCarousel);
Vue.use(infiniteScroll);
// Vue.use(BulmaCarousel)

// const _urlOriginApi = "http://192.168.43.231/capcin/";
// const _LurlApi = "http://localhost:8000/api/";
// const _LurlApi = "http://localhost/capcin/";
// const _LurlApi = "http://192.168.1.100/capcin/";
// const _LurlApi = "http://localhost/capcin-copy/";
// const _newUrlApp = _LurlApi + "app";
// const _newUrlUser = _LurlApi + "user/login";
// const _newUrlApiLogin = _LurlApi + "apilogin";

// axios.defaults.baseURL = _LurlApi;

window.addEventListener("beforeunload", function() {
  if (store.getters.loggedIn) {
    localStorage.setItem("level", store.getters.levelAccess);
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
