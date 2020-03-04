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
  }
};