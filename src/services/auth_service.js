import jwt from "jsonwebtoken";
import store from "../store";
import * as set from "./http_service";

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
      }

      return response.data;
    });
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
