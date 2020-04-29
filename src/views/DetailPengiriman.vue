<template>
  <div class="shiping-details">
    <div class="card" v-if="data.reff">
      <div class="card-header warna-tema">
        <h1><B>Produk untuk di kirimkan</B></h1>
      </div>
      <div class="card-content isinya-kartu">
        <p class="pake-margin">No Reff: C-{{ data.reff }}</p>
        <p class="pake-margin">Penerima : {{ data.nama }}</p>

        <p class="pake-margin">product yang dikirimkan : {{ data.product }}</p>

        <p>Alamat:</p>
        <p class="alamat">
          <i>{{ data.alamat }}</i>
        </p>
      </div>
    </div>
    <div v-else>
      <p class="has-text-centered kosong">Belum ada detail tugas</p>
    </div>
    <nav
      class="navbar is-fixed-bottom-touch is-hidden-desktop"
      v-if="data.reff"
    >
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
              @click="cancelShipping"
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
  name: "shipping",
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
    ...mapState("shipping", { data: state => state.detail })
  },
  methods: {
    save() {
      this.disable = true;
      let data = new FormData();
      data.append("order_id", this.data.order_id);
      data.append("status", 1);
      return new Promise(() => {
        http()
          .post(`admin/supplier_selesai`, data)
          .then(() => {
            this.disable = false;
            this.flashMessage.success({
              message: "Pengiriman selesai.", // kirim flash Message
              time: 5000
            });
            this.$store.commit("shipping/delDetail");
            this.$router.push({ name: "supplier" }, () => {});
          })
          .catch(err => {
            this.$router.push({ name: "supplier" }, () => {});
            this.disable = false;
            this.flashMessage.error({
              message: "Gagal. Silahkan hubungi admin " + err, // kirim flash Message
              time: 5000
            });
            // console.log(err);
          });
      });
    },
    cancelShipping() {
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
      data.append("order_id", this.data.order_id);
      data.append("status", 2);
      data.append("keterangan", alasan);
      console.log(this.keterangan);
      return new Promise(() => {
        http()
          .post(`admin/supplier_batal`, data)
          .then(() => {
            this.$router.push({ name: "supplier" }, () => {});
            this.disable = false;
            // console.log(res);
            this.keterangan = "";
            this.showModal = false;
            this.flashMessage.success({
              message: "Pengiriman dibatalkan.", // kirim flash Message
              time: 5000
            });
            this.$store.commit("shipping/delDetail");
          })
          .catch(err => {
            this.$router.push({ name: "supplier" }, () => {});

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
    }
  }
};
</script>
<style lang="scss" scoped>
.sipping-details {
  padding-bottom: 60px;
}
.card {
  h1 {
    margin: 1rem;
  }
}
.pake-margin {
  margin-bottom: 0.5rem;
}
.alamat {
  font-weight: 600;
  padding-left: 1.5rem;
}
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
.kosong {
  padding: 30px;
  background-color: wheat;
}
</style>
