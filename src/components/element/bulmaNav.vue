<template>
  <div>
    <nav class="navbar is-fixed-top fadeIn" v-wow data-wow-duration="2s">
      <div class="container is-fullwidth">
        <div class="navbar-dropdown is-right">
          <a role="button" class="navbar-burger">
            <i class="fa fa-bell"></i>
          </a>
        </div>
      </div>
    </nav>
  </div>
  <!-- <nav class="navbar is-fixed-top fadeIn" v-wow data-wow-duration="2s">
    <div class="container is-widescreen navbar-menu">
      <div class="navbar-end">
        <div class="notif-bar is-right">
          <a>
            <i class="fa fa-bell"></i>
          </a>
        </div>
        <div class="">
          <span>
            <router-link
              class="navbar-item slide"
              to="/home"
              v-wow
              data-wow-duration="1s"
            >
              <i class="fas fa-home slide" v-wow data-wow-duration="1s" />
              Home</router-link
            >
          </span>
        </div>
        <div class="level-item has-text-centered">
          <span>
            <p class="is-size-7">Logged in as :</p>
            <p class="is-size-7">{{ (" ", level) }} Capcin</p>
          </span>
        </div>
        <span
          class="navbar-burger burger level-item"
          data-target="menuMakan"
          :class="{ 'is-active': isActive }"
          @click.prevent="switchMenu"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>
      <div
        id="menuMakan"
        class="navbar-menu fadeInDown"
        :class="{ 'is-active': isActive }"
        v-wow
        data-wow-duration="1s"
      >
        <div class="navbar-end  has-text-centered">
          <router-link
            class="navbar-item slideInDown "
            v-if="level == 'Produksi'"
            :to="{ path: '/home/produksi' }"
            replace
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.4s"
            >Produksi</router-link
          >
          <router-link
            class="navbar-item slideInDown "
            v-if="level == 'Packing'"
            :to="{ path: '/packing' }"
            replace
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.4s"
            >Packing</router-link
          >
          <router-link
            class="navbar-item slideInDown "
            v-if="level == 'Mitra'"
            :to="{ path: '/mitra' }"
            replace
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.4s"
            >Mitra</router-link
          >
          <router-link
            class="navbar-item slideInDown "
            v-if="level == 'Supplier'"
            :to="{ path: '/supplier' }"
            replace
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.4s"
            >Suplier</router-link
          >
        </div>
      </div>
    </div>
  </nav> -->
</template>
<script>
export default {
  name: "navbar",
  data: () => ({ isActive: false }),
  computed: {
    level() {
      return this.$store.getters.myProfile.role;
    },
    check() {
      return console.log(this.level);
    }
  },
  methods: {
    switchMenu() {
      this.isActive = !this.isActive;
    }
  }
};
</script>
<style scoped>
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

/* .notif-atas {

} */
</style>
