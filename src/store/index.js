import Vue from "vue";
import Vuex from "vuex";

import state from "./state.js";
import mutations from "./mutations.js";
import actions from "./action.js";
import getters from "./getters.js";
import order from "./store_order.js";
import pack from "./store_pack.js";
import bubuk from "./store_bubuk.js";
import stockMitra from "./store_stock_mitra.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: { order, bubuk, stockMitra, pack }
});
