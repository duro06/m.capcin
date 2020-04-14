<template>
  <div class="supp">
    <div class="card">
      <div class="card-header">No. Reff : {{ data.order.reff }}</div>
      <div class="card-content">
        <p>Nama Pembeli : {{ data.order.user.name }}</p>
        <p>
          <button class="button is-info is-small" @click="toDetail">
            Detail Pengiriman
          </button>
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
        alamat: "alamat",
        reff: this.data.order.reff,
        product: this.data.order.detail_order_one.product.name
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
</style>
