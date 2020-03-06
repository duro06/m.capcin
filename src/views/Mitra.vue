<template>
  <div class="body-mitra has-shadow">
    <Mitra />
  </div>
</template>
<script>
import Mitra from "@/components/role/Mitra.vue";
export default {
  name: "mitra",
  components: {
    Mitra
  }
};
</script>
<style scoped>
.body-mitra {
  box-shadow: 0 2px 0 0 whitesmoke;
}
.VueCarousel {
  border-radius: 20px !important;
}
</style>
