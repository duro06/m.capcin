<template>
  <div class="profile">
    <div class="isi" v-if="items.length">
      <div class="pengulangan" v-for="(item, n) in items" :key="n">
        <Card :anu="item" />
      </div>
      <div class="card-footer">
        <div class="card">
          <div class="card-content">
            <div class="columns is-mobile">
              <div class="column is-5">
                <p>
                  Jumlah harga <br />
                  {{ total }}
                </p>
              </div>
              <div class="column is-6">
                <div class="rata-kanan">
                  <button @click="orderNow" class="button is-success">
                    Pesan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="kosong" v-else><Empty /></div>
  </div>
</template>
<script>
// import { getProfile } from "@/services/auth_service";
import { mapState } from "vuex";
import * as cart from "@/services/cart_service";
import * as order from "@/services/order_service";
// import Modal from "@/components/element/Modal.vue";
import Card from "@/components/element/CartProduct";
import Empty from "@/components/element/EmptyPage";

export default {
  name: "Keranjang",
  components: {
    //  Modal,
    Card,
    Empty
  },
  data() {
    return {
      items: [],
      jumlahPesanan: 0,
      showModal: false, // modal tampil atau tidak
      errors: [],
      disable: false,
      id: null
    };
  },
  created() {
    this.getItemsbyId();
  },
  computed: {
    ...mapState(["products", "profile"]),
    total() {
      const total =
        "Rp " +
        new Intl.NumberFormat().format(
          this.items.reduce((t, me) => t + me.harga * me.qty, 0)
        );
      return total;
    }
  },
  watch: {
    // user: {
    //   immediate: true,
    //   handler() {
    //     this.getProfile();
    //   }
    // }
  },
  methods: {
    getCart: async function() {
      let id = this.profile.id;
      let params = {
        params: {
          q: id
        }
      };
      try {
        const res = await cart.getChart(params);
        let panjang = res.data.data.data.length;
        if (panjang > 0) {
          this.$store.commit("setCart", panjang);
        } else {
          this.$store.commit("setCart", 0);
        }
        // this.$router.replace({ name: "mitra" }, () => {});
        this.error = [];
      } catch (e) {
        this.error = e;
        // this.$router.replace({ name: "mitra" }, () => {});
      }
    },
    orderNow: async function() {
      this.$store.commit("loading");
      // post total sama user_id
      let total = this.items.reduce((t, me) => t + me.harga * me.qty, 0);
      const formData = new FormData();
      formData.append("total", total);
      formData.append("user_id", this.profile.id);
      try {
        const response = await order.chartOrder(formData);
        if (response.status === 200) {
          this.getCart();
          this.$router.replace({ name: "berhasil" }, () => {});
          this.$store.commit("setSuccessOrder", response.data); // untuk mengisi pesan di halaman sebelah
        }
      } catch (error) {
        this.$store.commit("notLoading");
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },
    getItemsbyId: async function() {
      this.$store.dispatch("productOut");
      this.$store.commit("loading");
      let id = this.profile.id;
      if (id) {
        this.id = id;
      } else {
        this.id = localStorage.getItem("mie");
      }
      let params = {
        params: {
          q: this.id
        }
      };
      try {
        const response = await cart.getChart(params);
        this.items = response.data.data.data;
        this.$store.commit("notLoading");
      } catch (errors) {
        this.$store.commit("notLoading");
      }
    }
    // product: async function(id) {
    //   this.$store.commit("loading");
    //   try {
    //     const response = await prod.getById(id);
    //     let data = response.data.data;
    //     this.$store.dispatch("productPush", data);
    //     console.log(data);
    //     this.$store.commit("notLoading");
    //   } catch (e) {
    //     this.$store.commit("notLoading");
    //     console.log("", e);
    //   }
    // }
  }
};
</script>
<style scoped>
.profile {
  padding: 3rem 0.3rem 3rem 0.3rem;
}

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
</style>
