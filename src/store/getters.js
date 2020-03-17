export default {
  serverUrl(state) {
    return state.server;
  },
  loggedIn(state) {
    return state.token !== null;
  },
  levelAccess(state) {
    return state.profile.role;
  },
  waitingVerified(state) {
    return state.adminVerified !== null;
  },
  myProfile(state) {
    return state.profile;
  },
  loading(state) {
    return state.loadShow !== "";
  }
};
