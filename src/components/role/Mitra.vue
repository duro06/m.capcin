<template>
  <div>
    <div class="card">
      <div class="card-content">
        <router-link to="/detailPemesanan">
          <div class="columns is-mobile">
            <div class="column is-3">
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
      <footer class="card-footer">
        <router-link to="/detailProduct">
          <p class="rata-kanan">
            <span> Details </span>
          </p>
        </router-link>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "mitra",
  props: { data: Object },
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
  }
};
</script>
<style scoped>
.card {
  border-radius: 0 12px 0 12px;
}
.card-content {
  padding: 10px !important;
}
.card-footer {
  display: block !important;
  padding: 5px 10px 5px 5px;
}
.item-product {
  font-size: 1.3rem;
  font-weight: bold;
}
</style>
