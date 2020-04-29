<template>
  <div class="dompet">
    <div class="wrapper">
      <div v-if="profile.role == 'Mitra'">
        <router-link :to="{ name: 'stock', params: { id: profile.id } }">
          <div class="card">
            <div class="media">
              <div class="media-left">
                <div class="icon">
                  <i class="fas fa-layer-group fa-2x"></i>
                  <!-- <i class="fas fa-layer-group"></i> -->
                </div>
              </div>
              <div class="media-content">
                <p class="title is-5"><B>Laporan harian</B></p>
              </div>
            </div>
          </div>
        </router-link>
        <router-link
          :to="{ name: 'mitra-penjualan', params: { id: profile.id } }"
        >
          <div class="card">
            <div class="media">
              <div class="media-left">
                <div class="icon">
                  <i class="fas fa-layer-group fa-2x"></i>
                  <!-- <i class="fas fa-layer-group"></i> -->
                </div>
              </div>
              <div class="media-content">
                <p class="title is-5"><B>Laporan penjualan</B></p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="profile.role == 'Packing'">
        <router-link
          :to="{ name: 'laporanpacking', params: { id: profile.id } }"
        >
          <div class="card">
            <div class="media">
              <div class="media-left">
                <div class="icon">
                  <i class="fas fa-layer-group fa-2x"></i>
                  <!-- <i class="fas fa-layer-group"></i> -->
                </div>
              </div>
              <div class="media-content">
                <p class="title is-5"><B>Laporan harian</B></p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
      <div v-if="profile.role == 'Supplier'">
        <router-link
          :to="{ name: 'laporanpengiriman', params: { id: profile.id } }"
        >
          <div class="card">
            <div class="media">
              <div class="media-left">
                <div class="icon">
                  <i class="fas fa-layer-group fa-2x"></i>
                  <!-- <i class="fas fa-layer-group"></i> -->
                </div>
              </div>
              <div class="media-content">
                <p class="title is-5"><B>Laporan harian</B></p>
              </div>
            </div>
          </div>
        </router-link>
      </div>
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
