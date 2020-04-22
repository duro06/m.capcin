import jwt from "jsonwebtoken";
import store from "../store";
import * as set from "./http_service";
import Echo from "laravel-echo";

export function register(user) {
  return set.http().post("auth/register", user);
}

export function login(user) {
  return set
    .http()
    .post("auth/login", user)
    .then(response => {
      if (response.status === 200) {
        setToken(response.data);
        denger(response.data);
      }

      return response.data;
    });
}

function denger(user) {
  // console.log("user", user);
  let userId = user.user.id;
  window.Pusher = require("pusher-js");
  let echo = new Echo({
    broadcaster: "pusher",
    key: "ebfe3f8ff45ad9c3ad4c",
    cluster: "ap1",
    forceTLS: true,
    authEndpoint: `${store.state.server}/broadcasting/auth`,
    // authorizer: PusherBatchAuthorizer,
    // authDelay: 200,
    auth: {
      headers: {
        Authorization: "Bearer " + user.access_token
      }
    }
  });

  echo.private("App.User." + userId).notification(data => {
    if (store.state.profile.role == "Mitra") {
      store.commit("setNotification", data);
      store.commit("order/setOrderFocus", data);
    } else if (store.state.profile.role == "Packing") {
      store.commit("setNotification", data);
      store.dispatch("pack/getPackingOrder");
    } else if (store.state.profile.role == "Supplier") {
      store.commit("setNotification", data);
      store.dispatch("shipping/getShipping");
    }
    // console.log(data.type);
    // console.log("data ", data);
  });
  store.dispatch("notifications/getNotifications");
}

export function setToken(user) {
  const token = jwt.sign({ user: user }, "secretkeynyajwtpluginokee2020");
  localStorage.setItem("access_token", token);
  store.commit("setRetrieveToken", token, { root: true });
  store.dispatch("aunthenticate", user.user);
  return;
}

export function getAccessToken() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }

  const tokenData = jwt.decode(token);
  return tokenData.user.access_token;
}

export function getUserId() {
  const token = localStorage.getItem("access_token");
  if (!token) {
    return null;
  }

  const tokenData = jwt.decode(token);
  console.log("data", tokenData);
  return tokenData.user.user.id;
}

export function getProfile() {
  return set.http().get("auth/profile");
}

export function updateImage(id, data) {
  return set.httpFile().post(`/user/update-image/${id}`, data);
}

export function updateProfile(id, data) {
  return set.http().put(`/user/update-profile/${id}`, data);
}
