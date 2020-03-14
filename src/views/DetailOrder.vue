<template>
  <div class="profile">
    <div class="has-text-centered">
      <div>
        <div>
          <div class="card">
            <div class="avatar-profile">
              <div class="card-image">
                <figure class="image is-480x480">
                  <img
                    class="avatar-ku"
                    :src="displayImage"
                    ref="displayAvatarImage"
                    alt="avatar"
                  />
                </figure>
              </div>
            </div>

            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-6" style="color: black">
                    {{ barang.name }}
                  </p>
                  <p class="subtitle is-7" style="color: black">
                    {{ harga }} <br />
                    Tersedia {{ barang.stok_awal }} <br />
                    {{ barang.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-5" style="color: black">
                      Isi jumlah pesanan
                    </p>
                    <div class="columns is-mobile">
                      <div class="column is-3">
                        <button
                          class="button is-info is-small is-rounded"
                          @click.prevent="kurang"
                          :disabled="kdisable"
                        >
                          <i class="fas fa-minus"></i>
                        </button>
                      </div>
                      <div class="column is-4">
                        <input
                          class="isi-kotak input is-small is-5 has-text-centered"
                          type="text"
                          v-model="jumlahPesanan"
                        />
                      </div>
                      <div class="column is-5">
                        <button
                          class="button is-info is-small is-rounded"
                          @click.prevent="tambah"
                        >
                          <i class="fas fa-plus"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      class="button is-primary is-small is-rounded"
                      @click.prevent="addToCart"
                      :disabled="disable"
                    >
                      Tambah ke kenranjang <i class="fas fa-cart-plus"></i>
                    </button>
                    <button
                      type="submit"
                      class="button is-success is-small is-rounded"
                      @click.prevent="orderNow"
                      :disabled="disable"
                    >
                      Order Sekarang
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

import * as order from "../services/order_service";
import * as cart from "../services/cart_service";
import * as prod from "../services/product_service";

export default {
  name: "Detail_Order",
  components: {
    //  Modal,
    // Footer
  },
  data() {
    return {
      jumlahPesanan: 1,
      errors: [],
      kdisable: true,
      disable: false,
      barang: {}
    };
  },

  computed: {
    ...mapState(["products", "profile"]),
    displayImage() {
      if (this.barang.image) {
        return this.barang.image;
      } else {
        console.log("computed");
        return "../img/no-image.jpg";
      }
    },
    harga() {
      if (this.barang.harga) {
        let harga = "Rp " + new Intl.NumberFormat().format(this.barang.harga);
        return harga;
      } else {
        return "data tidak ditemukan";
      }
    }
  },
  methods: {
    // getCart: async function() {
    //   let id = this.profile.id;

    //   try {
    //     const res = await cart.getChart(id);
    //     let panjang = res.data.data.data.length;
    //     if (panjang > 0) {
    //       this.$store.commit("setCart", panjang);
    //     } else {
    //       this.$store.commit("setCart", 0);
    //     }
    //     this.$router.replace({ name: "mitra" }, () => {});
    //     console.log("cart :", res);
    //     console.log("data :", panjang);
    //   } catch (e) {
    //     this.$router.replace({ name: "mitra" }, () => {});
    //     console.log(e);
    //   }
    // },
    kurang() {
      if (this.jumlahPesanan <= 2) {
        // this.jumlahPesanan = this.jumlahPesanan;
        this.kdisable = true;
        this.jumlahPesanan--;
      } else {
        this.kdisable = false;
        this.jumlahPesanan--;
      }
    },
    tambah() {
      this.jumlahPesanan++;
      if (this.jumlahPesanan > 0) {
        this.kdisable = false;
      }
    },
    addToCart: async function() {
      this.$store.commit("loading");
      const formData = new FormData();
      formData.append("user_id", this.profile.id);
      formData.append("product_id", this.barang.id);
      formData.append("harga", this.barang.harga);
      formData.append("qty", this.jumlahPesanan);

      try {
        const response = await cart.toChart(formData);
        console.log(response);
        if (response.status === 200) {
          this.$router.replace({ name: "mitra" }, () => {});
          // this.getCart();
          // this.$store.commit("setSuccessOrder", response.data); // untuk mengisi pesan di halaman sebelah
        }
        console.log(response);
      } catch (e) {
        console.log("", e);
      }
    },
    orderNow: async function() {
      this.$store.commit("loading");
      const jumlah = this.jumlahPesanan * this.barang.harga; //new Intl.NumberFormat().format(this.jumlahPesanan);
      console.log(jumlah);
      const formData = new FormData();
      formData.append("total", jumlah);
      formData.append("product_id", this.barang.id);
      formData.append("qty", this.jumlahPesanan);
      formData.append("user_id", this.profile.id);
      formData.append("harga", this.barang.harga);

      try {
        const response = await order.purchase(formData);
        console.log(response);
        if (response.status === 200) {
          this.$router.replace({ name: "berhasil" }, () => {});
          this.$store.commit("setSuccessOrder", response.data); // untuk mengisi pesan di halaman sebelah
        }

        this.more_exist = false; // kasih false biar nanti yang update value nya fungsi updated() saja
      } catch (error) {
        // this.more_exist = false; //apapun hasilnya, more exist false dulu
        console.log("" + error); // jangan lupa di hapus nanti ======================================
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },

    getProdectById: async function() {
      this.$store.commit("loading");
      let id = this.$route.params.id;
      console.log("Get By id", id);
      try {
        const response = await prod.getById(id);
        if (response.status == 200) {
          this.barang = response.data.data; // masukkan data yang di dapat ke barang
        }
        this.$store.commit("notLoading");
        console.log(this.barang);
      } catch (error) {
        console.log("", error);
      }
    }
  },
  updated() {
    console.log("Updadted");
  },
  created() {
    console.log("Mounted");
    // this.product();
    this.getProdectById();
  }
};
</script>
<style scoped>
.profile {
  padding: 3rem 0.3rem 3rem 0.3rem;
}

.kotak {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.kotak > label {
  text-align: left;
  width: 30%;
}
.kotak > input {
  width: 70%;
  /* border-color: #dbdbdb;
  border-radius: 2px;
  font-size: 0.75rem;
  clear: both;
  border: 1px solid #dbdbdb; */
}

/* Avatar */
.avatar-profile {
  padding: 0.25rem;
  overflow: hidden;
  background-color: white;
  border-radius: 5px;
}
img.avatar-ku {
  width: 100%;
  border-radius: 5px;
}
/* -=========================================================== */
.edit-avatar {
  position: absolute;
  left: 11px;
  top: 10px;
  /* text-align: center;  */
}

.edit-avatar input {
  display: none;
}
.edit-avatar label {
  display: inline-block;
  width: 100%;
  height: 34px;
  color: black;
  padding: 1px;
  background: #00ffec61;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}
.file-cta {
  display: inline-flex;
  width: 100%;
  /* height: 34px; */
  color: black;
  padding: 0px;
  background: #00ffec61;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}

.edit-avatar label:hover {
  background: grey;
  border-color: #d6d6d6;
  color: white;
}
.edit-avatar label:after {
  /* content: "\f007";
        font-family: 'Font Awesome 5 Free'; */
  color: white;
  position: absolute;
  /* top: 10px; */
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}
</style>
