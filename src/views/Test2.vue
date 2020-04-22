<template>
  <div class="tes">
    <div class="field">
      <h1>{{ percobaan }}</h1>
      <h1>{{ coba }}</h1>
      <input v-model="nama" type="text" placeholder="Nama" />

      <button class="button is-primary" @click="cobaP">
        click
      </button>
      <button class="button is-primary" @click="session">
        session get
      </button>
      <button class="button is-primary" @click="sessionSet">
        session Update
      </button>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
import * as sess from "../services/session_service";

export default {
  name: "test",

  computed: {
    // ...mapState(["coba"]),
    coba() {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return (this.percobaan = this.$store.state.notification.length);
    },
    cekData() {
      return this.coba;
    }
  },

  data() {
    return {
      percobaan: 0,
      nama: ""
    };
  },
  methods: {
    cobaP() {
      alert(localStorage.getItem("data"));

      // console.log("percobaan baaang");
    },
    session() {
      return new Promise(() => {
        sess
          .getSession()
          .then(res => {
            console.log("res :", res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    },
    sessionSet() {
      // let id = this.$store.state.profile.id;
      let data = new FormData();
      data.append("nama", this.nama);
      return new Promise(() => {
        sess
          .updateSession(data)
          .then(res => {
            console.log("res ", res);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  watch: {
    percobaan: {
      handler: function(newVal, oldVal) {
        localStorage.setItem(
          "data",
          `data Lama = ${oldVal}  data baru = ${newVal}`
        );

        // this.percobaan = newVal;
      }
    }
  }
  //   order: {
  // handler: function(newval, oldval) {
  //   this.order.forEach(p => {
  //     let masuk = p.sum_masuk == null ? 0 : parseInt(p.sum_masuk);
  //     let keluar = p.sum_keluar == null ? 0 : parseInt(p.sum_keluar);
  //     p.stok_berjalan = masuk - keluar;
  //     p.stok_akhir = parseInt(p.stok_awal) + parseInt(p.stok_berjalan);
  //   });
  // },
  // deep: true
  //   }
};
</script>
