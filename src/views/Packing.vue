<template>
  <div class="packing">
    <router-link to="/packtask">
      <div class="card">
        <div class="card-header">
          <div class="columns is-mobile">
            <div class="column is-3 ikon">
              <div class="isi-ikon">
                <i class="fas fa-tasks fa-2x"></i>
              </div>
            </div>
            <div class="column is-9">
              <div class="isi">
                Anda memiliki <B>{{ packingOrders.length }}</B> tugas yang belum
                selesai
              </div>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "packing",
  components: {
    // Packing
  },
  created() {
    this.getPackingOrder();
  },
  computed: {
    ...mapState("pack", {
      packingOrders: state => state.packingOrders
    })
  },
  methods: {
    ...mapActions("pack", ["getPackingOrder"])
  }
};
</script>
<style scoped>
.isi {
  display: block;
  width: -webkit-fill-available;
  background-color: rgb(252, 255, 75);
}
.isi-ikon {
  color: #42b549;
}
.ikon {
  align-items: center;
  justify-content: center;
  display: flex;
}
.packing {
  padding: 20px 15px 60px 15px;
}
</style>
