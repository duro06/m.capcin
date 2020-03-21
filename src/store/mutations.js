export default {
  setAuthenticate(state, payload) {
    state.profile = payload;
  },
  delAuthenticate(state) {
    state.profile = {};
  },
  setRetrieveVerifie(state, msg) {
    state.adminVerified = msg;
  },
  setDestroyverifie(state) {
    state.adminVerified = null;
  },

  setRetrieveToken(state, token) {
    state.token = token;
  },
  setDestroyToken(state) {
    state.token = null;
  },
  setProduct(state, payload) {
    state.products = payload;
  },
  pushProduct(state, payload) {
    state.products.push(payload);
  },
  delProduct(state) {
    state.products = [];
  },
  loading(state) {
    state.loadShow = "payload";
  },
  notLoading(state) {
    state.loadShow = "";
  },
  setSuccessOrder(state, payload) {
    state.successOrder = payload;
  },
  setOrder(state, payload) {
    state.Order.push(payload);
  },
  pushOrderItems(state, payload) {
    state.OrderItems.push(payload);
  },
  setOrderItems(state, payload) {
    state.OrderItems = payload;
  },

  updateOrderItems(state, payload) {
    state.OrderItems.forEach(e => {
      if (e.id === payload.id) {
        e.status.name = payload.status;
      }
    });
  },

  delOrder(state) {
    state.Order = [];
  },
  setOrderFocus(state, payload) {
    state.orderFocus = payload;
  },
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

  delSuccessOrder(state) {
    state.successOrder = [];
  },
  setCart(state, payload) {
    state.cart = payload;
  },
  needUpdate(state, payload) {
    state.orderUpdate = payload;
  }
};
