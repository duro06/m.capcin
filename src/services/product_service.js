import { http } from "./http_service.js";

export function loadData(params) {
  return http().get("user/products", params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
}

export function loadMore(page) {
  return http().get(`user/products?page=${page}`); //
}

export function purchase(params) {
  return http().post("user/orders", params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
}
