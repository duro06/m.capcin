import jwt from "jsonwebtoken";
import store from "../store";
import { mapState } from "vuex";

export function writeNotif() {
  let items = {
    ...mapState("order", {
      Items: state => state.Items
    })
  };
  if (store.state.notification) {
    // const pesan = store.state.notification;
    const pesan = store.state.notification.filter(e => e.read === false);
    // console.log("Write ", pesan);
    const notif = jwt.sign(
      { message: pesan, items: items },
      "Pala64564ha@sakuranandaniyu99865773838"
    );
    // console.log(notif);
    localStorage.setItem("notif", notif);
  } else {
    const notif = jwt.sign(
      {
        items: items
      },
      "Pala64564ha@sakuranandaniyu99865773838"
    );
    // console.log(notif);
    localStorage.setItem("notif", notif);
  }
}

export function readNotif() {
  const notif = localStorage.getItem("notif");
  if (notif) {
    const message = jwt.decode(notif);
    console.log("read", message);
    if (message.message.length) {
      message.message.forEach(e => {
        store.commit("setNotification", e);
      });
    }
    localStorage.removeItem("notif");
  }
}
