// import store from ".."
export default {
  server: "http://localhost:8000/home",
  serverApi: "http://localhost:8000/api/",
  serverApi2: "http://localhost:8000/api",
  serverImage: "http://localhost:8000/storage/",
  token: localStorage.getItem("access_token") || null,
  adminVerified: localStorage.getItem("waiting_verivication") || null,
  profile: {},
  products: [],
  loadShow: "",
  successOrder: {}
};
