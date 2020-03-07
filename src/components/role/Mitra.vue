<template>
  <div>
    <div class="card">
      <div class="card-content">
        <router-link
          :to="{ path: '/order_detail/' + data.id }"
          class="detail-items"
        >
          <div class="columns is-mobile">
            <div class="column is-3 space-img">
              <img :src="productImage" alt="product" />
            </div>
            <div class="column is-5">
              <p class="rata-kiri">{{ productName }}</p>
            </div>
            <div class="column is-4">
              <p class="rata-kanan">
                <B>{{ harga }}</B>
              </p>
            </div>
          </div>
        </router-link>
      </div>
      <!-- <footer class="card-footer">
        <router-link :to="{ path: '/product_detail/' + data.id }">
          <p class="rata-kanan">
            <span> Details </span>
          </p>
        </router-link>
      </footer> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "mitra",
  props: { data: Object },
  created() {
    if (this.data) {
      return this.$store.dispatch("productPush", this.data);
    }
  },
  computed: {
    productName() {
      if (this.data.name) {
        return this.data.name;
      } else {
        return "";
      }
    },
    productImage() {
      if (this.data.image) {
        return this.data.image;
      } else {
        return "../img/no-image.jpg";
      }
    },
    harga() {
      if (this.data.harga) {
        let harga = "Rp " + new Intl.NumberFormat().format(this.data.harga);
        return harga;
      } else {
        return "";
      }
    }
  },
  methods: {
    productDetail() {
      alert(this.data.id);
    }
  }
};
</script>
<style scoped>
.card {
  border-radius: 0 15px 0 15px;
  margin-bottom: 10px;
  overflow: hidden;
}
.card-content {
  padding: 10px !important;
}
.card-footer {
  display: block !important;
  padding: 5px 10px 5px 5px;
}
.detail-items {
  font-size: 14px;
  color: black;
}
.space-img {
  padding: 0px;
}
</style>
