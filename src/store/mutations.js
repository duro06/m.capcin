export default {
  setAuthenticate(state, payload) {
    state.profile = payload;
    console.log("Profile written");
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
  delSuccessOrder(state) {
    state.successOrder = {};
  },
  setCart(state, payload) {
    state.cart = payload;
  }
};
