<template>
  <div class="coba">
    <form action="submit">
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.satu"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.dua"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.tiga"
          />
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            class="input is-primary"
            type="text"
            placeholder="Primary input"
            v-model="data.empat"
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
        satu: 1111111,
        dua: 2222222,
        tiga: 3333333,
        empat: 4444444
      }
    };
  },
  created() {
    console.log("Guue jalan bang");
    // this.submit();
    // this.submitLagi();
    this.kirimAgain();
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
      axios({
        method: `post`,
        url: `http://localhost:8000/api/user/mitra-ordered`,
        // httpAgent
        headers: {
          Authorization: "Bearer " + auth.getAccessToken()
        },
        // isSameOrigin: true
        Authorization: "Bearer " + auth.getAccessToken()
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
    }
  }
};
</script>
