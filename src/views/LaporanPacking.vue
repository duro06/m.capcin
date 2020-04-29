<template>
  <div class="pack-order">
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
    </div>
    <!-- ==== tapilkan data penjualan ==== -->
    <p class="subtittle is-7" v-if="tanggalAwal">
      periode laporan minggu ke-{{ minggu }} dari tanggal
      <I>{{ formatDate(tanggalAwal) }} </I> sampai
      <I> {{ formatDate(tanggalAkhir) }}</I>
    </p>
    <div class="card" v-if="dataLaporan.length">
      <div class="card  media-content">
        <div
          class=" kartu is-fullwidth"
          v-for="(data, n) in dataLaporan"
          :key="n"
          :class="n % 2 == 0 ? 'genap' : 'ganjil'"
        >
          <p class="judul is-7">Referensi: C-{{ data.order.reff }}</p>
          <p class="sub-judul is-7">
            <i>
              Pada {{ formatDate(data.created_at) }} <br />
              Lama Proses
              <b> {{ perbedaan(data.created_at, data.updated_at) }} </b>
            </i>
          </p>
          <p class="sub-judul is-7"></p>
        </div>
      </div>
    </div>
    <div class="card" v-if="!dataLaporan.length && afterSubmit">
      Mohon maaf tidak ada data laporan anda untuk periode ini
    </div>
  </div>
</template>
<script>
import moment from "moment";
import * as auth from "../services/auth_service";
import { http } from "../services/http_service";

export default {
  name: "packreport",

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
    perbedaan(from, to) {
      moment.locale("id");
      let durations = moment.duration(moment(to).diff(moment(from))).humanize();
      return durations;
      // return moment(to).diff(moment(from), "hours");
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
        this.tanggalAwal = moment().startOf("day")._d;
        this.tanggalAkhir = moment().endOf("day")._d;
        this.minggu = moment().week();
      } else if (this.selected == 2) {
        // minngu INI
        this.tanggalAwal = moment().startOf("week")._d;
        this.tanggalAkhir = moment().endOf("week")._d;
        this.minggu = moment().week();
        // console.log("awal", this.tanggalAwal, "akhir", this.tanggalAkhir);
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
          .get(`admin/laporan-packing`, params)
          .then(res => {
            if (res.status == 200) {
              console.log(res);
              this.afterSubmit = true;
              this.dataLaporan = res.data.data;
              // this.dataLaporan.forEach(data => {
              //   let name = data.bubuk.nama;
              //   data.details_stok.forEach(stock => {
              //     let value = { details: stock, nama: name };
              //     this.detailLaporan.push(value);
              //   });
              // });
            }
          })
          .catch(err => {
            this.flashMessage.error({
              message: err + " Terjadi kesalahan, mohon refresh halaman",
              time: 5000
            });
            // console.log(err);
          });
      });
    }
  }
};
</script>
<style scoped>
.pack-order {
  margin: 15px 15px 60px 15px;
  background-color: whitesmoke;
}
.isi {
  padding: 10px 0px;
}
.tanggal {
  width: 95%;
}
.tengah {
  align-self: center;
}

/* .ganjil {
  background-color: rgb(204, 247, 213);
}
.genap {
  background-color: rgb(250, 244, 236);
} */
.kartu {
  box-shadow: 0 0 0 1px lightgray;
  padding-left: 0.5rem;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  border-radius: 0.2rem;
  background-color: white;
}
.sub-judul {
  font-size: 0.75rem;
}
.judul {
  font-size: 0.75rem;
  font-weight: 600;
}
.isinya {
  background-color: whitesmoke;
}
</style>
