export default {
  serverUrl(state) {
    return state.server;
  },
  loggedIn(state) {
    return state.token !== null;
  },
  levelAccess(state) {
    console.log("Returning Role access");
    return state.profile.role;
  },
  waitingVerified(state) {
    return state.adminVerified !== null;
  },
  myProfile(state) {
    console.log("Returning profile state");
    return state.profile;
  }
};
