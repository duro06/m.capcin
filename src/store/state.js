// import store from ".."
export default {
  server: "http://192.168.1.102:8000",
  // server: "http://localhost:8000",
  // serverApi: "http://localhost:8000/api/",
  // serverApi2: "http://localhost:8000/api",
  // serverImage: "http://localhost:8000/storage/",
  token: localStorage.getItem("access_token") || null,
  adminVerified: localStorage.getItem("waiting_verivication") || null,
  profile: {},
  products: [],
  productDetails: [],
  loadShow: "",
  notification: [],
  cart: 0,
  mitraProductMeta: {},
  coba: "Coba cak"
};
