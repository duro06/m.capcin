<template>
  <div class="container is-fullhd">
    <Navbar class="navbar" />
    <div class="has-text-centered">
      <Welcome />

      <router-view></router-view>
    </div>
    <Footer class="navbar " />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/element/bulmaNav.vue";
import Footer from "@/components/element/bulmaFooter.vue";
import Welcome from "@/components/Welcome.vue";

export default {
  name: "Home",
  components: {
    Welcome,
    Navbar,
    Footer
  },
  computed: {
    produksi() {
      if (this.$store.getters.levelAccess == "Produksi") {
        return true;
      } else {
        return false;
      }
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
