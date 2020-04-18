<template>
  <div class="ngisi">
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
      <div class="media-content">
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
      </div>
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
    DatePicker: () => import("vue2-datepicker")
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
      rangePicker: [
        { id: 1, tittle: "Hari ini" },
        { id: 2, tittle: "Bulan ini" },
        { id: 3, tittle: "Tahun ini" }
      ]
    };
  },
  methods: {
    lihatData() {
      console.log(
        "awal",
        this.tanggalAwal.getTime(),
        "Akhir",
        this.tanggalAkhir
      );
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
      } else if (this.selected == 2) {
        // BULAN INI
        this.tanggalAwal = moment().startOf("month")._d;
        this.tanggalAkhir = moment().endOf("month")._d;
      } else {
        // TAHUN INI
        this.tanggalAwal = moment().startOf("year")._d;
        this.tanggalAkhir = moment().endOf("year")._d;
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
            console.log(res);
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
</style>
