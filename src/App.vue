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
// import * as pusher from "@/services/pusher_service";
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
  data() {
    return {
      userId: null
      // nilai: 0
    };
  },
  beforeCreate: async function() {
    try {
      //jika login maka
      if (store.getters.loggedIn) {
        // let userId = localStorage.getItem("mie");
        // console.log("User id", userId);

        // eslint-disable-next-line no-undef
        // Echo.private("App.User." + userId).notification(notification => {
        //   console.log(notification.type);
        // });
        // if (localStorage.getItem("level") == "Mitra") {
        //   store.dispatch("order/ambilOrder");
        // }
        const response = await auth.getProfile(); // ambil profile
        store.dispatch("aunthenticate", response.data); // panggil action untuk manuliskan

        readNotif();
        localStorage.removeItem("level"); // hapus temporary local storege level
        localStorage.removeItem("mie"); // hapus temporary local storege level

        //jika tidak
      } else {
        store.dispatch("destroyToken"); //paggil action untuk menghapus authentifikasi
      }
      setTimeout(function() {}, 2000);
    } catch (error) {
      console.log(error);
      //meskipun error tetap data yang ada di hapus
      store.dispatch("destroyToken");
    }
  },
  created() {},
  mounted() {
    // let userId;
    // console.log("user", this.userId);
    // if (this.userId) {
    //   userId = this.userId;
    // }
    if (store.getters.loggedIn || localStorage.getItem("access_teken")) {
      // console.log("Laravel Echo", userId);
      console.log("Log in ");

      let userId = auth.getUserId();
      // eslint-disable-next-line no-undef
      Echo.private("App.User." + userId).notification(data => {
        if (store.state.profile.role == "Mitra") {
          // store.commit("setNotification", data);
          store.commit("order/setOrderFocus", data);
        } else if (store.state.profile.role == "Packing") {
          // store.commit("setNotification", data);
          store.dispatch("pack/getPackingOrder");
        } else if (store.state.profile.role == "Supplier") {
          // store.commit("setNotification", data);
          store.dispatch("shipping/getShipping");
        }
        console.log(data.type);
        console.log("data ", data);
        store.dispatch("notifications/getNotifications");
      });
      store.dispatch("notifications/getNotifications");
    } else {
      console.log("Log out ");
      store.dispatch("destroyToken"); //paggil action untuk menghapus authentifikasi
      localStorage.removeItem("level"); // hapus temporary local storege level
      localStorage.removeItem("mie"); // hapus temporary local storege level
      localStorage.removeItem("notif");
    }
    // coba register
    // pusher.register(26);

    //   Echo.private(`capcin-tracker.${this.data.id}`).listen(
    //     "App\\Events\\OrderStatusChanged",
    //     e => {
    //       console.log(e);
    //     }
    //   );
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
      let ID;
      if (id) {
        ID = id;
      } else {
        ID = localStorage.getItem("mie");
      }

      let params = {
        params: {
          q: ID
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
.syarat {
  margin: 10px;
  background-color: whitesmoke;
  .progress {
    margin-bottom: 2px;
    height: 6px;
  }
}
.ngisi {
  padding: 5px 20px 60px 20px;
}
.kepala {
  background-color: rgba(229, 226, 226, 0.747);
  border-radius: 1px;
  padding-left: 10px;
}
.batas-kotak {
  box-shadow: 0 0 0 1px lightgray;
}
.isinya-kartu {
  background-color: whitesmoke;
  border-radius: 1px;
  box-shadow: 0 0 0 1px lightgray;
}
.kaki-kartu {
  background-color: rgba(224, 223, 223, 0.733);
  border-radius: 1px;
  height: 20px;
  align-self: center;
}
.custom_bottom_nav {
  padding: 2px 5px;
}
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
.hijau {
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
