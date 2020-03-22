<template>
  <div class="content-body">
    <div class=" fadeInUp" name="welcome">
      <h1 class="judul-component">Info Capcin</h1>
      <carousel
        :per-page="1"
        :autoplay="true"
        :autoplayTimeout="5000"
        :loop="true"
        :paginationSize="5"
        :paginationPadding="2"
      >
        <slide
          v-for="(item, apem) in pengumuman"
          :key="apem"
          style="align: center"
        >
          <bilboard class="dat" :data="item"></bilboard>
        </slide>
      </carousel>
      <div class="rata-kanan">
        <a class="link-color">Lihat semua</a>
      </div>
    </div>
  </div>
</template>
<script>
import Bilboard from "@/components/element/ElementCard.vue";
export default {
  name: "welcome",
  components: {
    Bilboard
  },
  data() {
    return {
      pengumuman: [
        { image: "../img/image/Chrysanthemum.jpg" },
        { image: "../img/image/Hydrangeas.jpg" },
        { image: "../img/image/Jellyfish.jpg" },
        { image: "../img/image/Koala.jpg" },
        { image: "../img/image/Lighthouse.jpg" },
        { image: "../img/image/Penguins.jpg" },
        { image: "../img/image/Tulips.jpg" },
        { image: "../img/image/Desert.jpg" }
      ]
    };
  }
};
</script>
<style scoped>
.content-body {
  margin-top: 10px;
}
.dat {
  height: 120px;
}
</style>
