<template>
  <div class="supp">
    <div class="card batas-kotak">
      <div class="card-header kepala">No. Reff : C-{{ data.order.reff }}</div>
      <div class="card-content isinya-kartu">
        <p>Nama Pembeli : {{ data.order.user.name }}</p>
        <p>
          <button class="button warna-tema is-small" @click="toDetail">
            Detail Pengiriman
          </button>
        </p>
        <p class="merah" v-if="data.keterangan">
          <i>Tugas ini dibatalkan {{ data.keterangan }}</i>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "supplier",
  props: {
    data: Object
  },
  methods: {
    ...mapActions("shipping", ["setDetails"]),
    toDetail() {
      let data = {
        nama: this.data.order.user.name,
        alamat: this.data.order.user.alamat,
        tlp: this.data.order.user.tlp,
        reff: this.data.order.reff,
        product: this.data.order.detail_order_one.product.name,
        order_id: this.data.order_id
      };
      this.setDetails(data);
      this.$router.replace(
        this.$route.query.redirect || {
          name: "shipping"
        },
        () => {}
      );
    }
  }
};
</script>
<style scoped>
.supp {
  padding-bottom: 15px;
}
.merah {
  color: red;
}
</style>
