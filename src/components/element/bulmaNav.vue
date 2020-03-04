<template>
  <nav class="navbar is-fixed-top fadeInUp " v-wow data-wow-duration="2s">
    <div class="container ">
      <div class="navbar-brand level is-mobile">
        <div class="level-item has-text-centered">
          <span>
            <router-link
              class="navbar-item slideInLeft "
              to="/home"
              v-wow
              data-wow-duration="1s"
            >
              <i
                class="fas fa-home slideInRight"
                v-wow
                data-wow-duration="1s"
              />
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
  </nav>
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
