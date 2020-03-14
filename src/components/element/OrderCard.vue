<template>
  <div class="order">
    <div class="card">
      <div class="card-header">
        <p>Refferensi : Capcin-{{ item.reff }}</p>
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
          <div class="column is-5">
            <p class="rata-kiri">Details</p>
            <!-- <p class="rata-kiri">{{ item.created_at }}</p> -->
          </div>
          <div class="column is-3">
            <p class="rata-kiri">Jumlah :</p>
            <p class="rata-kiri">{{ item.total }}</p>
          </div>
          <div class="column is-4">
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <button class="rata-kiri button">
              <B>{{ item.status.name }}</B>
            </button>
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
  props: { data: Object },
  data() {
    return { item: this.data };
  },
  computed: {
    status() {
      return this.item.status.name;
      // return "Selesai";
    }
  }
};
</script>
<style scoped>
.Order {
  background-color: rgb(255, 245, 153);
}
.Order > div > button {
  background-color: rgb(253, 239, 33);
}
.Produksi {
  background-color: rgb(214, 248, 160);
}
.Produksi > div > button {
  background-color: rgb(158, 253, 33);
}
.Packing {
  background-color: rgb(160, 248, 164);
}
.Packing > div > button {
  background-color: rgb(59, 253, 33);
}
.Dikirim {
  background-color: rgb(160, 195, 248);
}
.Dikirim > div > button {
  background-color: rgb(33, 209, 253);
}
.Terkirim {
  background-color: rgb(155, 253, 245);
}
.Terkirim > div > button {
  background-color: rgb(33, 121, 253);
  color: aliceblue;
}
.Selesai {
  background-color: rgb(172, 255, 155);
}
.Selesai > div > button {
  background-color: rgb(66, 230, 17);
  color: aliceblue;
}
</style>
