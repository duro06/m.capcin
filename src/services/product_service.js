import { http } from "./http_service.js";

export function loadData(params) {
  return http().get("user/products", params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
}

export function loadMore(page) {
  return http().get(`user/products?page=${page}`); //
}

export function purchase(params) {
<<<<<<< HEAD
  return httpNot().post(`user/mitra-ordered`, params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
=======
  return http().post("user/mitra-ordered", params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
>>>>>>> sukses ordering from mitra
}
export function beli(params) {
  return http().post(`user/orders`, params); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
}

export function getById(params) {
  return http().get(`user/products/${params}/edit`); //ini diambil  dari Route products laravel nama routenya ('api/(prefix=user)/products)...karena sdh di definisikan di store maka tgl ('/products)
}
