<template>
  <nav class="navbar is-fixed-bottom-touch is-hidden-desktop ">
    <div class="container">
      <div class="navbar-brand level is-mobile">
        <!-- <div :class="['btn_nav_item', 'level-item', 'has-text-centered', home]"> -->
        <div
          :class="[
            'btn_nav_item',
            'level-item',
            'has-text-centered',
            currentPage.includes('home') ? activeClass : ''
          ]"
        >
          <a @click="role" exact>
            <i class="fas fa-home" />
            <p class="subtitle is-7 ">
              Beranda
            </p>
          </a>
        </div>
        <!-- <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', dompet]"
        > -->
        <div
          :class="[
            'btn_nav_item',
            'level-item',
            'has-text-centered',
            currentPage.includes('dompet') ? activeClass : ''
          ]"
        >
          <router-link :to="{ path: '/dompet' }" exact>
            <i class="fas fa-wallet"></i>
            <p class="subtitle is-7">
              Dompet
            </p>
          </router-link>
        </div>
        <!-- <div
          :class="['btn_nav_item', 'level-item', 'has-text-centered', profile]"
        > -->
        <div
          :class="[
            'btn_nav_item',
            'level-item',
            'has-text-centered',
            currentPage.includes('profile') ? activeClass : ''
          ]"
        >
          <router-link :to="{ path: '/profile' }" exact>
            <i class="fas fa-user-tie"></i>
            <p class="subtitle is-7">
              Profile
            </p>
          </router-link>
        </div>
        <div v-if="!loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/login' }" exact>
            <i class="fas fa-sign-in-alt"></i>
            <p class="subtitle is-7">
              Login
            </p>
          </router-link>
        </div>
        <div v-if="loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/logout' }" exact>
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
    return { home: "", dompet: "", profile: "", activeClass: "active" };
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    level() {
      return this.$store.getters.levelAccess;
    },
    currentPage() {
      console.log("rute path ", this.$route.path);
      return this.$route.path;
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
      console.log("rute path ", this.$route.path);
      // console.log("rute path include", this.$route.path.include("home"));
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
    },
    role() {
      switch (this.level) {
        case "Produksi":
          this.$router.push({ name: "produksi" }, () => {});
          break;
        case "Packing":
          this.$router.push({ name: "packing" }, () => {});
          break;
        case "Supplier":
          this.$router.push({ name: "supplier" }, () => {});
          break;
        case "Mitra":
          this.$router.push({ name: "mitra" }, () => {});
          break;
        default:
          this.$store
            .dispatch("destroyToken")
            .then(
              this.flashMessage.success({
                message:
                  "Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin " +
                  this.role,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: "login" },
                () => {}
              )
            )
            .catch(
              this.flashMessage.success({
                message:
                  "Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin " +
                  this.role,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: "login" },
                () => {}
              )
            );
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
.router-link-exact-active {
  color: #ee1846 !important;
}

p.subtitle {
  padding-top: 0px;
  font-size: 10px;
}
</style>
