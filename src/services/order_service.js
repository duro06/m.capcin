import { http } from "./http_service.js";

export function order(params) {
  return http().get(`user/orders-user`, params);
}

export function purchase(params) {
  return http().post("user/orders", params);
}

export function chartOrder(params) {
  return http().post("user/chart-orders", params);
}

export function beli(params) {
  return http().post(`user/orders`, params);
}