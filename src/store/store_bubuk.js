import { http } from "../services/http_service";
const state = () => ({
  bubuks: [],
  meta: [],

  item: {
    nama: ""
  },

  page: 1, //UNTUK MENCATAT PAGE PAGINATE YANG SEDANG DIAKSES
  sortBy: "created_at", //default sorting
  sortByDesc: true,
  per_page: 10 //UNTUK MENCATAT PER PAGE NYA
});
/////////////////////////////////////////////////////////
const mutations = {
  setBubuks(state, payload) {
    state.bubuks = payload;
  },
  delBubuks(state) {
    state.bubuks = [];
  },
  ASSIGN_DATA(state, payload) {
    (state.bubuks = payload), (state.meta = payload);
  }
};
////////////////////////////////////////////////////////
const actions = {
  getBubuks: async function({ commit, state }, payload) {
    let search = typeof payload != "undefined" ? payload : "";
    let sorting = state.sortByDesc ? "DESC" : "ASC";
    let params = {
      params: {
        page: state.page,
        per_page: state.per_page,
        q: search,
        sortby: state.sortBy,
        sortbydesc: sorting
      }
    };

    try {
      await http()
        .get(`/mitra/bubuk-all`, params)
        .then(response => {
          let getData = response.data.data;
          commit("ASSIGN_DATA", getData);
        });
    } catch (error) {
      console.log(error);
    }
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations
};
