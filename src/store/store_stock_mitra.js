import { http } from "../services/http_service";

const state = () => ({ items: [], bubuks: [], newUser: "" });
/////////////////////////////////////////////////////////
const mutations = {
  setItems(state, payload) {
    state.items = payload;
  },
  setBubuks(state, payload) {
    state.bubuks = payload;
  },
  setUser(state, payload) {
    state.newUser = payload;
  }
};
////////////////////////////////////////////////////////
const actions = {
  // eslint-disable-next-line no-empty-pattern
  // eslint-disable-next-line no-unused-vars
  isiStockAwal({ commit }, payload) {
    console.log("data 2", payload);
    // commit('setInput',1)
    return new Promise(resolve => {
      let data = { stok_awal: payload.data };
      http()
        .put(`admin/mitra-update-stok/${payload.id}`, data)
        .then(res => {
          // let dataReturn = res.data.data;
          console.log("return", res);
          // commit("setItems", dataReturn);
          resolve(res);
        });
    });
  },
  remove({ commit }, payload) {
    commit("setUser", payload);
  },
  getItemById({ commit }, payload) {
    // console.log("getItem", `${payload}`);
    return new Promise(resolve => {
      http()
        .get(`admin/mitra-items/${payload}`)
        .then(res => {
          let dataReturn = res.data.data;
          commit("setItems", dataReturn);
          resolve(dataReturn);
        });
    });
  },
  getAllBubuk({ commit }) {
    return new Promise(resolve => {
      http()
        .get(`/admin/mitra-bubuk-all`)
        .then(res => {
          let dataReturn = res.data.data;
          commit("setBubuks", dataReturn);
          resolve(dataReturn);
        });
    });
  },
  // eslint-disable-next-line no-unused-vars
  laporanHarian({ commit }, payload) {
    return new Promise(resolve => {
      http()
        .post(`/admin/mitra-input-penjualan`, payload)
        .then(res => {
          let dataReturn = res.data.data;
          // commit("setBubuks", dataReturn);
          resolve(dataReturn);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
