<template>
  <keep-alive>
    <nav
      class="navbar is-fixed-bottom-touch is-hidden-desktop"
      :style="{ display: umum }"
    >
      <div>
        <div class="container">
          <div class="navbar-brand level is-mobile">
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

            <div
              :class="[
                'btn_nav_item',
                'level-item',
                'has-text-centered',
                currentPage.includes('laporan') ? activeClass : ''
              ]"
            >
              <router-link :to="{ path: '/laporan' }" exact>
                <i class="fas fa-file-invoice"></i>
                <!-- <i class="fas fa-wallet"></i> -->
                <p class="subtitle is-7">
                  Laporan
                </p>
              </router-link>
            </div>
            <!-- ================== Level mitra ======================-->
            <div
              v-if="level == 'Mitra'"
              :class="[
                'btn_nav_item',
                'level-item',
                'has-text-centered',
                currentPage.includes('order') ? activeClass : ''
              ]"
            >
              <router-link :to="{ path: '/order' }" exact>
                <i class="fas fa-folder"></i>
                <p class="subtitle is-7">
                  Order
                </p>
              </router-link>
            </div>
            <!--================== Level Packing ==================== -->
            <div
              v-if="level == 'Packing'"
              :class="[
                'btn_nav_item',
                'level-item',
                'has-text-centered',
                currentPage.includes('detailproduk') ? activeClass : ''
              ]"
            >
              <router-link :to="{ path: '/detailproduk' }" exact>
                <i class="fas fa-box-open"></i>
                <p class="subtitle is-7">
                  Packing
                </p>
              </router-link>
            </div>
            <!-- =================================================== -->
            <!--================== Level Supplier ==================== -->
            <div
              v-if="level == 'Supplier'"
              :class="[
                'btn_nav_item',
                'level-item',
                'has-text-centered',
                currentPage.includes('shipping') ? activeClass : ''
              ]"
            >
              <router-link :to="{ path: '/shipping' }" exact>
                <i class="fas fa-shipping-fast"></i>
                <p class="subtitle is-7">
                  Supplier
                </p>
              </router-link>
            </div>
            <!-- =================================================== -->
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
            <!-- <div v-if="!loggedIn" class="btn_nav_item level-item has-text-centered">
          <router-link :to="{ path: '/login' }" exact>
            <i class="fas fa-sign-in-alt"></i>
            <p class="subtitle is-7">
              Login
            </p>
          </router-link>
        </div>-->
            <!-- <div
          v-if="currentPage.includes('setting')"
          class="btn_nav_item level-item has-text-centered"
        >
          <router-link :to="{ path: '/logout' }" exact>
            <i class="fas fa-sign-out-alt"></i>
            <p class="subtitle is-7">
              Logout
            </p>
          </router-link>
        </div> -->
          </div>
        </div>
      </div>
    </nav>
  </keep-alive>
</template>

<script>
export default {
  name: "footnav",
  data() {
    return {
      activeClass: "active"
    };
  },
  computed: {
    umum() {
      let tampil =
        this.$route.path.includes("transaksi") ||
        this.$route.path.includes("setting") ||
        this.$route.path.includes("shipping") ||
        this.$route.path.includes("profile") ||
        this.$route.path.includes("detailproduk")
          ? "none"
          : "inherit";
      return tampil;
    },

    loggedIn() {
      return this.$store.getters.loggedIn;
    },
    level() {
      return this.$store.getters.levelAccess;
    },
    currentPage() {
      return this.$route.path;
    }
  },

  methods: {
    savePacking() {},
    cancelPacking() {},
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
  z-index: 1;
  display: flex;
  height: 50px;
  box-shadow: 0 -2px 1px -2px #333;
  background-color: #fff;
}

/* .router-link-exact-active {
  color: #ee1846 !important;
} */

p.subtitle {
  padding-top: 0px;
  font-size: 10px;
}
</style>
