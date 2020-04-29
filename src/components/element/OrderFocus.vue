<template>
  <div class="order-container">
    <router-link :to="{ path: '/order' }" exact>
      <button class="button is-fullwidth is-light is-primary">
        tampilkan semua
      </button>
    </router-link>
    <div class="card">
      <div class="card-header zoomIn"></div>
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column is-7 zoomIn">
            <p class="t-sm"><b>Order :</b> C-{{ orderFocus.reff }}</p>
            <p class="t-xsm kelam">
              <i>{{ orderFocus.created_at }}</i>
            </p>
          </div>
          <div class="column is-5 zoomIn">
            <p class="rata-kanan t-sm">
              <B>{{ total }}</B>
            </p>
            <!-- <p class="rata-kanan"> -->
            <p :class="['rata-kanan t-sm', statusText]">
              <B>{{ orderFocus.status.name }}</B>
            </p>
          </div>
        </div>
        <!-- </div> -->
        <!-- <div :class="['columns', 'is-mobile', status]">
          <div class="column is-5 zoomIn">
        <p><B>Refferensi :</B> C-{{ orderFocus.reff }}</p>
            <p class="rata-kiri">Jumlah :</p>
            <p class="rata-kiri">{{ total }}</p>
          </div>
          <div class="column is-7 zoomIn">
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <p class="rata-kiri box has-text-centered">
              <B>{{ orderFocus.status.name }}</B>
            </p>
          </div>
        </div> -->
      </div>
      <div
        v-if="orderFocus.status_id == 5"
        class="has-text-centered"
        @click="confirm"
      >
        <button class="button is-success is-rounded is-small">
          Barang telah diterima
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import * as ord from "@/services/order_service";
import { mapState } from "vuex";
export default {
  name: "focus",

  data() {
    return {
      // orderFocus: this.orderFocus,
      details: this.detail,
      dataDetails: [],
      kelihatan: "none",
      isDisplay: false
    };
  },
  mounted() {
    if (this.orderFocus.id == undefined) {
      this.$store.commit("loading");
      this.$router.push({ name: "mitra" }, () => {});
    }
  },
  computed: {
    ...mapState("order", { orderFocus: state => state.Focus }),
    status() {
      return this.orderFocus.status.name;
    },
    statusText() {
      if (this.orderFocus.status_id === 7) {
        return "txt-gray";
      } else if (this.orderFocus.status_id === 6) {
        return "txt-merah";
      } else {
        return "txt-hijau";
      }
    },
    total() {
      let sub = "Rp " + new Intl.NumberFormat().format(this.orderFocus.total);
      return sub;
    }
  },
  methods: {
    confirm() {
      this.$store
        .dispatch("order/confirmOrder", this.orderFocus.id)
        .then(() => {
          this.$store.dispatch("shipping/getShipping");
          this.flashMessage.success({
            message: "Konfirmasi barang diterima sudah selesai",
            time: 3000
          });
          this.$router.push({ name: "order" }, () => {});
        });
    },
    getDetail() {
      this.isDisplay = !this.isDisplay;
      this.kelihatan = this.isDisplay ? "inherit" : "none";
      if (this.isDisplay) {
        this.ambilDetail();
      }
    },
    ambilDetail: async function() {
      this.$store.commit("loading");
      let id = this.orderFocus.id;
      let params = {
        params: {
          q: id
        }
      };
      try {
        const res = await ord.getDetail(params);
        this.$store.commit("notLoading");
        if (res.status == 200) {
          this.dataDetails = res.data.data;
        }
      } catch (e) {
        this.$store.commit("notLoading");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
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
.isi-kartu {
  padding: 0px 24px;
}
.order-container {
  padding: 5px 10px;
}
.columns {
  border-radius: 10px;
}
.Order {
  background-color: rgb(255, 255, 150);
}
.Order > div > .box {
  background-color: rgb(255, 255, 50);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Produksi {
  background-color: rgb(155, 255, 150);
}
.Produksi > div > .box {
  background-color: rgb(105, 255, 50);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Packing {
  background-color: rgb(100, 250, 180);
}
.Packing > div > .box {
  background-color: rgb(50, 250, 100);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Dikirim {
  background-color: rgb(150, 255, 205);
}
.Dikirim > div > .box {
  background-color: rgb(50, 250, 255);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Terkirim {
  background-color: rgb(155, 182, 255);
}
.Terkirim > div > .box {
  background-color: rgb(62, 130, 255);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Selesai {
  background-color: rgb(255, 158, 158);
}
.Selesai > div > .box {
  background-color: rgb(255, 79, 79);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
</style>
