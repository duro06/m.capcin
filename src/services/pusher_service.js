import Pusher from "pusher-js";
import store from "../store";
// Pusher.logToConsole = true;
//====================== pusher =======
export function subscribe(order) {
  // Api key + cluster

  let pusher = new Pusher("c1b487e073e0124e259f", {
    cluster: "ap1",
    forceTLS: true
  });

  let channel = pusher.subscribe("capcin-tracker." + order);
  channel.bind("App\\Events\\OrderStatusChanged", data => {
    store.commit("setNotification", data);
    store.commit("order/setOrderFocus", data);
    store.commit("order/updateOrderItems", data);
  });
}

export function register(order) {
  // Api key + cluster

  let pusher = new Pusher("c1b487e073e0124e259f", {
    cluster: "ap1",
    forceTLS: true
  });

  let channel = pusher.subscribe("capcin-reg." + order);
  channel.bind("App\\Events\\RegisterEvent", data => {
    if (data != "") {
      store.dispatch("destroyVerifie");
    }
  });
}

export function produksi(id) {
  // Api key + cluster

  let pusher = new Pusher("c1b487e073e0124e259f", {
    cluster: "ap1",
    forceTLS: true
  });
  // ini masih persiapan...
  let channel = pusher.subscribe("capcin-reg." + id);
  channel.bind("App\\Events\\RegisterEvent", data => {
    if (data != "") {
      store.dispatch("destroyVerifie");
    }
  });
}
