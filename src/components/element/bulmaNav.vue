<template>
  <div>
    <nav
      class="navbar has-shadow is-fixed-top fadeIn"
      role="navigation"
      v-wow
      data-wow-duration="2s"
    >
      <div class="container is-fullwidth">
        <div class="navbar-end">
          <div class="navbar-brand is-pulled-right">
            <ul class="mega-ul">
              <li
                class="one-icon mega-li navbar-item"
                @click="tampil"
                data-target="notif"
              >
                <a href="javascript:void(0)" class="mega-link">
                  <span class="mega-icon"><i class="fa fa-bell"></i></span>
                  <span class="tag is-danger" v-if="notification.length">{{
                    notification.length
                  }}</span>
                </a>
              </li>
              <li class="one-icon mega-li navbar-item">
                <router-link to="/keranjang" class="mega-link">
                  <span class="mega-icon"
                    ><i class="fas fa-shopping-cart"></i
                  ></span>
                  <span class="tag is-danger" v-if="cart > 0">{{ cart }}</span>
                </router-link>
              </li>
              <li
                class="one-icon mega-li navbar-item"
                v-if="currentPage.includes('profile')"
              >
                <router-link to="/keranjang" class="mega-link">
                  <span class="mega-icon"><i class="fas fa-cog"></i></span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <div
      id="notif"
      class="navbar-menu fadeInDown"
      :class="{ 'is-active': isActive }"
      v-wow
      data-wow-duration="1s"
    >
      <div class="navbar-end has-text-centered loop" v-if="notification.length">
        <div class="ulang" v-for="(pesan, n) in notification" :key="n">
          <div class="pesan">
            <p>{{ pesan }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as c from "@/services/cart_service";
export default {
  name: "navbar",
  data: () => ({
    isActive: false,
    error: [],
    kelihatan: "none",
    notification: ["satu", "dua", "tiga"]
  }),
  created() {
    this.getCart();
  },
  computed: {
    level() {
      return this.$store.getters.myProfile.role;
    },
    currentPage() {
      return this.$route.path;
    },
    // check() {
    //   return console.log(this.level);
    // },
    // cart() {
    //   return this.$store.state.cart;
    // },
    ...mapState(["profile", "cart"])
  },
  methods: {
    tampil() {
      this.isActive = !this.isActive;
      this.kelihatan = this.isActive ? "inherit" : "none";
    },
    getCart: async function() {
      let id = this.profile.id;
      let params = {
        params: {
          q: id
        }
      };
      try {
        const res = await c.getChart(params);
        let panjang = res.data.data.data.length;
        if (panjang > 0) {
          this.$store.commit("setCart", panjang);
        } else {
          this.$store.commit("setCart", 0);
        }
        this.$router.replace({ name: "mitra" }, () => {});
        this.error = [];
      } catch (e) {
        this.$router.replace({ name: "mitra" }, () => {});
      }
    }
  }
};
</script>
<style scoped>
#notif {
  width: 40%;
  position: fixed;
  margin-left: 55%;
  margin-top: 53px;
  border-radius: 5px;
  background-color: whitesmoke;
}
.ulang {
  background-color: rgb(241, 254, 255);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: center;
}
.pesan {
  border-radius: 3px;
  border-color: transparent;
  width: fit-content;
}
.navbar-burger {
  color: #4e4e4e !important;
  cursor: pointer;
  display: block;
  height: 3.25rem;
  position: relative;
  width: 3.25rem;
  margin-left: auto;
  text-align: center;
  padding: inherit;
  line-height: 30px;
  font-size: 20px;
  margin-right: 5px;
}
.navbar-brand .mega-ul,
.navbar-brand .mega-li {
  margin: 0;
  padding: 0;
  display: flex;
  /* flex-direction: column; */
}
.navbar-brand .mega-li {
  list-style: none;
}

.navbar-brand > .mega-ul > li.one-icon {
  padding: 10px 5px 2px;
}

.navbar-brand > .mega-ul > li.one-icon > .mega-link {
  display: block;
  height: 36px;
  line-height: 30px;
  width: 36px;
  text-align: center;
  padding: 0;
  margin: 0;
  overflow: hidden;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
}

.navbar-brand > .mega-ul > li.one-icon > .mega-link .mega-icon {
  font-size: 1.3rem;
  color: #6e6d6d;
}
.navbar-brand > .mega-ul > .mega-li > a {
  padding: 0;
}
.navbar-brand > .mega-ul > .mega-li > a:hover,
.navbar-brand > .mega-ul > .mega-li > a:focus {
  background: none;
}

.navbar-brand > .mega-ul > .mega-li .tag {
  position: absolute;
  right: 7px;
  top: 12px;
  border-radius: inherit;
  font-size: 8px;
}
</style>
