import Vue from "vue";
import VueRouter from "vue-router";
// import store from "../store";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: {
      name: "home"
    }
  },
  {
    path: "/login",
    name: "login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    meta: {
      loggedIn: false,
      waitingVerified: false,
      visitor: true,
      verified: true
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../components/auth/SignUp.vue"),
    meta: {
      loggedIn: false,
      waitingVerified: false,
      visitor: true,
      verified: true
    }
  },
  {
    path: "/waiting",
    name: "waiting",
    component: () => import("../views/Waiting.vue"),
    meta: {
      loggedIn: false,
      waitingVerified: true,
      visitor: true,
      verified: false
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    },
    children: [
      {
        path: "produksi",
        name: "produksi",
        component: () => import("../views/Produksi.vue"),
        meta: { role: "Produksi" }
      },
      {
        path: "packing",
        name: "packing",
        component: () => import("../views/Packing.vue"),
        meta: { role: "Packing" }
      },
      {
        path: "supplier",
        name: "supplier",
        component: () => import("../views/Supplier.vue"),
        meta: { role: "Supplier" }
      },
      {
        path: "mitra",
        name: "mitra",
        component: () => import("../views/Mitra.vue"),
        meta: { role: "Mitra" }
      }
    ]
  },

  {
    path: "*",
    name: "hello",
    component: () => import("../components/HelloWorld.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: true,
      visitor: true,
      verified: true
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/order_detail/:id",
    name: "order_detail",
    component: () => import("../views/DetailOrder.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/keranjang",
    name: "keranjang",
    component: () => import("../views/Keranjang.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/berhasil",
    name: "berhasil",
    component: () => import("../views/SuccessOrder.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/dompet",
    name: "dompet",
    component: () => import("../views/Dompet.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/auth/Logout.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active"
});

export default router;
