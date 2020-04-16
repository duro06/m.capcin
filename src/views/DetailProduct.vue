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
              <div class="column is-7">
                {{ product.item.nama }}
                <!-- <span v-if="product.item.nama == 'Bubuk'">
                  <button
                    class="button is-info is-small kecil is-rounded"
                    @click="detailBubuk"
                  >
                    Detail
                  </button></span
                > -->
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
            <button class="button is-success is-small is-rounded" @click="save">
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
export default {
  name: "detailProduct",
  components: {
    Modal: () =>
      import(/* webpackChunkName: "modal" */ "@/components/element/Modal.vue")
  },
  data() {
    return {
      showModal: false,
      keterangan: ""
    };
  },
  computed: {
    ...mapState({ products: state => state.productDetails })
  },
  methods: {
    save() {},
    cancelPacking() {
      this.showModal = true;
    },
    handleModal() {
      this.showModal = false;
    },
    submit() {},
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
</style>
