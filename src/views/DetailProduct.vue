<template>
  <div class="detail-product">
    <div class="isi">
      <div class="card">
        <div class="card-header">
          <h1><B>Produk untuk di packing</B></h1>
        </div>
        <div class="card-content bubuk" v-if="bubuks.length">
          <div class="columns is-mobile ">
            <div class="column is-7">Nama Item</div>
            <div class="column is-5">Jumlah</div>
          </div>
          <div
            v-for="(product, n) in bubuks"
            :key="n"
            :class="n % 2 == 0 ? 'even' : 'odd'"
          >
            <div class="columns is-mobile ">
              <div class="column is-7">
                {{ product.bubuk.nama }}
              </div>
              <div class="column is-5">{{ product.qty }} bks</div>
            </div>
          </div>
        </div>
        <div class="card-content produk">
          <div class="columns is-mobile ">
            <div class="column is-7">Nama Item</div>
            <div class="column is-5">Jumlah</div>
          </div>
          <div
            v-for="(product, n) in products"
            :key="n"
            :class="n % 2 == 0 ? 'even' : 'odd'"
          >
            <div class="columns is-mobile ">
              <div class="column is-7">
                {{ product.item.nama }}
              </div>
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
            <button
              class="button is-success is-small is-rounded"
              @click="save"
              :disabled="disable"
            >
              Selesai
            </button>
          </div>
          <div
            class="btn_nav_item
              level-item
              has-text-centered"
          >
            <button
              class="button is-danger is-small is-rounded"
              @click="cancelPacking"
            >
              Batalkan Tugas
            </button>
          </div>
        </div>
      </div>
    </nav>
    <Modal v-if="showModal" @close="handleModal">
      <header slot="header" class="modal-card-head">
        <p class="modal-card-title ">
          Alasan Pembatalan
        </p>
      </header>
      <section slot="body" class="modal-card-body ">
        <div class="field">
          <div class="control">
            <textarea
              class="textarea is-small is-info"
              placeholder="Keterangan"
              rows="3"
              v-model="keterangan"
            ></textarea>
          </div>
        </div>
      </section>
      <footer slot="footer" class="modal-card-foot ">
        <button
          class="button is-success is-small is-rounded"
          @click.prevent="submit"
          :disabled="disable"
        >
          Kirimkan
        </button>
        <button class="button is-small is-rounded" @click.prevent="handleModal">
          Batal
        </button>
      </footer>
    </Modal>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { http } from "../services/http_service";
export default {
  name: "detailProduct",
  components: {
    Modal: () =>
      import(/* webpackChunkName: "modal" */ "@/components/element/Modal.vue")
  },
  data() {
    return {
      showModal: false,
      keterangan: "",
      disable: false
    };
  },
  computed: {
    ...mapState({
      products: state => state.productDetails,
      bubuks: state => state.bubuk.bubuks,
      order_id: state => state.pack.orderId
    })
  },
  methods: {
    save() {
      this.disable = true;
      let data = new FormData();
      data.append("order_id", this.order_id);
      data.append("status", 1);
      return new Promise(() => {
        http()
          .post(`admin/packing_selesai`, data)
          .then(() => {
            this.disable = false;
            this.flashMessage.success({
              message: "Packing selesai.", // kirim flash Message
              time: 5000
            });
            this.$store.commit("delDetailsProduct");
            this.$store.commit("bubuk/delBubuks");
            this.$store.commit("pack/delOrderId");
            this.$store.dispatch("pack/getPackingOrder");
            this.$router.push({ name: "packing" }, () => {});
          })
          .catch(err => {
            this.disable = false;
            this.$router.push({ name: "packing" }, () => {});
            this.flashMessage.error({
              message: "Gagal. Silahkan hubungi admin " + err, // kirim flash Message
              time: 5000
            });
            // console.log(err);
          });
      });
    },
    cancelPacking() {
      this.showModal = true;
    },
    handleModal() {
      this.showModal = false;
    },
    submit() {
      this.disable = true;
      let alasan =
        "oleh " +
        this.$store.state.profile.name +
        " dengan alasan " +
        this.keterangan;
      let data = new FormData();
      data.append("order_id", this.order_id);
      data.append("status", 2);
      data.append("keterangan", alasan);
      // console.log(this.keterangan);
      return new Promise(() => {
        http()
          .post(`admin/packing_batal`, data)
          .then(() => {
            this.disable = false;
            // console.log(res);
            this.keterangan = "";
            this.showModal = false;
            this.flashMessage.success({
              message: "Packing dibatalkan.", // kirim flash Message
              time: 5000
            });
            this.$store.commit("delDetailsProduct");
            this.$store.commit("bubuk/delBubuks");
            this.$store.commit("pack/delOrderId");
            this.$store.dispatch("pack/getPackingOrder");
            this.$router.push({ name: "packing" }, () => {});
          })
          .catch(err => {
            this.$router.push({ name: "packing" }, () => {});
            this.disable = false;
            this.flashMessage.error({
              message: "Gagal. Silahkan hubungi admin " + err, // kirim flash Message
              time: 5000
            });
            // console.log(err);
            this.keterangan = "";
            this.showModal = false;
          });
      });
    },
    detailBubuk() {
      console.log("detail bubuk");
    }
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
.kecil {
  padding-bottom: 0;
  padding-top: 0;
  height: 20px;
  margin-top: 3px;
}
.bubuk {
  box-shadow: 0px 0px 10px 1px coral;
  padding: 14px;
  margin: 15px;
}
.produk {
  box-shadow: 0px 0px 10px 1px greenyellow;
  padding: 14px;
  margin: 15px;
}
.even {
  background-color: rgba(120, 248, 248, 0.89);
}
.odd {
  background-color: rgba(106, 255, 113, 0.89);
}
</style>
