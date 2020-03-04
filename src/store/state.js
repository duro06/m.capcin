// import store from ".."
export default {
  server: "http://localhost:8000/home",
  token: localStorage.getItem("access_token") || null,
  adminVerified: localStorage.getItem("waiting_verivication") || null,
  profile: {}
};
