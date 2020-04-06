import jwt from "jsonwebtoken";
import store from "../store";
// import { mapState } from "vuex";

export function writeNotif() {
  let data = store.state.order.Order;
  if (store.state.notification) {
    // const pesan = store.state.notification;
    const pesan = store.state.notification.filter(e => e.read === false);
    // console.log("Write ", pesan);
    const notif = jwt.sign(
      { message: pesan, items: data },
      "Pala64564ha@sakuranandaniyu99865773838"
    );
    // console.log(notif);
    localStorage.setItem("notif", notif);
  } else {
    const notif = jwt.sign(
      {
        items: data
      },
      "Pala64564ha@sakuranandaniyu99865773838"
    );
    // console.log(notif);
    store.commit("order/setLocalOrder", []);
    localStorage.setItem("notif", notif);
  }
}

export function readNotif() {
  const notif = localStorage.getItem("notif");
  // let params = {
  //   params: {
  //     q: localStorage.getItem("mie")
  //   }
  // };
  if (notif) {
    const message = jwt.decode(notif);
    console.log("read", message);
    let data = message.items;
    if (message.message.length) {
      message.message.forEach(e => {
        store.commit("setNotification", e);
      });
    }
    if (data.length) {
      console.log("data", data);
      let items = store.state.order.Order;
      // store.commit("order/setLocalOrder", message.items);
      data.forEach(local => {
        console.log("data 1", local);
        let ada = items.filter(item => {
          if (item.id == local.id && item.status_id != local.status_id) {
            return true;
          }
        });
        if (ada.length) {
          ada[0].read = false;
          store.commit("setNotification", ada[0]);
        }
        console.log("ada pesan baru?", ada[0]);
        console.log("ada pesan baru", ada);
      });
    }
    localStorage.removeItem("notif");
  }
}
