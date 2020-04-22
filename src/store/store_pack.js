import { http } from "../services/http_service";
import store from ".";

const state = () => ({
  packingOrders: [],
  orderId: null
});
///////////////////////////////////////////////
const mutations = {
  setPackingOrders(state, payload) {
    state.packingOrders = payload;
  },
  delPackingOrders(state) {
    state.packingOrders = [];
  },
  setOrderId(state, payload) {
    state.orderId = payload;
  },
  delOrderId(state) {
    state.orderId = null;
  }
};
//////////////////////////////////////////////
const actions = {
  getPackingOrder({ commit }) {
    commit("delPackingOrders");
    let id = store.state.profile.id;
    let ID;
    if (id) {
      ID = id;
    } else {
      ID = localStorage.getItem("mie");
    }

    // let params = {
    //   params: {
    //     q: ID
    //   }
    // };
    // console.log(params);
    return new Promise((resolve, reject) => {
      http()
        .get(`admin/packing-by-id-user/${ID}`)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            let getOrders = res.data.data;
            commit("setPackingOrders", getOrders);
            resolve(res.data);
          }
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }
};
////////////////////////////////////////
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
