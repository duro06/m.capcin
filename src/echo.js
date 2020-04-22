import Echo from "laravel-echo";
import store from "./store";
import * as auth from "./services/auth_service";
// import PusherBatchAuthorizer from "pusher-js-auth";
// window.Pusher.logToConsole = true
window.Pusher = require("pusher-js");
window.Echo = new Echo({
  broadcaster: "pusher",
  key: "ebfe3f8ff45ad9c3ad4c",
  cluster: "ap1",
  forceTLS: true,
  authEndpoint: `${store.state.server}/broadcasting/auth`,
  // authorizer: PusherBatchAuthorizer,
  // authDelay: 200,
  auth: {
    headers: {
      Authorization: "Bearer " + auth.getAccessToken()
    }
  }
});

// let token = localStorage.getItem("access_token");
// let jajan = document.cookie.split("=");
// // let satu = jajan[0];
// let dua = jajan[jajan.length - 1];
// console.log("token", token);
// console.log("jajan", jajan);
// if (token == null) {
//   console.log("No token");
//   window.Echo = new Echo({
//     broadcaster: "pusher",
//     key: "ebfe3f8ff45ad9c3ad4c",
//     cluster: "ap1",
//     forceTLS: true,
//     authEndpoint: `${store.state.server}/broadcasting/auth`,
//     // authorizer: PusherBatchAuthorizer,
//     // authDelay: 200,
//     auth: {
//       headers: {
//         "XSRF-TOKEN": dua
//       }
//     }
//   });
// } else {
//   console.log("Has token");
// }
