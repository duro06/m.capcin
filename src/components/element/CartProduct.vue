<template>
  <div class="cart">
    <div class="card">
      <div class="card-content">
        <div class="detail-items">
          <div class="columns is-mobile">
            <div class="column is-3 has-text-centered">
              <p class="title is-6" style="color: black">
                {{ item.product.name }}
              </p>
              <p class="subtitle is-7" style="color: black">
                {{ harga }}
              </p>
            </div>
            <div class="column is-4 has-text-centered">
              <p class="title is-7" style="color: black">
                Jumlah pesanan
              </p>
              <div class="title is-6" style="color: black">
                <div class="field is-grouped">
                  <!-- <div class="column is-3"> -->
                  <button
                    class="button is-primary is-small is-rounded is-outlined"
                    @click.prevent="kurang"
                    :disabled="disable"
                  >
                    <i class="fas fa-minus"></i>
                  </button>
                  <!-- </div>
                  <div class="column is-4"> -->
                  <input
                    class="isi-kotak input has-text-centered"
                    type="text"
                    v-model="pesanan"
                    @change="change"
                  />
                  <!-- </div>
                  <div class="column is-5"> -->
                  <button
                    class="button is-primary is-small is-rounded is-outlined"
                    @click.prevent="tambah"
                  >
                    <i class="fas fa-plus"></i>
                  </button>
                </div>
                <!-- </div> -->
                <!-- {{ item.qty }} -->
                <p class="title is-7">
                  sub total :
                  {{ subTotal }}
                </p>
              </div>
            </div>
            <div class="column tambah-gaya is-5 has-text-centered">
              <button @click="hapus" class="button is-danger is-outlined">
                <span class="icon is-left is-danger">
                  <i class="fas fa-trash-alt"></i>
                </span>
                <span>
                  Hapus
                </span>
              </button>
              <button
                @click.prevent="simpan"
                class="button is-success is-outlined"
                :style="{ display: kelihatan }"
              >
                <span class="icon is-left is-danger">
                  <i class="fas fa-check"></i>
                </span>
                <span>
                  simpan
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import * as c from "../../services/cart_service";
export default {
  name: "cart",
  props: { anu: Object },
  data() {
    return {
      item: this.anu,
      kelihatan: "none",
      disable: false,
      res: "",
      err: []
    };
  },
  computed: {
    ...mapState(["products", "profile"]),
    harga() {
      if (this.item.harga) {
        let harga = "Rp " + new Intl.NumberFormat().format(this.item.harga);
        return harga;
      } else {
        return 0;
      }
    },
    pesanan: {
      get() {
        let value = this.anu.qty;
        return value;
      },
      set(newValue) {
        return newValue;
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
    //persiapan async untuk simpan
    simpan: async function() {
      this.kelihatan = "none";
      this.$store.commit("loading");
      // let formData = new FormData();
      // formData.append("status_id", this.anu.id);
      // formData.append("qty ", this.anu.qty);
      // formData.append("user_id ", this.profile.id);
      try {
        this.res = await c.updateChart(this.anu.id, {
          qty: this.anu.qty
        });
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
      }
    },
    //persiapan async untuk hapus
    hapus: async function() {
      this.$store.commit("loading");
      // let formData = new FormData();
      // formData.append("id ", this.anu.id);
      // formData.append("user_id ", this.profile.id);
      try {
        this.res = await c.delChart(this.anu.id);
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
      }
    },
    // simpanN() {
    //   this.kelihatan = "none";
    //   console.log("id ", this.anu.id);
    //   console.log("qty ", this.anu.qty);
    //   console.log("user_id ", this.profile.id);
    // },
    // hapusN() {
    //   console.log("id ", this.anu.id);
    //   console.log("user_id ", this.profile.id);
    // },
    change() {
      this.kelihatan = "inherit";
    },
    kurang() {
      this.change();
      if (this.anu.qty <= 2) {
        // this.anu.qty = this.anu.qty;
        this.disable = true;
        this.anu.qty = this.anu.qty - 1;
      } else {
        this.disable = false;
        this.anu.qty = this.anu.qty - 1;
      }
    },
    tambah() {
      this.change();
      this.anu.qty = this.anu.qty + 1;
      if (this.anu.qty > 0) {
        this.disable = false;
      }
    }
  }
};
</script>
<style scoped>
.field > input {
  padding: 0px;
  height: auto;
  border-color: white;
  border-bottom-color: turquoise;
  border-width: unset;
}
.field > button {
  padding: 0px 5px;
}
/* .tambah-gaya {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
} */
.column {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
