<template>
  <div id="app">
    <FlashMessage
      position="right top"
      style="z-index: 19999 !important; position: fixed;"
    ></FlashMessage>
    <LoadingCapcin />
    <transition class="slideInLeft" v-wow data-wow-duration="1s">
      <router-view />
    </transition>
    <Footer class="navbar" v-if="loggedIn" />
  </div>
</template>
<script>
import * as auth from "./services/auth_service";
import * as cart from "./services/cart_service";
import store from "./store";

import Footer from "./components/element/bulmaFooter";
import LoadingCapcin from "./components/element/Capcin.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Footer,
    LoadingCapcin
    // loading
  },
  beforeCreate: async function() {
    localStorage.removeItem("level"); // hapus temporary local storege level
    //===================jangan lupa ini nanti dihapus=============
    console.log("App Get Profile");
    //=============================================================
    try {
      //jika login maka
      if (store.getters.loggedIn) {
        //===================jangan lupa ini nanti dihapus=============
        console.log("Login = ", store.getters.loggedIn);
        //=============================================================
        const response = await auth.getProfile(); // ambil profile
        //===================jangan lupa ini nanti dihapus=============
        console.log(response);
        //=============================================================
        store.dispatch("aunthenticate", response.data); // panggil action untuk manuliskan data

        //jika tidak
      } else {
        //===================jangan lupa ini nanti dihapus=============
        console.log("Login = false");
        //=============================================================
        store.dispatch("destroyToken"); //paggil action untuk menghapus authentifikasi
      }
      setTimeout(function() {}, 2000);
    } catch (error) {
      //meskipun error tetap data yang ada di hapus
      store.dispatch("destroyToken");
    }
  },
  created() {
    // this.getCart();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    ...mapState(["profile"])
  },
  methods: {
    getCart: async function() {
      let id = this.profile.id;
      let params = {
        params: {
          q: id
        }
      };
      try {
        const res = await cart.getChart(params);
        let panjang = res.data.data.data.length;
        if (panjang > 0) {
          store.commit("setCart", panjang);
        } else {
          store.commit("setCart", 0);
        }
        console.log("cart :", res);
        console.log("data :", panjang);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss">
.content-body {
  padding: 10px;
  box-shadow: 0 2px 0 0 whitesmoke;
}
.rata-kanan {
  text-align: right;
}
.rata-kiri {
  text-align: left;
}
.rata-tengah {
  text-align: center;
}
.link-color {
  color: #ee1846;
}
.judul-component {
  text-align: left;
  padding: 5px;
  font-size: 14px;
}
.VueCarousel-wrapper {
  border-radius: 10px;
}
// khusus button footer nav
.btn_nav_item a {
  color: #636e72;
}
.btn_nav_item.active a {
  color: #42b549 !important;
}
.btn_nav_item.active p {
  color: hsl(124, 47%, 48%) !important;
}
.warna-tema {
  color: white !important;
  background-color: #42b549 !important;
}
// kelas loading
.vld-icon {
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
// .vld-icon > img {
//   opacity: 0.6;
//   position: relative;
//   /* top: 50%; */
//   /* left: 50%; */
//   /* right: 10%; */
//   width: 100px;
//   height: 100px;
//   margin: 0px 0 0 0px;
//   -webkit-animation: spin 4s linear infinite;
//   -moz-animation: spin 4s linear infinite;
//   animation: spin 4s linear infinite;
// }

// @-moz-keyframes spin {
//   100% {
//     -moz-transform: rotate(360deg);
//   }
// }
// @-webkit-keyframes spin {
//   100% {
//     -webkit-transform: rotate(360deg);
//   }
// }
// @keyframes spin {
//   100% {
//     -webkit-transform: rotate(360deg);
//     transform: rotate(360deg);
//   }
// }
</style>
