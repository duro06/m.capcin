import jwt from "jsonwebtoken";
import store from "../store";

export function writeNotif() {
  if (store.state.notification) {
    const pesan = store.state.notification;
    console.log("Write ", pesan);
    const notif = jwt.sign(
      { message: pesan },
      "Palaha@sakuranandaniyu99865773838"
    );
    console.log(notif);
    localStorage.setItem("notif", notif);
  }
}

export function readNotif() {
  const notif = localStorage.getItem("notif");
  if (notif) {
    const message = jwt.decode(notif);
    console.log("read", message.message);
    if (message.message.length) {
      message.message.forEach(e => {
        store.commit("setNotification", e);
      });
    }
    localStorage.removeItem("notif");
  }
}
