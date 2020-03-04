<template>
  <div class="body">
    <div class=" fadeInUp" v-wow data-wow-duration="1s" name="welcome">
      <h1 class="has-text-centered">Pengumuman</h1>
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
    </div>
  </div>
</template>
<script>
import Bilboard from "./element/ElementCard.vue";

export default {
  name: "welcome",
  components: {
    Bilboard
  },
  data() {
    return {
      pengumuman: [
        { image: "./img/image/Chrysanthemum.jpg" },
        { image: "./img/image/Hydrangeas.jpg" },
        { image: "./img/image/Jellyfish.jpg" },
        { image: "./img/image/Koala.jpg" },
        { image: "./img/image/Lighthouse.jpg" },
        { image: "./img/image/Penguins.jpg" },
        { image: "./img/image/Tulips.jpg" },
        { image: "./img/image/Desert.jpg" }
      ]
    };
  }
};
</script>
<style scoped>
.body {
  padding: 26px 24px 0px 24px;
}
.dat {
  height: 100px;
}
</style>
