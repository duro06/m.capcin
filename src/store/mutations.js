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
  setNotification(state, payload) {
    if (!payload.read) {
      state.notification.push(payload);
    }
    // writeNotif();
  },
  allNotifIsRead(state) {
    state.notification.forEach(e => {
      e.read = true;
    });
  },
  notifIsRead(state, payload) {
    const temp = state.notification.filter(
      e => e.id === payload && e.read == false
    );
    if (temp.length) {
      temp[0].read = true;
      console.log("notif", temp);
      if (temp.length > 1) {
        state.notification.forEach(e => {
          if (e.id == temp[0].id) {
            e.read = temp[0].read;
          }
        });
      } else {
        state.notification.read = temp[0].read;
      }
    }
  },
  //=====mitra cart========
  setCart(state, payload) {
    state.cart = payload;
  }
};
