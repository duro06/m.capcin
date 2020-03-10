import axios from "axios";
import store from "../store";
import * as auth from "./auth_service";

export function http() {
  return axios.create({
    baseURL: store.state.serverApiAnyar,
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
    baseURL: store.state.serverApi,
    headers: {
      Authorization: "Bearer " + auth.getAccessToken(),
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "aplication/json"
    },
    crossdomain: true
  });
}
