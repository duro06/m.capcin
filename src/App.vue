<template>
  <div id="app">
    <FlashMessage
      position="right top"
      style="z-index: 19999 !important; position: fixed;"
    ></FlashMessage>
    <transition class="slideInLeft" v-wow data-wow-duration="1s">
      <router-view />
    </transition>
  </div>
</template>
<script>
import * as auth from "./services/auth_service";
import store from "./store";
// import router from "./router";
export default {
  name: "app",

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
}
.VueCarousel-wrapper {
  border-radius: 10px;
}
</style>
