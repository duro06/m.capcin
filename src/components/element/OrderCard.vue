<template>
  <div class="order-container">
    <div class="card">
      <div class="card-header zoomIn">
        <p><B>Refferensi :</B> Capcin-{{ item.reff }}</p>
      </div>
      <div class="card-content">
        <div :class="['columns', 'is-mobile', status]">
          <div class="column is-5 zoomIn">
            <p class="rata-kiri">Harga :</p>
            <p class="rata-kiri">{{ total }}</p>
          </div>
          <div class="column is-7 zoomIn">
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <p class="rata-kiri box has-text-centered">
              <B>{{ item.status.name }}</B>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import * as ord from "@/services/order_service";
// require("../../echo.js");

export default {
  name: "card",
  props: { data: Object, detail: Array },
  data() {
    return {
      item: this.data,
      details: this.detail,
      dataDetails: [],
      kelihatan: "none",
      isDisplay: false,
      loading: false
    };
  },
  computed: {
    status() {
      return this.item.status.name;
    },
    total() {
      let sub = "Rp " + new Intl.NumberFormat().format(this.item.total);
      return sub;
    }
  },
  methods: {}
};
</script>
<style scoped>
.transparent {
  background-color: transparent;
  border-color: transparent;
}
.isi-kartu {
  padding: 0px 24px;
}
.order-container {
  padding: 5px 10px;
}
.columns {
  border-radius: 10px;
}
.Order {
  background-color: rgb(255, 255, 150);
}
.Order > div > .box {
  background-color: rgb(255, 255, 50);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Produksi {
  background-color: rgb(155, 255, 150);
}
.Produksi > div > .box {
  background-color: rgb(105, 255, 50);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Packing {
  background-color: rgb(100, 250, 180);
}
.Packing > div > .box {
  background-color: rgb(50, 250, 100);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Dikirim {
  background-color: rgb(150, 255, 205);
}
.Dikirim > div > .box {
  background-color: rgb(50, 250, 255);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Terkirim {
  background-color: rgb(155, 182, 255);
}
.Terkirim > div > .box {
  background-color: rgb(62, 130, 255);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Selesai {
  background-color: rgb(255, 158, 158);
}
.Selesai > div > .box {
  background-color: rgb(255, 79, 79);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
</style>
