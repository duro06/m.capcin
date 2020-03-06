<template>
  <nav
    class="navbar is-fixed-bottom-touch fadeInUp is-hidden-desktop "
    v-wow
    data-wow-duration="2s"
  >
    <div class="container">
      <div class="navbar-brand level is-mobile">
        <div :class="['btn_nav_item', 'level-item', 'has-text-centered', home]">
          <router-link :to="{ path: '/home' }">
            <i class="fas fa-home slide" v-wow data-wow-duration="2s" />
            <p class="subtitle is-7 slideInLeft" v-wow data-wow-duration="2s">
              Beranda
            </p>
          </router-link>
        </div>
        <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', dompet]"
        >
          <router-link :to="{ path: '/dompet' }">
            <i
              class="fas fa-wallet slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.5s"
            ></i>
            <p
              class="subtitle is-7 slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.5s"
            >
              Dompet
            </p>
          </router-link>
        </div>
        <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', profile]"
        >
          <router-link :to="{ path: '/profile' }">
            <i
              class="fas fa-user-tie slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.7s"
            ></i>
            <p
              class="subtitle is-7 slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.7s"
            >
              Profile
            </p>
          </router-link>
        </div>
        <div v-if="!loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/login' }">
            <i
              class="fas fa-sign-in-alt slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.9s"
            ></i>
            <p
              class="subtitle is-7 slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.9s"
            >
              Login
            </p>
          </router-link>
        </div>
        <div v-if="loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/logout' }">
            <i
              class="fas fa-sign-out-alt slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.9s"
            ></i>
            <p
              class="subtitle is-7 slide"
              v-wow
              data-wow-duration="2s"
              data-wow-delay="0.9s"
            >
              Logout
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "footnav",
  data() {
    return { home: "", dompet: "", profile: "" };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    }
  },
  watch: {
    lokasi: {
      immediate: true,
      handler() {
        this.isActive();
      }
    }
  },
  methods: {
    isActive() {
      let me = window.location.pathname;
      console.log("Location: ", me);
      switch (me) {
        case "/home":
          this.home = "active";
          this.dompet = "";
          this.profile = "";
          break;
        case "/dompet":
          this.home = "";
          this.dompet = "active";
          this.profile = "";
          break;
        case "/profile":
          this.home = "";
          this.dompet = "";
          this.profile = "active";
          break;

        default:
          break;
      }
    }
  }
};
</script>
<style scoped>
.navbar-brand {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  height: 60px;
  box-shadow: 0 -2px 1px -2px #333;
  background-color: #fff;
}

.btn_nav_item a {
  color: #636e72;
}
.btn_nav_item.active a {
  color: #ee1846 !important;
}
.btn_nav_item.active p {
  color: #ee1846 !important;
}

p.subtitle {
  padding-top: 0px;
  font-size: 10px;
}
</style>
