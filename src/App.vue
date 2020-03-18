<template>
  <div id="app">
    <FlashMessage
      position="right top"
      style="z-index: 19999 !important; position: fixed;"
    ></FlashMessage>
    <LoadingCapcin />
    <Nav class="navbar" v-if="loggedIn" />
    <transition name="slide-fade" v-wow data-wow-duration="1s">
      <router-view />
    </transition>
    <Footer class="navbar" v-if="loggedIn" />
  </div>
</template>
<script>
import * as auth from "@/services/auth_service";
import * as cart from "@/services/cart_service";
import store from "@/store";
import { readNotif } from "@/services/notif_service";
import Footer from "@/components/element/bulmaFooter";
import Nav from "@/components/element/bulmaNav";
import LoadingCapcin from "@/components/element/Loading.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    Footer,
    Nav,
    LoadingCapcin
    // loading
  },
  beforeCreate: async function() {
    try {
      //jika login maka
      if (store.getters.loggedIn) {
        const response = await auth.getProfile(); // ambil profile
        store.dispatch("aunthenticate", response.data); // panggil action untuk manuliskan

        store.dispatch("ambilOrder");
        readNotif();
        localStorage.removeItem("level"); // hapus temporary local storege level
        localStorage.removeItem("mie"); // hapus temporary local storege level

        //jika tidak
      } else {
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
      } catch (e) {
        store.commit("notLoading");
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
// Animmasi transition

@-webkit-keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInLeft {
  from {
    -webkit-transform: translate3d(-100%, 0, 0);
    transform: translate3d(-100%, 0, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInLeft {
  -webkit-animation-name: slideInLeft;
  animation-name: slideInLeft;
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
