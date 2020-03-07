import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
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
    beforeEnter: (to, from, next) => {
      console.log("login 2 get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next("/home");
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next();
      }
    }
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("../components/auth/SignUp.vue"),
    beforeEnter: (to, from, next) => {
      console.log("signup get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next("/home");
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next();
      }
    }
  },
  {
    path: "/waiting",
    name: "waiting",
    component: () => import("../views/Waiting.vue"),
    beforeEnter: (to, from, next) => {
      console.log("tetst get ", store.getters.waitingVerified);
      if (store.getters.waitingVerified) {
        next();
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home.vue"),
    children: [
      {
        path: "produksi",
        name: "produksi",
        component: () => import("../views/Produksi.vue"),

        beforeEnter: (to, from, next) => {
          console.log(
            "router get access Profile ",
            store.getters.levelAccess,
            "router get state Profile ",
            store.state.profile.role
          );

          if (
            store.getters.levelAccess === "Produksi" ||
            localStorage.getItem("level") === "Produksi"
          ) {
            next();
            console.log("Produksi confirm");
          } else if (store.getters.waitingVerified) {
            console.log("Produksi look for verified");
            next("/waiting");
          } else {
            console.log("Produksi none are true");
            next("/home");
          }
        }
      },
      {
        path: "packing",
        name: "packing",
        component: () => import("../views/Packing.vue"),
        beforeEnter: (to, from, next) => {
          console.log("router get Profile ", store.getters.myProfile.role);
          console.log("router get Profile ", store.getters.levelAccess);
          if (
            store.getters.myProfile.role == "Packing" ||
            localStorage.getItem("level") === "Packing"
          ) {
            next();
          } else if (store.getters.waitingVerified) {
            next("/waiting");
          } else {
            next("/home");
          }
        }
      },
      {
        path: "supplier",
        name: "supplier",
        component: () => import("../views/Supplier.vue"),
        beforeEnter: (to, from, next) => {
          console.log(store.getters.levelAccess);
          if (store.getters.levelAccess == "Supplier") {
            next();
          } else if (store.getters.waitingVerified) {
            next("/waiting");
          } else {
            next("/home");
          }
        }
      },
      {
        path: "mitra",
        name: "mitra",
        component: () => import("../views/Mitra.vue"),
        beforeEnter: (to, from, next) => {
          console.log("get level ", store.getters.levelAccess);
          if (
            store.getters.levelAccess == "Mitra" ||
            localStorage.getItem("level") === "Mitra"
          ) {
            next();
          } else if (store.getters.waitingVerified) {
            next("/waiting");
          } else {
            next("/home");
          }
        }
      }
    ],

    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        console.log("Entering Home ");
        next();
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },

  {
    path: "*",
    name: "hello",
    component: () => import("../components/HelloWorld.vue"),

    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next();
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },
  // {
  //   path: "/logged",
  //   name: "logged",
  //   component: () => import("../views/Logged.vue"),
  //   beforeEnter: (to, from, next) => {
  //     console.log("logged get ", store.getters.loggedIn);
  //     if (store.getters.loggedIn) {
  //       next();
  //     } else if (store.getters.waitingVerified) {
  //       next("/waiting");
  //     } else {
  //       next("/login");
  //     }
  //   }
  // },

  {
    path: "/profile",
    name: "profile",
    component: () => import("../views/Profile.vue"),
    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next();
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/order_detail",
    name: "order_detail",
    component: () => import("../views/DetailOrder.vue"),
    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next();
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/product_detail/:id",
    name: "product_detail",
    component: () => import("../views/ProductDetail.vue"),
    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        console.log("product nya ", store.state.products);
        if (store.state.products != "") {
          next();
        } else {
          next("/home/" + localStorage.getItem("level"));
        }
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },
  {
    path: "/dompet",
    name: "dompet",
    component: () => import("../views/Dompet.vue"),
    beforeEnter: (to, from, next) => {
      console.log("logged get ", store.getters.loggedIn);
      if (store.getters.loggedIn) {
        next();
      } else if (store.getters.waitingVerified) {
        next("/waiting");
      } else {
        next("/login");
      }
    }
  },
  // {
  //   path: "/card",
  //   name: "card",
  //   component: () => import("../components/element/Card.vue")
  // },
  {
    path: "/logout",
    name: "logout",
    component: () => import("../components/auth/Logout.vue")
  }
  // {
  //   path: "/tabel",
  //   name: "tabel",
  //   component: () => import("../components/element/Tabel.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
