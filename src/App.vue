<template>
  <div id="app">
    <FlashMessage
      position="right top"
      style="z-index: 19999 !important; position: fixed;"
    ></FlashMessage>
    <!-- <Loading /> -->
    <div class="vld-parent" ref="formContainer"></div>
    <!-- <button @click="submit">Login</button> -->
    <transition class="slideInLeft" v-wow data-wow-duration="1s">
      <router-view />
    </transition>
    <Footer class="navbar" v-if="loggedIn" />
  </div>
</template>
<script>
import * as auth from "./services/auth_service";
import store from "./store";
import Footer from "./components/element/bulmaFooter";
import Loading from "vue-loading-overlay";
import Vue from "vue";
Vue.use(
  Loading,
  { color: "#42b549", opacity: 0.9, useSlot: true }
  // {
  // before: this.$createElement("h1", "Loading ...")
  // after: this.$createElement(capcin)
  // }
);

// import capcin from "./components/element/Capcin.vue";
// import loading from "vue-loading-overlay";

// import Loading from "./components/element/Loading";

// import router from "./router";
export default {
  name: "app",
  components: {
    Footer
    // capcin,
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
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  }
  // methods: {
  //   submit() {
  //     let loader = this.$loading.show();
  //     // simulate AJAX
  //     setTimeout(() => {
  //       loader.hide();
  //     }, 5000);
  //   }
  // }
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
