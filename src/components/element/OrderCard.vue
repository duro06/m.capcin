<template>
  <div class="order-container">
    <div class="card">
      <div class="card-header zoomIn" v-wow data-wow-duration="1s">
        <p><B>Refferensi :</B> Capcin-{{ item.reff }}</p>
      </div>
      <div class="card-content">
        <!-- <router-link
          :to="{
            name: 'order_detail',
            params: { id: this.data.id }
          }"
          class="detail-items"
        > -->
        <div :class="['columns', 'is-mobile', status]">
          <div
            @click="getDetail"
            class="column is-3 zoomIn"
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.4s"
          >
            <p class="rata-kiri">Details</p>
          </div>
          <div
            class="column is-5 zoomIn"
            v-wow
            data-wow-duration="1s"
            data-wow-delay="0.7s"
          >
            <p class="rata-kiri">Jumlah :</p>
            <p class="rata-kiri">{{ total }}</p>
          </div>
          <div
            class="column is-4 zoomIn"
            v-wow
            data-wow-duration="1s"
            data-wow-delay="1s"
          >
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <p class="rata-kiri box">
              <B>{{ item.status.name }}</B>
            </p>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="kalo" v-if="dataDetails.length">
      <div class="card" :style="{ display: kelihatan }">
        <div class="card-content">
          <div class="columns is-mobile">
            <div
              class="column is-5 zoomIn"
              v-wow
              data-wow-duration="1s"
              data-wow-delay="0s"
            >
              <p><B>Nama Produk</B></p>
            </div>
            <div
              class="column is-3 zoomIn"
              v-wow
              data-wow-duration="1s"
              data-wow-delay="0s"
            >
              <p><B>Harga</B></p>
              <p><B>Subtotal</B></p>
            </div>
            <div
              class="column is-4 zoomIn"
              v-wow
              data-wow-duration="1s"
              data-wow-delay="0s"
            >
              <p><B>Jumlah</B></p>
            </div>
          </div>
        </div>
      </div>
      <div class="pengulangan" v-for="(d, n) in dataDetails" :key="n">
        <div class="card" :style="{ display: kelihatan }">
          <div class="card-content">
            <div class="columns is-mobile">
              <div
                class="column is-5 zoomIn"
                v-wow
                data-wow-duration="1s"
                data-wow-delay="0.3s"
              >
                <p>{{ d.product.name }}</p>
              </div>
              <div
                class="column is-3 zoomIn"
                v-wow
                data-wow-duration="1s"
                data-wow-delay="0.6s"
              >
                <p>{{ d.harga }}</p>
                <p>{{ d.harga * d.qty }}</p>
              </div>
              <div
                class="column is-4 zoomIn"
                v-wow
                data-wow-duration="1s"
                data-wow-delay="0.9s"
              >
                <p>{{ d.qty }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as ord from "@/services/order_service";
export default {
  name: "card",
  props: { data: Object, detail: Array },
  data() {
    return {
      item: this.data,
      details: this.detail,
      dataDetails: [],
      kelihatan: "none",
      isDisplay: false
    };
  },
  created() {
    // this.detail;
  },
  computed: {
    status() {
      return this.item.status.name;
    },
    total() {
      let sub = "Rp " + new Intl.NumberFormat().format(this.item.total);
      return sub;
    }
    // Ddetail() {
    //   const detail = this.details.filter(e => e.order_id === this.item.id);
    //   return detail;
    // }
  },
  methods: {
    getDetail() {
      this.ambilDetail();
      this.isDisplay = !this.isDisplay;
      this.kelihatan = this.isDisplay ? "inherit" : "none";
    },
    ambilDetail: async function() {
      this.$store.commit("loading");
      let id = this.item.id;
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
<style scoped>
.order-container {
  padding: 5px 10px;
}
.columns {
  border-radius: 10px;
}
.Order {
  background-color: rgb(255, 245, 153);
}
.Order > div > .box {
  background-color: rgb(253, 239, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Produksi {
  background-color: rgb(214, 248, 160);
}
.Produksi > div > .box {
  background-color: rgb(158, 253, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Packing {
  background-color: rgb(160, 248, 164);
}
.Packing > div > .box {
  background-color: rgb(59, 253, 33);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Dikirim {
  background-color: rgb(160, 195, 248);
}
.Dikirim > div > .box {
  background-color: rgb(33, 209, 253);
  color: black;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Terkirim {
  background-color: rgb(155, 253, 245);
}
.Terkirim > div > .box {
  background-color: rgb(33, 121, 253);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
.Selesai {
  background-color: rgb(172, 255, 155);
}
.Selesai > div > .box {
  background-color: rgb(66, 230, 17);
  color: aliceblue;
  cursor: not-allowed;
  padding: 7px 16px;
}
</style>
