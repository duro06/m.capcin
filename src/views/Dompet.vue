<template>
  <div class="dompet">
    <div class="wrapper">
      <!-- </div> -->
      <router-link :to="{ name: 'stock', params: { id: profile.id } }">
        <div class="card">
          <div class="media">
            <div class="media-left">
              <div class="icon">
                <i class="fas fa-luggage-cart fa-2x"></i>
              </div>
            </div>
            <div class="media-content">
              <p class="title is-5"><B>Lihat Stock</B></p>
            </div>
          </div>
        </div>
      </router-link>
    </div>
    <!-- <Footer class="navbar" /> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
// import Empty from "@/components/element/EmptyPage";
export default {
  name: "dompet",
  computed: {
    ...mapState(["profile"])
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding: 2px 10px 60px 10px;
}
.media {
  align-items: center;
}
.icon {
  width: 48px;
  height: 48px;
  padding: 5px 20px;
}
</style>
