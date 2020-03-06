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
export function httpMe() {
  return {
    baseURL: "localhost:8080",
    headers: {
      "Content-Location": "text/plain"
    }
  };
}
export function httpFile() {
  return axios.create({
    headers: {
      Authorization: "Bearer " + auth.getAccessToken(),
      "Content-Type": "multipart/form-data"
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
