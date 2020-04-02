import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);
// function lazyLoad(view){
//   return() => import(`@/views/${view}.vue`)
// }

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
    path: "/order",
    name: "order",
    component: () => import("../views/Order.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },

  {
    path: "/focus/:id",
    name: "focus",
    component: () => import("../components/element/OrderFocus.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },
  {
    path: "/transaksi/order_detail/:id",
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
    path: "/transaksi/keranjang",
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
    path: "/setting",
    name: "setting",
    component: () => import("../views/Setting.vue"),
    meta: {
      loggedIn: true,
      waitingVerified: false,
      visitor: false,
      verified: true
    }
  },

  {
    path: "/test",
    name: "test",
    component: () => import("../views/Test.vue"),
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

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem("level");
  if (to.matched.some(record => record.meta.loggedIn)) {
    // jika to ketememu sama meta loggedIn yang true
    //maka jika dia tidak login, kembalikan ke halaman login

    if (store.getters.loggedIn) {
      if (to.matched.some(record => record.meta.role == "Produksi")) {
        if ((store.getters.levelAccess || role) == "Produksi") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Packing")) {
        if ((store.getters.levelAccess || role) == "Packing") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Supplier")) {
        if ((store.getters.levelAccess || role) == "Supplier") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else if (to.matched.some(record => record.meta.role == "Mitra")) {
        if ((store.getters.levelAccess || role) == "Mitra") {
          next();
        } else {
          next({ path: "/home" });
        }
      } else {
        next();
      }
    } else {
      next({ path: "/login" });
    }
  } else if (to.matched.some(record => record.meta.waitingVerified)) {
    if (store.getters.waitingVerified) {
      next();
    } else {
      switch (store.getters.levelAccess || role) {
        case "Produksi":
          next({ path: "/home/produksi" });
          break;
        case "Packing":
          next({ path: "/home/packing" });
          break;
        case "Mitra":
          next({ path: "/home/mitra" });
          break;
        case "Supplier":
          next({ path: "/home/supplier" });
          break;

        default:
          next({ path: "/home" });
          break;
      }
    }
  } else if (to.matched.some(record => record.meta.visitor)) {
    if (store.getters.loggedIn) {
      switch (store.getters.levelAccess || role) {
        case "Produksi":
          next({ path: "/home/produksi" });
          break;
        case "Packing":
          next({ path: "/home/packing" });
          break;
        case "Mitra":
          next({ path: "/home/mitra" });
          break;
        case "Supplier":
          next({ path: "/home/supplier" });
          break;

        default:
          next({ path: "/home" });
          break;
      }
    } else if (store.getters.waitingVerified) {
      next({ path: "/waiting" });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.verified)) {
    if (store.getters.waitingVerified) {
      next({ path: "/waiting" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
