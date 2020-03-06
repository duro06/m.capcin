<template>
  <div class="content-body has-shadow">
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
.content-body{
  background: whitesmoke;
}
.VueCarousel {
  border-radius: 20px !important;
}
</style>
