<template>
  <div class="packing-isi">
    <div class="card batas-kotak">
      <header class="card-header kepala">
        <p class="card-header-tittle has-text-centered">
          No.Reff : C-{{ data.order.reff }}
        </p>
      </header>
      <div class="card-content isinya-kartu">
        <div class="content">
          <B>Nama Product</B> <br />
          {{ data.order.detail_order_one.product.name }} <br />
        </div>
        <div class="columns is-mobile is-fullwidth has-text-centered">
          <div class="column is-4">
            <button class="button warna-tema is-small" @click="details">
              Rincian Product
            </button>
          </div>
          <div class="column is-8" v-if="data.keterangan">
            <p class="merah">
              <i>Tugas ini dibatalkan {{ data.keterangan }}</i>
            </p>
          </div>
        </div>
      </div>
      <footer class="card-footer kaki-kartu">
        <span class="title is-7" style="align-self:canter"
          >dibuat pada {{ time }}</span
        >
      </footer>
    </div>
    <!-- <p class="message-body is-primary">
      {{ data }}
    </p> -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "packing",
  props: {
    data: Object
  },
  data() {
    return { product_id: this.data.order.detail_order_one.product_id };
  },
  computed: {
    time() {
      let waktu = new Date(this.data.order.created_at);
      let bulan;
      switch (waktu.getMonth()) {
        case 0:
          bulan = "Januari";
          break;
        case 1:
          bulan = "Februari";
          break;
        case 2:
          bulan = "Maret";
          break;
        case 3:
          bulan = "April";
          break;
        case 4:
          bulan = "Mei";
          break;
        case 5:
          bulan = "Juni";
          break;
        case 6:
          bulan = "Juli";
          break;
        case 7:
          bulan = "Agustus";
          break;
        case 8:
          bulan = "September";
          break;
        case 9:
          bulan = "Oktober";
          break;
        case 10:
          bulan = "November";
          break;
        case 11:
          bulan = "Desember";
          break;

        default:
          break;
      }

      return waktu.getDate() + " " + bulan + " " + waktu.getFullYear();
    }
  },
  methods: {
    ...mapActions(["getProductById"]),
    details() {
      this.$store.commit("delDetailsProduct");
      this.$store.commit("bubuk/delBubuks");
      this.$store.commit("pack/delOrderId");
      // this.getProductById(this.product_id);
      this.$store.commit(
        "setDetailsProduct",
        this.data.order.detail_order_one.product.detail_items
      );
      this.$store.commit("bubuk/setBubuks", this.data.order.details_bubuk);
      this.$store.commit("pack/setOrderId", this.data.order_id);
      this.$router.replace(
        this.$route.query.redirect || {
          name: "detailproduk"
        },
        () => {}
      );
    },
    save() {},
    cancelPacking() {}
  }
};
</script>
<style scoped>
.column {
  padding: 0px;
}
.merah {
  color: red;
}
</style>
