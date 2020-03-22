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
  // =========== loading ==============
  loading(state) {
    state.loadShow = "payload";
  },
  notLoading(state) {
    state.loadShow = "";
  },
  //=========== mitra success order message =====
  setSuccessOrder(state, payload) {
    state.successOrder = payload;
  },
  delSuccessOrder(state) {
    state.successOrder = [];
  },
  //============= mitra order to subscribe ====
  setOrder(state, payload) {
    state.Order.push(payload);
  },
  delOrder(state) {
    state.Order = [];
  },
  //===========mitra order items ====
  pushOrderItems(state, payload) {
    state.OrderItems.push(payload);
  },
  setOrderItems(state, payload) {
    state.OrderItems = payload;
  },
  delOrderItems(state) {
    state.Order = [];
  },

  updateOrderItems(state, payload) {
    state.OrderItems.forEach(e => {
      if (e.id === payload.id) {
        e.status.name = payload.status;
      }
    });
  },
  //=========== order focus from notifcation mitra ====
  setOrderFocus(state, payload) {
    state.orderFocus = payload;
  },
  // ====mitra notification =============
  setNotification(state, payload) {
    if (!payload.read) {
      state.notification.push(payload);
    }
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
  },
  //======= mitra order meta ==
  setMitraOrderMeta(state, payload) {
    state.mitraOrderMeta = payload;
  },

  //======= mitra product meta ==
  setMitraProductMeta(state, payload) {
    state.mitraProductMeta = payload;
  },

  //====not yet used ===
  needUpdate(state, payload) {
    state.orderUpdate = payload;
  }
};
