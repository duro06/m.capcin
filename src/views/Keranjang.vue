<template>
  <div class="profile">
    <div class="pengulangan" v-for="(item, n) in items" :key="n">
      <Card v-if="items.length" :anu="item" />
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
</template>
<script>
// import { getProfile } from "../services/auth_service";
import { mapState } from "vuex";
import * as prod from "../services/product_service";
// import Modal from "../components/element/Modal.vue";
import Card from "../components/element/CartProduct";

export default {
  name: "Keranjang",
  components: {
    //  Modal,
    Card
  },
  data() {
    return {
      items: [],
      jumlahPesanan: 0,
      showModal: false, // modal tampil atau tidak
      errors: [],
      disable: false
    };
  },
  created() {
    this.getItemsbyId();
  },
  mounted() {
    console.log("items ", this.items);
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
    orderNow: async function() {
      // post total sama user_id
      let total = this.items.reduce((t, me) => t + me.harga * me.qty, 0);
      console.log("total", total);
      console.log("user_id", this.profile.id);
      const formData = new FormData();
      formData.append("total", total);
      formData.append("user_id", this.profile.id);
      try {
        const response = await prod.chartOrder(formData);
        console.log(response);
        if (response.status === 200) {
          this.$router.replace({ name: "berhasil" }, () => {});
          this.$store.commit("setSuccessOrder", response.data); // untuk mengisi pesan di halaman sebelah
        }
      } catch (error) {
        // this.more_exist = false; //apapun hasilnya, more exist false dulu
        console.log("" + error); // jangan lupa di hapus nanti ======================================
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },
    getItemsbyId: async function() {
      this.$store.dispatch("productOut");
      this.$store.commit("loading");
      console.log("ID saya sepertinya telat pak kalo di refresh");
      // if (this.profile.id) {
      let id = this.profile.id;
      try {
        const response = await prod.getChart(id);
        this.items = response.data.data.data;
        this.$store.commit("notLoading");
        console.log(this.items);
      } catch (errors) {
        this.$store.commit("notLoading");
        console.log("", errors);
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
