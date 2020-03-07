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

    <Footer class="navbar" />
  </div>
</template>
<script>
// import { getProfile } from "../services/auth_service";
import { mapState } from "vuex";
// import * as auth from "../services/auth_service";
// import Modal from "../components/element/Modal.vue";
import Footer from "../components/element/bulmaFooter";

import * as prod from "../services/product_service.js";
export default {
  name: "Detail_Order",
  components: {
    //  Modal,
    Footer
  },
  data() {
    return {
      jumlahPesanan: 1,
      showModal: false, // modal tampil atau tidak
      errors: [],
      kdisable: true,
      disable: false,
      barang: ""
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
  watch: {
    // user: {
    //   immediate: true,
    //   handler() {
    //     this.getProfile();
    //   }
    // }
    // imageName: {
    //   immediate: true,
    //   handler() {
    //     this.pickFile();
    //   }
    // }
  },
  methods: {
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
    addToCart() {
      let order = {
        order: {
          product: this.barang.id,
          qty: this.jumlahPesanan,
          user: this.profile.id
        }
      };
      console.log(order);
      // localStorage.setItem("order", order);
    },
    orderNow: async function() {
      let jumlah = this.jumlahPesanan * this.barang.harga; //new Intl.NumberFormat().format(this.jumlahPesanan);
      let order = new FormData();

      order.append("total", jumlah);
      order.append("product_id", this.barang.id);
      order.append("qty", this.jumlahPesanan);
      order.append("user_id", this.profile.id);
      order.append("harga", this.barang.harga);

      console.log(order);
      try {
        const response = await prod.purchase(order);
        console.log(response);
        // let getData = response.data.data; // masukkan data response ke getData
        // this.products = getData.data; //ambil data yang dibutuhkan
        // this.$store.dispatch("productIn", getData.data); // masukkan data ke state
        // this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        // this.totaldata = getData.total; // input parameter, ada berapa total data yang ada
        // this.last_page = getData.last_page; // input paramaeter halaman teraksir

        this.loading = ""; // loadng spinner berhenti
        // console.log(this.products); // nanti janagan lupa ini dihapus =============================
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
    product() {
      // alert("product");
      // let product;
      const id = new Intl.NumberFormat().format(this.$route.params.id);
      console.log("route : ", this.$route.params.id);
      console.log("id : ", id);
      for (let index = 0; index < this.products.length; index++) {
        if (this.products[index].id == id) {
          console.log("products : ", this.products[index]);
          this.barang = this.products[index];
          // return this.products[index];
        }
        // console.log("product : ", product);
        // return product;
      }
    }
  },
  updated() {
    console.log("Updadted");
  },
  mounted() {
    console.log("Mounted");
    this.product();
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
