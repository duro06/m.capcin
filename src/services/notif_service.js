import jwt from "jsonwebtoken";
import store from "../store";
// import { mapState } from "vuex";

export function writeNotif() {
  // const notifData = localStorage.getItem("notif");
  const data = store.state.order.Order;
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
    // if (notifData) {
    //   console.log(notifData);
    //   localStorage.removeItem("notif");
    // }
    // store.commit("order/setLocalOrder", []);
    // store.dispatch('ambilData')
    localStorage.setItem("notif", notif);
  }
}

export function readNotif() {
  const notif = localStorage.getItem("notif");
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
      // console.log("data", data);
      const items = store.state.order.Order;
      // store.commit("order/setLocalOrder", message.items);
      data.forEach(local => {
        // console.log("data 1", local);
        const ada = items.filter(item => {
          if (item.id == local.id && item.status_id != local.status_id) {
            return true;
          }
        });
        if (ada.length) {
          const data = ada[0];
          store.commit("setNotification", data);
          store.commit("order/updateOrder", data);
        }
        // console.log("ada pesan baru?", ada[0]);
        // console.log("ada pesan baru", ada);
      });
    }
    // localStorage.removeItem("notif");
    return message;
  } else {
    return "tidak ada data";
  }
}

export function updateNotif() {
  localStorage.removeItem("notif");
  if (store.state.notification) {
    const data = store.state.order.Order;
    const pesan = store.state.notification.filter(e => e.read === false);
    // console.log("Write ", pesan);
    const notif = jwt.sign(
      { message: pesan, items: data },
      "Pala64564ha@sakuranandaniyu99865773838"
    );
    console.log("data", data, "pesan", pesan);
    localStorage.setItem("notif", notif);
  }
  // else {
  //   const notif = jwt.sign(
  //     {
  //       items: data
  //     },
  //     "Pala64564ha@sakuranandaniyu99865773838"
  //   );
  //   localStorage.setItem("notif", notif);
  // }
}
export function writeOrder(newValue, oldValue) {
  localStorage.removeItem("order");
  const order = jwt.sign(
    { newItems: newValue, oldItems: oldValue },
    "Pala64564ha@sakuranandaniyu99865773838"
  );
  // console.log("new", newValue);
  // console.log("old", oldValue);
  localStorage.setItem("order", order);
}
export function read() {
  const notif = localStorage.getItem("order");
  if (notif) {
    const message = jwt.decode(notif);
    console.log("read", message);
    let data = message;
    return data;
  } else {
    return "tidak ada data order";
  }
}
