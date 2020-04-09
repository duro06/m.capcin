<template>
  <div class="tes">
    <div class="field">
      <h1>{{ percobaan }}</h1>
      <h1>{{ coba }}</h1>
      <button class="button is-primary" @click="cobaP">
        click
      </button>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";

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
      percobaan: 0
    };
  },
  methods: {
    cobaP() {
      alert(localStorage.getItem("data"));

      // console.log("percobaan baaang");
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
