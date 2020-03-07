<template>
  <div>
    <nav
      class="navbar has-shadow is-fixed-top fadeIn"
      v-wow
      data-wow-duration="2s"
    >
      <div class="container is-fullwidth">
        <div class="navbar-dropdown is-pulled-right">
          <ul class="mega-ul">
            <li id="top-menu-1" class="one-icon mega-li">
              <a href="javascript:void(0)" class="mega-link">
                <span class="mega-icon"><i class="fa fa-bell"></i></span>
                <span class="tag is-danger">1</span>
              </a>
            </li>
            <!-- <li id="top-menu-2" class="one-icon mega-li">
              <a href="javascript:void(0)" class="mega-link">
                <span class="mega-icon"
                  ><i class="fas fa-shopping-cart"></i
                ></span>
                <span class="tag is-danger">1</span>
              </a>
            </li> -->
          </ul>
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
.navbar-dropdown .mega-ul,
.navbar-dropdown .mega-li {
  margin: 0;
  padding: 0;
}
.navbar-dropdown .mega-li {
  list-style: none;
}

.navbar-dropdown > .mega-ul > li.one-icon {
  padding: 10px 5px 2px;
}

.navbar-dropdown > .mega-ul > li.one-icon > .mega-link {
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

.navbar-dropdown > .mega-ul > li.one-icon > .mega-link .mega-icon {
  font-size: 1.3rem;
  color: #6e6d6d;
}
.navbar-dropdown > .mega-ul > .mega-li > a {
  padding: 0;
}
.navbar-dropdown > .mega-ul > .mega-li > a:hover,
.navbar-dropdown > .mega-ul > .mega-li > a:focus {
  background: none;
}

.navbar-dropdown > .mega-ul > .mega-li .tag {
  position: absolute;
  right: 7px;
  top: 12px;
  border-radius: inherit;
  font-size: 8px;
}
</style>
