<template>
  <div class="ngisi">
    <!-- ==========input tanggal========= -->
    <div class="card">
      <div class="media-content">
        <div class="columns is-mobile is-fullwidth">
          <div class="column is-6">
            <select
              v-model="selected"
              @change="pilihRange"
              class="input form-control"
            >
              <option value="">Pilih Periode</option>
              <option
                v-for="(range, index) in rangePicker"
                :key="index"
                :value="range.id"
                >{{ range.tittle }}</option
              >
            </select>
            <select
              v-if="selected == 3"
              v-model="minggu"
              @change="pilihRange"
              class="input form-control"
            >
              <option>Pilih minggu</option>
              <option
                v-for="(range, index) in weeks"
                :key="index"
                :value="range + 1"
                placeholder="Pilih minggu"
                >minggu ke {{ range + 1 }}
              </option>
            </select>
          </div>
          <div class="column is-6">
            <button
              class="button is-info is-small is-rounded"
              @click="lihatData"
            >
              <i class="fa fa-eye"></i> Lihat data
            </button>
          </div>
        </div>
      </div>
      <!-- <div class="media-content">
        <div class="columns is-mobile is-fullwidth">
          <div class="column is-6">
            <date-picker
              class="is-small tanggal"
              v-model="tanggalAwal"
              lang="en"
              type="date"
              placeholder="Tanggal Awal"
              :format="momentFormat"
            ></date-picker>
          </div>
          <div class="column is-6">
            <date-picker
              class="is-small tanggal"
              v-model="tanggalAkhir"
              lang="en"
              type="date"
              placeholder="Tanggal Akhir"
              :format="momentFormat"
            ></date-picker>
          </div>
        </div>
      </div> -->
    </div>
    <!-- ==== tapilkan data penjualan ==== -->
    <p class="subtittle is-7" v-if="tanggalAwal">
      periode laporan minggu ke-{{ minggu }} dari tanggal
      <I>{{ formatDate(tanggalAwal) }} </I> sampai
      <I> {{ formatDate(tanggalAkhir) }}</I>
    </p>
    <div class="card" v-if="dataLaporan.length">
      <h1>
        <B> Total penjualan : {{ total_jumlah }} cup </B>
      </h1>
      <!-- <div class="card media-content">
        <div class="columns is-mobile is-fullwidth">
          <div class="column is-4"><B>Item</B></div>
          <div class="column is-5"><B>Tanggal</B></div>
          <div class="column is-3"><B>Jumlah</B></div>
        </div>
      </div> -->

      <div class="card  media-content">
        <div
          class="columns kartu is-fullwidth"
          v-for="(data, n) in dataLaporan"
          :key="n"
          :class="n % 2 == 0 ? 'genap' : 'ganjil'"
        >
          <div class="">
            <div class="column is-4 tengah has-text-centered">
              {{ data.bubuk.nama }}
            </div>
            <div class="column is-8">
              <div
                v-for="(detail, i) in data.details_stok"
                :key="i"
                class="columns is-mobile"
                :class="i % 2 == 0 ? 'even' : 'odd'"
              >
                <div class="column is-8">
                  <i class="title is-7" style="padding-left: 5px;"
                    >{{ formatDate(detail.created_at) }}
                  </i>
                </div>
                <div class="column is-4">
                  {{ detail.keluar }}
                  <span class="subtitle is-7"> <i>cup</i> </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card" v-if="!dataLaporan.length && afterSubmit">
      Mohon maaf tidak ada data laporan anda untuk periode ini
    </div>
  </div>
</template>
<script>
import * as auth from "../services/auth_service";
import { http } from "../services/http_service";
import "vue2-datepicker/index.css";
import moment from "moment";
export default {
  name: "mitra-penjualan",
  components: {
    // DatePicker: () => import("vue2-datepicker")
  },
  data() {
    return {
      tanggalAwal: null,
      tanggalAkhir: null,
      momentFormat: {
        stringify: date => {
          return date ? moment(date).format("D MMMM YYYY") : "";
        },
        parse: value => {
          return value ? moment(value, "D MMMM YYYY").toDate() : null;
        }
      },
      selected: "",
      minggu: 1,
      rangePicker: [
        { id: 1, tittle: "Hari ini" },
        { id: 2, tittle: "Minggu ini" },
        { id: 3, tittle: "pilih berdasarkan minggu" }
      ],
      dataLaporan: [],
      detailLaporan: [],
      dateLength: [],
      tahun: 2015,
      afterSubmit: false
    };
  },
  computed: {
    total_jumlah() {
      return this.dataLaporan.reduce(function(sum, val) {
        let keluar = val.sum_keluar == null ? 0 : parseInt(val.sum_keluar);
        let total = sum + keluar;
        return total;
      }, 0);
    },
    weeks() {
      return Array.from(Array(moment().weeksInYear()).keys());
    },
    week() {
      return moment().weeksInYear();
    }
  },
  methods: {
    formatDate(value) {
      return moment(value).format("D MMMM, YYYY");
    },
    lihatData() {
      if (this.tanggalAwal != null && this.tanggalAkhir != null) {
        if (this.tanggalAwal.getTime() < this.tanggalAkhir.getTime()) {
          this.ambilLaporan();
        } else alert("Tanggal Akhir harus lebih akhir dari Tanggal Awal");
      } else alert("pilih periode tanggal terlebih dahulu");
    },
    pilihRange() {
      if (this.selected == 1) {
        // HARI INI
        this.tanggalAwal = moment()._d;
        this.tanggalAkhir = moment()._d;
        this.minggu = moment().week();
      } else if (this.selected == 2) {
        // minngu INI
        this.tanggalAwal = moment().startOf("week")._d;
        this.tanggalAkhir = moment().endOf("week")._d;
        this.minggu = moment().week();
        console.log("awal", this.tanggalAwal, "akhir", this.tanggalAkhir);
      } else {
        // pilih minggu
        if (this.minggu) {
          this.tanggalAwal = moment()
            .week(this.minggu)
            .day(0)
            .hours(0)
            .minutes(0)
            .seconds(0)
            .milliseconds(0)._d;
          this.tanggalAkhir = moment()
            .week(this.minggu)
            .day(6)
            .hours(23)
            .minutes(59)
            .seconds(59)
            .milliseconds(999)._d;
        }
        // this.tanggalAkhir = moment().isoWeeksInYear(2015);
        // let data = Array.from(Array(moment().isoWeeksInYear(2015)).keys());
        // let minggu;
        // data.forEach(e => {
        //   console.log(e)
        //   const satu = "Minggu ke - " + e;
        //   minggu.push({ [satu]: e });
        // });
        console.log(
          "awal",
          moment().weeksInYear(),
          "akhir",
          this.minggu
          // "minggu",
          // minggu
        );
      }
    },
    ambilLaporan() {
      let params = {
        params: {
          user_id: auth.getUserId(),
          tgl_awal: moment(this.tanggalAwal).format("YYYY-MM-DD"),
          tgl_akhir: moment(this.tanggalAkhir).format("YYYY-MM-DD")
        }
      };
      console.log(params);
      return new Promise(() => {
        http()
          .get(`admin/mitra-laporan-penjualan`, params)
          .then(res => {
            if (res.status == 200) {
              console.log(res);
              this.afterSubmit = true;
              this.dataLaporan = res.data.data;
              this.dataLaporan.forEach(data => {
                let name = data.bubuk.nama;
                data.details_stok.forEach(stock => {
                  let value = { details: stock, nama: name };
                  this.detailLaporan.push(value);
                });
              });
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.tanggal {
  width: 95%;
}
.tengah {
  align-self: center;
}
.odd {
  background-color: rgb(179, 177, 177);
}
.even {
  background-color: aliceblue;
}
.ganjil {
  background-color: rgb(132, 255, 159);
}
.genap {
  background-color: bisque;
}
.kartu {
  padding-top: 0.5rem;
  padding-bottom: 1.5rem;
  border-radius: 1.5rem;
}
</style>
