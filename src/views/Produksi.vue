<template>
  <div class="produksi">
    <Produksi />
    <Footer />
  </div>
</template>
<script>
import Produksi from "@/components/role/Produksi.vue";
// import Footer from "@/components/element/bulmaFooter.vue";
// import store from "../store";
// import * as auth from "../services/auth_service";

export default {
  name: "produksi",
  components: {
    Produksi
    // Footer
  }
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm(
  //     "Do you really want to leave? you have unsaved changes!"
  //   );
  //   if (answer) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // }
};
</script>
<style scoped></style>
