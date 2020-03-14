import { http } from "./http_service.js";

export function getChart(params) {
  return http().get(`user/charts`, params);
}

export function toChart(params) {
  return http().post(`user/charts`, params);
}
export function delChart(params) {
  return http().post(`user/charts`, params);
}
export function modChart(params) {
  return http().post(`user/charts`, params);
}
