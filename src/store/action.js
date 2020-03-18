import { http } from "../services/http_service.js";
import store from ".";
import { setToken } from "../services/auth_service.js";
import * as ord from "@/services/order_service";
import Pusher from "pusher-js";
// Pusher.logToConsole = true;
export default {
  subscribe({ commit }, order) {
    // Api key + cluster

    let pusher = new Pusher("c1b487e073e0124e259f", {
      cluster: "ap1",
      forceTLS: true
    });

    // order.forEach(e => {
    // console.log("order", e);
    // console.log("index", index);
    let channel = pusher.subscribe("capcin-tracker." + order.id);
    console.log("Order nya ini lho", order);
    channel.bind("App\\Events\\OrderStatusChanged", data => {
      commit("setNotification", data);
      console.log("Data ", data);
      if (data != "") {
        console.log("data ada");
        // this.$store.dispatch("destroyVerifie");
        // this.$router.push('/')
      }
    });
    // });
    // console.log(channel);
  },
  ambilLagi: async function(payload) {
    try {
      const res = await ord.getOrder(payload);
      console.log("params ", payload);
      let items = res.data.data.data;
      items.forEach(e => {
        store.commit("setOrder", e);
        store.dispatch("subscribe", e);
      });
      console.log("Ambil lagi ", res);
    } catch (e) {
      store.commit("notLoading");
    }
  },

  ambilOrder: async function() {
    store.commit("loading");
    let items;
    // let curent = 1;
    // let last;
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
      const res = await ord.getOrder(params);
      items = res.data.data.data;
      // curent = res.data.data.current_page;
      // last = res.data.data.last_page;
      // if (last > 1 && curent <= last) {
      //   let rest = last - curent;
      //   for (let index = 0; index < rest; index++) {
      //     let params = {
      //       params: {
      //         q: ID,
      //         page: index + 1
      //       }
      //     };
      //     this.ambilLagi(params);
      //   }
      // }
      console.log(res);
      store.commit("notLoading");
      items.forEach(e => {
        store.commit("setOrder", e);
        store.dispatch("subscribe", e);
      });
    } catch (e) {
      store.commit("notLoading");
    }
  },
  productIn(context, payload) {
    context.commit("setProduct", payload, { root: true });
  },
  productPush(context, payload) {
    context.commit("pushProduct", payload, { root: true });
  },
  productOut(context) {
    context.commit("delProduct", { root: true });
  },
  aunthenticate(context, payload) {
    context.commit("setAuthenticate", payload, { root: true });
    // localStorage.setItem("role", payload.role);
  },
  actToken(context, payload) {
    context.commit("setRetrieveToken", payload, { root: true });
  },
  destroyVerifie(context) {
    localStorage.removeItem("waiting_verivication");
    context.commit("setDestroyverifie", {
      root: true
    });
  },
  retrieveVerifie(contex) {
    localStorage.setItem("waiting_verivication", contex);
    contex.commit("setRetrieveVerifie", {
      root: true
    });
  },
  retrieveName() {
    return new Promise((resolve, reject) => {
      http()
        .get("auth/profile")
        .then(response => {
          console.log(response);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        });
    });
  },
  register(context, data) {
    return new Promise((resolve, reject) => {
      http()
        .post("client/register", data)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  destroyToken(context) {
    if (store.getters.loggedIn) {
      http()
        .get("auth/logout")
        .then(response => {
          this.flashMessage.success({
            message: response.data.message,
            time: 2000
          });
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });

      localStorage.removeItem("access_token"),
        localStorage.removeItem("level"),
        context.commit("setDestroyToken", {
          root: true
        });
      // context.commit("setDestroyLevel", {
      //   root: true
      // });
      context.commit("delAuthenticate", {
        root: true
      });
    } else {
      localStorage.removeItem("role");
    }
  },
  retrieveToken(context, credentials) {
    return new Promise((resolve, reject) => {
      http()
        .post("auth/login", credentials)
        .then(response => {
          setToken(response.data);
          this.flashMessage.success({
            message: "Login success",
            time: 2000
          });
          resolve(response);
        })
        .catch(error => {
          // console.log(error)
          if (error.response != undefined) {
            reject(error);
          }
        });
    });
  },
  retrieveOrder(context, credentials) {
    return new Promise((resolve, reject) => {
      console.log(credentials);
      http()
        .post(`user/orders`, credentials)
        .then(response => {
          console.log(response);
          setToken(response.data);
          this.flashMessage.success({
            message: response.data.message,
            time: 2000
          });
          resolve(response);
        })
        .catch(error => {
          // console.log(error)
          if (error.response != undefined) {
            this.flashMessage.success({
              message: error.response.message,
              time: 2000
            });
            reject(error);
          }
        });
    });
  }
};
