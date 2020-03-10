<template>
  <div class="coba">
    <form action="submit">
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.id"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.name"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.harga"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.stok_awal"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.qty"
          />
        </div>
      </div>
    </form>
    <button class="button is-info" type="submit" @click="submit">
      httpNot
    </button>
    <button class="button is-info" type="submit" @click="kirimAgain">
      http
    </button>
  </div>
</template>
<script>
import * as prod from "../services/product_service.js";
import * as auth from "../services/auth_service.js";
// import axios from "axios";
const axios = require("axios").default;
export default {
  name: "coba",
  data() {
    return {
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

    this.getProdectById();
    // this.submit();
    // this.submitLagi();
    // this.kirimAgain();
    // this.kirim();
  },
  methods: {
    submit: async function() {
      try {
        const response = await prod.purchase(this.data);
        console.log(response);
      } catch (error) {
        console.log("", error);
      }
      console.log(this.data);
      this.submitLagi();
    },
    submitLagi: async function() {
      try {
        const response = await prod.beli(this.data);
        console.log(response);
      } catch (error) {
        console.log("", error);
      }
      this.kirimAgain();
    },
    kirimAgain: function() {
      let total = this.data.qty * this.data.harga;
      let formData = new FormData();
      formData.append("product_id", this.data.id);
      formData.append("harga", this.data.harga);
      formData.append("qty", this.data.qty);
      formData.append("total", total);
      formData.append("user_id", this.$store.state.profile.id);

      axios({
        method: `post`,
        url: `http://localhost:8000/api/user/orders`,
        // httpAgent
        headers: {
          Authorization: "Bearer " + auth.getAccessToken()
        },
        data: formData
        // isSameOrigin: true
        // Authorization: "Bearer " + auth.getAccessToken()
      })
        .then(response => {
          console.log(response);
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
