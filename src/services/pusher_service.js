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
  // console.log("Order nya ini lho", order);
  channel.bind("App\\Events\\OrderStatusChanged", data => {
    store.commit("setNotification", data);
    console.log("Data ", data);
    if (data != "") {
      console.log("data ada");
    }
  });

  // console.log(channel);
}
