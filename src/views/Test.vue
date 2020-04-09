<template>
  <div class="coba">
    <form action="submit">
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="ID"
            v-model="data.id"
          />
        </div>
      </div>
      <div class="field">
        <p>{{ hasil }}</p>
        <div class="control">
          <!-- <label for="input">{{ data.name }}</label> -->
          <input
            class="input is-primary"
            placeholder="Nama"
            type="text"
            v-model="data.name"
          />
        </div>
        <p>{{ order }}</p>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Harga"
            v-model="data.harga"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Stok"
            v-model="data.stok_awal"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="kuantity"
            v-model="data.qty"
          />
        </div>
      </div>
    </form>
    <button class="button is-info" type="submit" @click="submitLagi">
      httpNot
    </button>
    <button class="button is-info" type="submit" @click="kirimAgain">
      http
    </button>
    <button class="button is-info" type="submit" @click="testLoad">
      Test Load
    </button>
    <button class="button is-info" @click="write">
      Storage Write
    </button>
    <button class="button is-info" @click="read">
      Storage Read
    </button>
    <button class="button is-info" @click="readnotif">
      Read notif
    </button>
    <button class="button is-info" @click="readOrder">
      Read Order
    </button>
  </div>
</template>
<script>
import * as order from "@/services/order_service";
import * as prod from "@/services/product_service";
import * as auth from "@/services/auth_service.js";
import * as loc from "@/services/storage_service";
import * as notif from "@/services/notif_service";
import { mapState } from "vuex";
// import axios from "axios";
const axios = require("axios").default;
export default {
  name: "coba",
  data() {
    return {
      hasil: "",
      data: {
        id: "",
        name: "",
        harga: "",
        stok_awal: "",
        qty: ""
      }
    };
  },
  created() {
    console.log("Guue jalan bang");

    // this.getProdectById();
    // this.submit();
    this.submitLagi();
    // this.kirimAgain();
    // this.kirim();
  },
  computed: { ...mapState("order", { order: state => state.Order }) },
  methods: {
    readnotif() {
      this.hasil = notif.readNotif();
    },
    readOrder() {
      this.hasil = notif.read();
    },
    write() {
      loc.write(this.data.name);
      // console.log("write", this.data.name);
    },
    read() {
      this.hasil = loc.read();
      console.log("read", this.data.name);
    },
    testLoad() {
      this.$store.commit("loading");
      setTimeout(() => {
        this.$store.commit("notLoading");
      }, 5000);
    },
    submit: async function() {
      try {
        const response = await order.purchase(this.data);
        console.log(response);
      } catch (error) {
        console.log("", error);
      }
      console.log(this.data);
      this.submitLagi();
    },
    submitLagi: async function() {
      let order_id = 32;
      let params = {
        params: {
          // page: state.page,
          // per_page: state.per_page,
          q: order_id
          // sortby: state.sortBy,
          // sortbydesc: sorting
        }
      };
      try {
        const response = await order.detail(params);
        console.log(response);
      } catch (error) {
        console.log("", error);
      }
      // this.kirimAgain();
    },
    kirimAgain: function() {
      // let total = this.data.qty * this.data.harga;
      // let formData = new FormData();
      // formData.append("product_id", this.data.id);
      // formData.append("harga", this.data.harga);
      // formData.append("qty", this.data.qty);
      // formData.append("total", total);
      // formData.append("user_id", this.$store.state.profile.id);

      // formData.append("q", 32);

      let params = {
        params: {
          // page: state.page,
          // per_page: state.per_page,
          q: 32
          // sortby: state.sortBy,
          // sortbydesc: sorting
        }
      };
      axios({
        method: `get`,
        url: `http://localhost:8000/api/user/detail-orders`,
        // httpAgent
        headers: {
          Authorization: "Bearer " + auth.getAccessToken(),
          "Content-Type": "application/json"
        },
        data: params
        // isSameOrigin: true
        // Authorization: "Bearer " + auth.getAccessToken()
      })
        .then(response => {
          console.log("Res", response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    kirim() {
      this.$store
        .dispatch("retrieveOrder", this.data)
        .then(response => {
          console.log(response);
        })
        .catch(manuk => {
          console.log(manuk);
        });
    },
    getProdectById: async function() {
      let id = 3;
      console.log("Get By id", id);
      try {
        const response = await prod.getById(id);
        if (response.status == 200) {
          this.data = response.data.data;
          console.log(this.data);
        }
        console.log(this.barang);
      } catch (error) {
        console.log("", error);
      }
    }
  }
  // beforeCreate() {
  // }
};
</script>
<style lang="scss" scoped>
.coba {
  padding-top: 10px;
  padding-bottom: 60px;
}
</style>
