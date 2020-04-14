<template>
  <div class="detail-product">
    <div class="isi">
      <div class="card">
        <div class="card-header"></div>
        <div class="card-content">
          <div class="columns is-mobile ">
            <div class="column is-7">Nama Item</div>
            <div class="column is-5">Jumlah</div>
          </div>
          <div v-for="(product, n) in products" :key="n">
            <div class="columns is-mobile ">
              <div class="column is-7">{{ product.item.nama }}</div>
              <div class="column is-5">
                {{ product.qty }} {{ product.item.unit.nama }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="navbar is-fixed-bottom-touch is-hidden-desktop">
      <div class="container">
        <div class="navbar-brand level is-mobile">
          <div
            class="btn_nav_item
              level-item
              has-text-centered"
          >
            <button class="button is-success is-small" @click="save">
              Selesai
            </button>
          </div>
          <div
            class="btn_nav_item
              level-item
              has-text-centered"
          >
            <button class="button is-danger is-small" @click="cancelPacking">
              Batalkan Tugas
            </button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "detailProduct",
  computed: {
    ...mapState({ products: state => state.productDetails })
  },
  methods: {
    save() {},
    cancelPacking() {}
  }
};
</script>
<style scoped>
.navbar-brand {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  height: 60px;
  box-shadow: 0 -2px 1px -2px #333;
  background-color: #fff;
}
.isi {
  padding-bottom: 60px;
}
</style>
