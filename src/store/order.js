import { subscribe } from "../services/pusher_service";
import * as ord from "@/services/order_service";
import { http } from "@/services/http_service";
import store from ".";

const state = () => ({
  successOrder: {},
  Order: [],
  Items: [],
  Focus: {},
  Update: null,
  meta: {}
});
const mutations = {
  //=========== mitra success order message =====
  setSuccessOrder(state, payload) {
    state.successOrder = payload;
  },
  delSuccessOrder(state) {
    state.successOrder = [];
  },
  //============= mitra order to subscribe ====
  setOrder(state, payload) {
    state.Order.push(payload);
  },
  delOrder(state) {
    state.Order = [];
  },
  //===========mitra order items ====
  pushOrderItems(state, payload) {
    state.Items.push(payload);
  },
  setOrderItems(state, payload) {
    state.Items = payload;
  },
  delOrderItems(state) {
    state.Items = [];
  },

  updateOrderItems(state, payload) {
    state.Items.forEach(e => {
      if (e.id === payload.id) {
        e.status.name = payload.status;
      }
    });
  },
  //=========== order focus from notifcation mitra ====
  setOrderFocus(state, payload) {
    state.Focus = payload;
  },
  //======= mitra order meta ==
  setMitraOrderMeta(state, payload) {
    state.meta = payload;
  },

  //====not yet used ===
  needUpdate(state, payload) {
    state.orderUpdate = payload;
  }
};
const actions = {
  setMeta({ commit }, payload) {
    commit("setMitraOrderMeta", payload);
  },
  getDataOrder({ commit }, payload) {
    commit("delOrderItems");
    // let params={params:q:}
    return new Promise((resolve, reject) => {
      console.log("payload", payload);
      http()
        .get(`user/orders-user`, payload)
        .then(res => {
          commit("setOrderItems", res.data.data.data);
          let par = res.data.data;
          let more;
          if (par.current_page < par.last_page) {
            more = true;
          } else {
            more = false;
          }
          let meta = {
            current: par.current_page,
            last: par.last_page,
            more: more
          };
          console.log("meta bawah", meta);
          commit("setMitraOrderMeta", meta);
          // this.store.commit("notLoading");
          resolve(res);
        })
        .catch(err => {
          // if (err) {
          //   // this.store.commit("notLoading");
          // }
          reject(err);
        });
    });
  },
  getOrderData: async function({ commit }, payload) {
    try {
      const res = await ord.getOrder(payload);
      console.log("payload", payload);
      commit("setOrderItems", res.data.data.data);
      let par = res.data.data;
      let more;
      if (par.current_page < par.last_page) {
        more = true;
      } else {
        more = false;
      }
      let meta = {
        current: par.current_page,
        last: par.last_page,
        more: more
      };
      console.log("meta bawah", meta);
      commit("setMitraOrderMeta", meta);
      this.store.commit("notLoading");
    } catch (e) {
      store.commit("notLoading");
    }
  },
  ambilOrder: async function() {
    store.commit("loading");
    store.commit("order/delOrder");
    let items;
    let id = store.state.profile.id;
    let ID;
    if (id) {
      ID = id;
    } else {
      ID = localStorage.getItem("mie");
    }

    let params = {
      params: {
        q: ID
      }
    };

    try {
      // const res = await ord.getOrder(params);
      const res = await ord.getToNotif(params);
      items = res.data.data;
      store.commit("notLoading");
      console.log("Items", items);
      // console.log("res", res);
      items.forEach(e => {
        store.commit("order/setOrder", e.id);
        subscribe(e.id);
      });
    } catch (e) {
      store.commit("notLoading");
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
