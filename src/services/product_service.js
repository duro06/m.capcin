import { http } from "./http_service.js";

/*
jika ingin melihat route apa saja yang tersedia cek di laravel
pakai php artisan route:list
*/

export function loadData(params) {
  return http().get("user/products", params);
}

export function loadMore(page) {
  return http().get(`user/products?page=${page}`);
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

export function getById(params) {
  return http().get(`user/products/${params}/edit`);
}

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
