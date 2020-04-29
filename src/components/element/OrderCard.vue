<template>
  <div class="order-container">
    <div class="card">
      <!-- <div class="card-header">
        <p><B>Refferensi :</B> Capcin-{{ item.reff }}</p>
      </div> -->
      <div class="card-content">
        <!-- <div :class="['columns', 'is-mobile', status]"> -->
        <div class="columns is-mobile">
          <div class="column is-7 zoomIn">
            <p class="t-sm"><b>Order :</b> C-{{ item.reff }}</p>
            <p class="t-xsm kelam">
              <i>pada {{ dibuat(item.created_at) }}</i> <br />
              <!-- <span v-if="item.status_id != 1">
                <i>
                  Lama Proses
                  <b>{{ perbedaan(data.created_at, data.updated_at) }}</b>
                </i>
              </span>
              <span v-if="item.status_id == 1">
                <i>
                  belum di proses
                </i>
              </span> -->
            </p>
            <!-- <p class="rata-kiri">Harga :</p>
            <p class="rata-kiri">{{ total }}</p> -->
          </div>
          <div class="column is-5 zoomIn">
            <p class="rata-kanan t-sm">
              <B>{{ total }}</B>
            </p>
            <!-- <p class="rata-kanan"> -->
            <p :class="['rata-kanan t-sm', statusText]">
              <B>{{ item.status.name }}</B>
            </p>
          </div>
        </div>
      </div>
      <!-- {{data}} -->
    </div>
  </div>
</template>
<script>
import moment from "moment";
export default {
  name: "card",
  props: { data: Object, detail: Array },
  data() {
    return {
      item: this.data,
      details: this.detail,
      dataDetails: [],
      kelihatan: "none",
      isDisplay: false,
      loading: false
    };
  },
  computed: {
    status() {
      return this.item.status.name;
    },
    statusText() {
      // return this.item.status.name == "Selesai" ? "txt-hijau" : "txt-merah";
      if (this.item.status_id === 7) {
        return "txt-gray";
      } else if (this.item.status_id === 6) {
        return "txt-merah";
      } else {
        return "txt-hijau";
      }
    },
    total() {
      let sub = "Rp " + new Intl.NumberFormat().format(this.item.total);
      return sub;
    }
  },
  methods: {
    dibuat(tgl) {
      moment.locale("id");
      return moment(tgl).format("DD MMMM YYYY");
    },
    perbedaan(from, to) {
      moment.locale("id");
      let durations = moment.duration(moment(to).diff(moment(from))).humanize();
      return durations;
    }
  }
};
</script>
<style lang="scss" scoped>
.transparent {
  background-color: transparent;
  border-color: transparent;
}
// .isi-kartu {
//   padding: 0px 24px;
// }
.order-container {
  padding: 5px;
}
.columns {
  border-radius: 10px;
}

.t-sm {
  font-size: 14px;
}
.t-xsm {
  font-size: 12px;
}
.kelam {
  color: gray;
}
// .Order {
//   background-color: rgb(255, 255, 150);
// }
// .Order > div > .box {
//   background-color: rgb(255, 255, 50);
//   color: black;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }
// .Produksi {
//   background-color: rgb(155, 255, 150);
// }
// .Produksi > div > .box {
//   background-color: rgb(105, 255, 50);
//   color: black;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }
// .Packing {
//   background-color: rgb(100, 250, 180);
// }
// .Packing > div > .box {
//   background-color: rgb(50, 250, 100);
//   color: black;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }
// .Dikirim {
//   background-color: rgb(150, 255, 205);
// }
// .Dikirim > div > .box {
//   background-color: rgb(50, 250, 255);
//   color: black;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }
// .Terkirim {
//   background-color: rgb(155, 182, 255);
// }
// .Terkirim > div > .box {
//   background-color: rgb(62, 130, 255);
//   color: aliceblue;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }
// .Selesai {
//   background-color: rgb(255, 158, 158);
// }
// .Selesai > div > .box {
//   background-color: rgb(255, 79, 79);
//   color: aliceblue;
//   cursor: not-allowed;
//   padding: 7px 16px;
// }

/* BARU INI WAN */
.card {
  box-shadow: 0 0 0 1px lightgray;
  border-radius: 3px !important;

  .txt-merah {
    color: red;
  }
  .txt-hijau {
    color: green;
  }
  .txt-gray {
    color: gray;
  }
}
</style>
