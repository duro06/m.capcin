import axios from "axios";
import * as auth from "./auth_service";

export function http() {
  return axios.create({
    // baseURL: store.getters.serverUrl,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken()
    }
  });
}
export function httpTry() {
  return axios.create({
    // baseURL: store.getters.serverUrl,
    headers: {
      username: "farhan",
      password: "farhan"
      // Authorization: "Bearer" + auth.getAccessToken()
    }
  });
}
export function httpNot() {
  return axios.create({
    headers: {
      "Content-Type": "aplication/json"
    }
  });
}
