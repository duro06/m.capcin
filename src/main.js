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
import "vue-loading-overlay/dist/vue-loading.css";
Vue.use(Vuex, axios);
// Vue.use(axios);
// Vue.use(Vuex);
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

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("level");
  if (to.matched.some(record => record.meta.loggedIn)) {
    // jika to ketememu sama meta loggedIn yang true
    //maka jika dia tidak login, kembalikan ke halaman login

    if (store.getters.loggedIn) {
      if (to.matched.some(record => record.meta.role == "Produksi")) {
        if ((store.getters.levelAccess || role) == "Produksi") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Packing")) {
        if ((store.getters.levelAccess || role) == "Packing") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Supplier")) {
        if ((store.getters.levelAccess || role) == "Supplier") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Mitra")) {
        if ((store.getters.levelAccess || role) == "Mitra") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else {
        next();
      }
    } else {
      next({ path: "/login" });
    }
  } else if (to.matched.some(record => record.meta.waitingVerified)) {
    if (store.getters.waitingVerified) {
      next();
    } else {
      switch (store.getters.levelAccess || role) {
        case "Produksi":
          next({ path: "/home/produksi" });
          break;
        case "Packing":
          next({ path: "/home/packing" });
          break;
        case "Mitra":
          next({ path: "/home/mitra" });
          break;
        case "Supplier":
          next({ path: "/home/supplier" });
          break;

        default:
          next({ path: "/home" });
          break;
      }
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      switch (store.getters.levelAccess || role) {
        case "Produksi":
          next({ path: "/home/produksi" });
          break;
        case "Packing":
          next({ path: "/home/packing" });
          break;
        case "Mitra":
          next({ path: "/home/mitra" });
          break;
        case "Supplier":
          next({ path: "/home/supplier" });
          break;

        default:
          next({ path: "/home" });
          break;
      }
    } else if (store.getters.waitingVerified) {
      next({ path: "/waiting" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.verified)) {
    if (store.getters.waitingVerified) {
      next({ path: "/waiting" });
    } else {
      next();
    }
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
