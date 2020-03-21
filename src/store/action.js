import { http } from "../services/http_service.js";
import { subscribe } from "../services/pusher_service";
import { setToken } from "../services/auth_service.js";
import * as ord from "@/services/order_service";
import store from ".";

export default {
  ambilOrder: async function() {
    store.commit("loading");
    store.commit("delOrder");
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
      // console.log("Items", items);
      // console.log("res", res);
      items.forEach(e => {
        store.commit("setOrder", e.id);
        subscribe(e.id);
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
