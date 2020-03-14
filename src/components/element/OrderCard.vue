<template>
  <div class="order-container">
    <div class="card">
      <div class="card-header">
        <p><B>Refferensi :</B> Capcin-{{ item.reff }}</p>
      </div>
      <div class="card-content">
        <!-- <router-link
          :to="{
            name: 'order_detail',
            params: { id: this.data.id }
          }"
          class="detail-items"
        > -->
        <div :class="['columns', 'is-mobile', status]">
          <div class="column is-3">
            <p class="rata-kiri">Details</p>
            <!-- <p class="rata-kiri">{{ item.created_at }}</p> -->
          </div>
          <div class="column is-5">
            <p class="rata-kiri">Jumlah :</p>
            <p class="rata-kiri">{{ total }}</p>
          </div>
          <div class="column is-4">
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <p class="rata-kiri box">
              <B>{{ item.status.name }}</B>
            </p>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "card",
  props: { data: Object, test: Number },
  data() {
    return { item: this.data, kelas: this.test };
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
.order-container {
  padding: 5px 10px;
}
.columns {
  border-radius: 10px;
}
.Order {
  background-color: rgb(255, 245, 153);
}
.Order > div > .box {
  background-color: rgb(253, 239, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Produksi {
  background-color: rgb(214, 248, 160);
}
.Produksi > div > .box {
  background-color: rgb(158, 253, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Packing {
  background-color: rgb(160, 248, 164);
}
.Packing > div > .box {
  background-color: rgb(59, 253, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Dikirim {
  background-color: rgb(160, 195, 248);
}
.Dikirim > div > .box {
  background-color: rgb(33, 209, 253);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Terkirim {
  background-color: rgb(155, 253, 245);
}
.Terkirim > div > .box {
  background-color: rgb(33, 121, 253);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Selesai {
  background-color: rgb(172, 255, 155);
}
.Selesai > div > .box {
  background-color: rgb(66, 230, 17);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
</style>
