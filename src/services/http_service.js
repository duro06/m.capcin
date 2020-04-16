import axios from "axios";
import store from "../store";
import * as auth from "./auth_service";

// axios.defaults.withCredentials = true;

export function http() {
  return axios.create({
    baseURL: store.getters.apiUrl,
    // withCredentials: true,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken()
    }
  });
}
export function httpMe() {
  return {
    baseURL: "localhost:8080",
    headers: {
      "Content-Location": "text/plain"
    }
  };
}
export function pusher() {
  return {
    baseURL: store.state.server,
    withCredentials: true,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken()
    }
  };
}
export function httpFile() {
  return axios.create({
    baseURL: store.getters.apiUrl,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken(),
      "Content-Type": "multipart/form-data"
    }
  });
}

export function httpNot() {
  return axios.create({
    baseURL: store.getters.apiUrl,
    headers: {
      // eslint-disable-next-line prettier/prettier
      Authorization: 'Bearer '+auth.getAccessToken(),
      // eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json'
    }
  });
}
