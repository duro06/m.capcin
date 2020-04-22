// import * as pusher from "../services/pusher_service";
// import * as echo from "../services/echo_service";
import * as ord from "@/services/order_service";
import { http } from "@/services/http_service";
import store from ".";

const state = () => ({
  successOrder: {},
  Order: [],
  Items: [],
  Focus: {},
  Update: null,
  meta: {},
  localOrder: []
});
const mutations = {
  //================ mitra local order ======
  setLocalOrder(state, payload) {
    state.localOrder = payload;
  },
  delLocalOrder(state) {
    state.localOrder = [];
  },
  //=========== mitra success order message =====
  setSuccessOrder(state, payload) {
    state.successOrder = payload;
  },
  delSuccessOrder(state) {
    state.successOrder = [];
  },
  //============= mitra order to subscribe ====
  setOrder(state, payload) {
    state.Order = payload;
  },
  gantiStatus(state, payload) {
    state.Focus.status_id = payload;
  },
  updateOrder(state, payload) {
    state.Order.forEach(data => {
      if (data.id == payload.id) {
        data.status_id = payload.status_id;
        data.status = payload.status;
      }
    });
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

    // console.log("fokus", payload);
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
  confirmOrder({ state, commit }, payload) {
    // order_id sama status id
    commit("gantiStatus", 6);
    return new Promise(() => {
      http()
        .put(`user/orders/${payload}`, state.Focus)
        .then(res => {
          console.log("update", res);
        })
        .catch(err => {
          console.log(err);
        });
    });
  },
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
      // console.log("meta bawah", meta);
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
      store.commit("order/setOrder", items);
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
