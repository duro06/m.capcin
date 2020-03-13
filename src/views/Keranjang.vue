<template>
  <div class="profile">
    <div class="pengulangan" v-for="(item, n) in items" :key="n">
      <Card v-if="products.length == items.length" :anu="item" />
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
    orderNow() {},
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
        this.items.forEach(e => {
          this.product(e.product_id);
        });
      } catch (errors) {
        this.$store.commit("notLoading");
        console.log("", errors);
      }
      // }
    },
    product: async function(id) {
      this.$store.commit("loading");
      try {
        const response = await prod.getById(id);
        let data = response.data.data;
        this.$store.dispatch("productPush", data);
        console.log(data);
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
        console.log("", e);
      }
    }
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
