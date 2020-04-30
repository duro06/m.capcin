// import { writeNotif } from "../services/notif_service";
export default {
  //=========  profile ====
  setAuthenticate(state, payload) {
    state.profile = payload;
  },
  delAuthenticate(state) {
    state.profile = {};
  },
  //===========register verivication===========
  setRetrieveVerifie(state, msg) {
    state.adminVerified = msg;
  },
  setDestroyverifie(state) {
    state.adminVerified = null;
  },
  setReg(state, payload) {
    state.registrasi.push(payload);
  },
  delReg(state) {
    state.registrasi = [];
  },

  //================= token ======
  setRetrieveToken(state, token) {
    state.token = token;
  },
  setDestroyToken(state) {
    state.token = null;
  },
  //======== mitra product ========
  setProduct(state, payload) {
    state.products = payload;
  },
  pushProduct(state, payload) {
    state.products.push(payload);
  },
  delProduct(state) {
    state.products = [];
  },
  //===========detail product ======
  setDetailsProduct(state, payload) {
    state.productDetails = payload;
  },
  delDetailsProduct(state) {
    state.productDetails = [];
  },
  // =========== loading ==============
  loading(state) {
    state.loadShow = "payload";
  },
  notLoading(state) {
    state.loadShow = "";
  },
  //======= mitra product meta ==
  setMitraProductMeta(state, payload) {
    state.mitraProductMeta = payload;
  },
  // ====mitra notification =============
  delNotification(state) {
    state.notification = [];
  },
  setNotification(state, payload) {
    if (!payload.read) {
      state.notification.unshift(payload);
      // state.notification.push(payload);
    }
    // writeNotif();
  },
  allNotifIsRead(state) {
    state.notification.forEach(e => {
      e.data.read = true;
    });
  },
  notifIsRead(state, payload) {
    state.notification.filter(e => {
      if (e.id == payload) {
        e.data.read = true;
      }
    });
    // const temp = state.notification.filter(
    //   e => e.id === payload && e.data.read == false
    // );
    // console.log("temp", temp);
    // if (temp.length) {
    //   temp[0].data.read = true;
    //   console.log("notif", temp);
    //   if (temp.length > 1) {
    //     state.notification.forEach(e => {
    //       if (e.id == temp[0].id) {
    //         e.data.read = temp[0].data.read;
    //       }
    //     });
    //   } else {
    //     state.notification.data.read = temp[0].data.read;
    //   }
    // }
  },
  //=====mitra cart========
  setCart(state, payload) {
    state.cart = payload;
  }
};
