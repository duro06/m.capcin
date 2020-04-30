<template>
  <div class="container is-fullhd">
    <router-link to="/profile" class="syarat " v-if="nilai < 100">
      <progress class="progress is-link" :value="nilai" max="100"> </progress>
      <span v-if="role == 'Mitra'">
        <i>
          Profile anda belum lengkap, harap lengkapi profile Anda. klik disini
          untuk melengkapi
        </i>
      </span>
      <span v-else>
        <i>Profile anda belum lengkap. klik disini untuk melengkapi</i>
      </span>
    </router-link>
    <!-- <Navbar class="navbar" /> -->
    <div class="has-text-centered">
      <Welcome />
      <router-view></router-view>
    </div>
    <!-- <Footer class="navbar" /> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
// @ is an alias to /src
// import Navbar from "@/components/element/bulmaNav.vue";
// import Footer from "../components/element/bulmaFooter";
// import Welcome from "@/components/Welcome.vue";

export default {
  name: "Home",
  components: {
    Welcome: () =>
      import(/* webpackChunkName: "welcome" */ "@/components/Welcome.vue")
    // Footer,
    // Navbar
  },
  computed: {
    ...mapState(["profile"]),
    produksi() {
      if (this.$store.getters.levelAccess == "Produksi") {
        return true;
      } else {
        return false;
      }
    },
    role() {
      return this.profile.role;
    },
    nilai() {
      let nilai = 80;
      if (this.profile.alamat != "null") {
        nilai = nilai + 10;
      }
      if (this.profile.tlp != "null") {
        nilai = nilai + 10;
      }
      return nilai;
    }
  }
  // methods: {
  //   testloc() {
  //     // let active;
  //     let me = window.location;
  //     console.log("Location: ", me);
  //     // return active;
  //   }
  // }

  // created() {
  //   document.querySelector("body").style.backgroundColor = "#aef";
  // }
};
</script>
<style scoped>
.content {
  padding: 60px 10px 53px 10px;
}
.mu {
  background-color: rgb(37, 221, 235);
}
</style>
