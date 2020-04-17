<template>
  <div class="stock">
    <div class="buttons has-addons is-fullwidth">
      <button
        :class="[
          'button',
          'is-light',
          'is-small',
          selected == 'stok' ? 'warna-tema is-selected' : ''
        ]"
        @click="stock"
      >
        Lihat Stock
      </button>
      <button
        :class="[
          'button',
          'is-light',
          'is-small',
          selected == 'lapor' ? 'warna-tema is-selected' : ''
        ]"
        @click="lapor"
      >
        Kirim hasil penjualan
      </button>
      <button
        :class="[
          'button',
          'is-light',
          'is-small',
          selected == 'stock_awal' ? 'warna-tema is-selected' : ''
        ]"
        @click="stockAwal"
      >
        Isi Stock Awal
      </button>
    </div>
    <div class="report" v-if="!newUser">
      <div class="card">
        <div v-if="report" class="card-content">
          <div class="card-header">
            Laporan Penjualan Harian
          </div>
          <div class="columns is-mobile">
            <div class="column is-5">
              <p class="subtittle is-7">
                Rasa
              </p>
            </div>
            <div class="column is-3">
              <p class="subtittle is-7">
                Terjual
              </p>
            </div>
          </div>
          <div v-for="(item, n) in items" :key="n">
            <input-laporan :item="item" @input="laporan"></input-laporan>
          </div>
          <div class="has-text-centered tombol_bawah">
            <button
              :class="['button', 'warna-tema', 'is-small', loading]"
              @click="simpanLaporan"
              :disabled="disable"
            >
              Kirimkan
            </button>
          </div>
        </div>
        <div v-else class="card-content">
          <div class="card-header">
            Stok mitra
          </div>
          <div class="columns is-mobile">
            <div class="column is-6">
              <p class="subtittle is-7">
                Rasa
              </p>
            </div>
            <div class="column is-6">
              <p class="subtittle is-7">
                Sisa stok
              </p>
            </div>
          </div>
          <div v-for="(item, n) in items" :key="n">
            <div class="columns is-mobile">
              <div class="column is-6">
                <p class="subtittle is-7">
                  <B>{{ item.bubuk.nama }}</B>
                </p>
              </div>

              <div class="column is-6">
                <p class="subtittle is-7">
                  <B> {{ item.stok_akhir }} </B>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="first" v-if="newUser">
      <div class="card">
        <div class="card-content">
          <div class="card-header">
            Isi stok awal
          </div>
          <div class="columns is-mobile">
            <div class="column is-5">
              <p class="subtittle is-7">
                Rasa
              </p>
            </div>
            <div class="column is-5">
              <p class="subtittle is-7">
                Stok Awal
              </p>
            </div>
          </div>
          <div v-for="(item, n) in items" :key="n">
            <input-bubuk :item="item" @input="isiStock"></input-bubuk>
          </div>
          <!-- <div class="has-text-centered tombol_bawah">
            <button class="button is-primary is-small " @click="removeNew">
              Simpan
            </button> 
          </div>-->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "stock",
  components: {
    "input-bubuk": () =>
      import(
        /* webpackChunkName: "input bubuk" */ "@/components/element/InputBubuk.vue"
      ),
    "input-laporan": () =>
      import(
        /* webpackChunkName: "input laporan" */ "@/components/element/InputLaporan.vue"
      )
  },
  data() {
    return {
      report: false,
      selected: "stok",
      dataLaporan: [],
      disable: false,
      loading: ""
    };
  },
  computed: {
    ...mapState("stockMitra", {
      items: state => state.items,
      bubuks: state => state.bubuks,
      newUser: state => state.newUser
    })
    // combine() {
    //   let combine;
    //   this.items.forEach(data => {
    //     let tambah = this.bubuks.filter(bubuk => {
    //       if (bubuk.id == data.bubuk_id) {
    //         return true;
    //       }
    //     });
    //     data.bubuk = tambah[0];
    //   });
    //   combine = this.items;
    //   console.log(combine);
    //   return combine;
    // }
  },
  watch: { items: { handler: "coba", deep: true } },
  methods: {
    ...mapActions("stockMitra", [
      "getItemById",
      "getAllBubuk",
      "isiStockAwal",
      "remove",
      "laporanHarian"
    ]),
    coba: function() {
      this.items.forEach(p => {
        let masuk = p.sum_masuk == null ? 0 : parseInt(p.sum_masuk);
        let keluar = p.sum_keluar == null ? 0 : parseInt(p.sum_keluar);
        p.stok_berjalan = masuk - keluar;
        p.stok_akhir = parseInt(p.stok_awal) + parseInt(p.stok_berjalan);
      });
    },
    simpanLaporan() {
      console.log("lapor", this.dataLaporan);
      if (this.dataLaporan.length == this.items.length) {
        this.loading = "is-loading";
        this.disable = true;
        this.laporanHarian(this.dataLaporan).then(res => {
          this.getItemById(this.$route.params.id);
          console.log(res);
          this.disable = false;
          this.loading = "";
        });
      } else {
        this.flashMessage.error({
          message:
            "data anda belum dilaporkan, periksa kembali laporan anda. tetap isi jumlah penjualan, jika tidak laku, isi dengan 0",
          time: 5000
        });
      }
    },
    stock() {
      this.report = false;
      this.selected = "stok";
      this.remove("");
    },
    lapor() {
      this.report = true;
      this.selected = "lapor";
      this.remove("");
    },
    stockAwal() {
      this.selected = "stock_awal";
      this.remove("ada");
      // this.$store.dispatch("stockMitra/remove", "ada");
    },
    laporan(value) {
      console.log(value);
      if (this.dataLaporan.length) {
        const oldData = this.dataLaporan.filter(data => {
          if (data.item_mitra_id == value.item_mitra_id) {
            return true;
          }
        });
        // console.log(oldData)
        if (oldData.length) {
          this.dataLaporan.forEach(data => {
            if (data.item_mitra_id == oldData[0].item_mitra_id) {
              data.keluar = value.keluar;
            }
          });
        } else {
          this.dataLaporan.push(value);
        }
      } else {
        this.dataLaporan.push(value);
      }
      // this.flashMessage.info({
      //   message: "Penjualan bubuk rasa " + value.nama + " dikirimkan",
      //   time: 3000
      // });
    },
    isiStock(value) {
      // console.log(value);
      this.flashMessage.info({
        message: "Nilai stock awal bubuk rasa " + value.nama + " telah dikirim",
        time: 3000
      });
      this.isiStockAwal(value).then(res => {
        if (res.status == 200) {
          this.getItemById(this.$route.params.id).then(() => {
            this.flashMessage.success({
              message:
                "Stock awal bubuk rasa " +
                value.nama +
                " telah berhasil di ganti",
              time: 3000
            });
          });
        }
      });
    },
    removeNew() {
      this.remove("");
    }
  },
  created() {
    this.getAllBubuk();
    this.getItemById(this.$route.params.id);
    this.flashMessage.setStrategy("multiple"); // strategy changed to multiple
    // console.log(this.$route.params.id);
  },
  destroyed() {
    console.log("Destroy", this.$route.params.id);
    this.remove("");
  }
};
</script>
<style lang="scss" scoped>
.stock {
  padding: 5px 10px 60px 10px;
}
.stock > button {
  border-radius: 8px;
}
.tombol_bawah {
  padding: 30px 5px 5px 5px;
}
.card-content {
  padding: 5px 24px;
}
</style>
