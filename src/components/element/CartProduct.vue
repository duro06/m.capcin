<template>
  <div class="cart">
    <div class="card">
      <div class="card-content">
        <div class="detail-items">
          <div class="columns is-mobile">
            <div class="column is-3 has-text-centered">
              <p class="title is-6" style="color: black">
                {{ nama }}
              </p>
              <p class="subtitle is-7" style="color: black">
                {{ harga }}
              </p>
            </div>
            <div class="column is-4 has-text-centered">
              <p class="title is-7" style="color: black">
                Jumlah pesanan
              </p>
              <p class="title is-6" style="color: black">
                {{ item.qty }}
              </p>
            </div>
            <div class="column is-5 has-text-centered">
              <button class="button is-danger is-outlined">
                <span class="icon is-left is-danger">
                  <i class="fas fa-trash-alt"></i>
                </span>
                <span>
                  Hapus
                </span>
              </button>
              <p>
                sub total
              </p>
              <p>
                {{ subTotal }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "cart",
  props: { anu: Object },
  data() {
    return {
      item: this.anu,
      // jumlahPesanan: this.item.qty,

      disable: false
    };
  },
  computed: {
    ...mapState(["products"]),
    harga() {
      if (this.item.harga) {
        let harga = "Rp " + new Intl.NumberFormat().format(this.item.harga);
        return harga;
      } else {
        return 0;
      }
    },
    nama() {
      if (this.item.product_id && this.products) {
        console.log("Products ", this.products);
        const barang = this.products.filter(e => e.id === this.item.product_id);
        console.log("Barang ", barang);
        console.log("Product id ", this.item.product_id);
        return barang[0].name;
      } else {
        return "data tidak ditemukan";
      }
    },
    subTotal() {
      if (this.item.harga && this.item.qty) {
        let sub =
          "Rp " +
          new Intl.NumberFormat().format(this.item.harga * this.item.qty);
        return sub;
      } else {
        return 0;
      }
    }
  },
  methods: {
    kurang() {
      if (this.jumlahPesanan <= 2) {
        // this.jumlahPesanan = this.jumlahPesanan;
        this.disable = true;
        this.jumlahPesanan--;
      } else {
        this.disable = false;
        this.jumlahPesanan--;
      }
    },
    tambah() {
      this.jumlahPesanan++;
      if (this.jumlahPesanan > 0) {
        this.disable = false;
      }
    }
  }
};
</script>
