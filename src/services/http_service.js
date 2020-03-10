import axios from "axios";
import * as auth from "./auth_service";
import store from "../store";

export function http() {
  return axios.create({
    baseURL: store.state.serverApi,
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
    baseURL: store.state.serverApi,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken(),
      "Content-Type": "multipart/form-data"
    }
  });
}

export function httpNot() {
  return axios.create({
    method: "POST",
    baseURL: store.state.serverApi2,
    headers: {
      // eslint-disable-next-line prettier/prettier
      Authorization: 'Bearer '+auth.getAccessToken(),
      // eslint-disable-next-line prettier/prettier
      'Content-Type': 'application/json'
    }
  });
}
