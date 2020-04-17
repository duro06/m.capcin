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
