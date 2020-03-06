<template>
  <nav class="navbar is-fixed-bottom-touch is-hidden-desktop ">
    <div class="container">
      <div class="navbar-brand level is-mobile">
        <div :class="['btn_nav_item', 'level-item', 'has-text-centered', home]">
          <router-link
            v-if="level == 'Produksi'"
            :to="{ path: '/home/produksi' }"
          >
            <i class="fas fa-home" />
            <p class="subtitle is-7 ">
              Beranda
            </p>
          </router-link>
          <router-link
            v-else-if="level == 'Packing'"
            :to="{ path: '/home/packing' }"
          >
            <i class="fas fa-home" />
            <p class="subtitle is-7 ">
              Beranda
            </p>
          </router-link>
          <router-link
            v-else-if="level == 'Mitra'"
            :to="{ path: '/home/mitra' }"
          >
            <i class="fas fa-home" />
            <p class="subtitle is-7 ">
              Beranda
            </p>
          </router-link>
          <router-link
            v-else-if="level == 'Supplier'"
            :to="{ path: '/home/supplier' }"
          >
            <i class="fas fa-home" />
            <p class="subtitle is-7 ">
              Beranda
            </p>
          </router-link>
        </div>
        <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', dompet]"
        >
          <router-link :to="{ path: '/dompet' }">
            <i class="fas fa-wallet"></i>
            <p class="subtitle is-7">
              Dompet
            </p>
          </router-link>
        </div>
        <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', profile]"
        >
          <router-link :to="{ path: '/profile' }">
            <i class="fas fa-user-tie"></i>
            <p class="subtitle is-7">
              Profile
            </p>
          </router-link>
        </div>
        <div v-if="!loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/login' }">
            <i class="fas fa-sign-in-alt"></i>
            <p class="subtitle is-7">
              Login
            </p>
          </router-link>
        </div>
        <div v-if="loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/logout' }">
            <i class="fas fa-sign-out-alt"></i>
            <p class="subtitle is-7">
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
    },
    level() {
      return this.$store.getters.levelAccess;
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
      console.log("Location: ", me.split("/")[1]);
      switch (me.split("/")[1]) {
        case "home":
          this.home = "active";
          this.dompet = "";
          this.profile = "";
          break;
        case "dompet":
          this.home = "";
          this.dompet = "active";
          this.profile = "";
          break;
        case "profile":
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
