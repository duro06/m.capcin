<template>
  <div class="order-container">
    <div class="card">
      <div class="card-header zoomIn">
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
          <div @click="getDetail" class="column is-3 zoomIn">
            <p class="rata-kiri">Details</p>
          </div>
          <div @click="position" class="column is-5 zoomIn">
            <p class="rata-kiri">Jumlah :</p>
            <p class="rata-kiri">{{ total }}</p>
          </div>
          <div class="column is-4 zoomIn">
            <p class="rata-kiri">
              <B>status :</B>
            </p>
            <p class="rata-kiri box has-text-centered">
              <B>{{ item.status.name }}</B>
            </p>
          </div>
        </div>
        <!-- </router-link> -->
      </div>
    </div>
    <button
      v-if="loading"
      class="button transparent is-fullwidth is-loading is-large is-outlined"
    >
      loading ...
    </button>
    <div class="kalo" v-if="dataDetails.length">
      <div class="card" :style="{ display: kelihatan }">
        <div class="isi-kartu">
          <div class="columns is-mobile">
            <div class="column is-5 zoomIn">
              <p><B>Nama Produk</B></p>
            </div>
            <div class="column is-3 zoomIn">
              <p><B>Harga</B></p>
            </div>
            <div class="column is-4 zoomIn">
              <p><B>Jumlah</B></p>
            </div>
          </div>
        </div>
      </div>
      <div class="pengulangan" v-for="(d, n) in dataDetails" :key="n">
        <div class="card" :style="{ display: kelihatan }">
          <div class="isi-kartu">
            <div class="columns is-mobile">
              <div class="column is-5 zoomIn">
                <p>{{ d.product.name }}</p>
              </div>
              <div class="column is-3 zoomIn">
                <p>{{ d.harga }}</p>
              </div>
              <div class="column is-4 zoomIn">
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
      isDisplay: false,
      loading: false
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
    position() {
      // location.href = "#" + this.item.id;
      // let positionX = this.$refs.myPosition.getClientRects();
      // let positionY = this.$refs.myPosition.getBoundingClientRect();
      // console.log("location ", location.href);
      // console.log("y", positionY);
    },
    getDetail() {
      this.isDisplay = !this.isDisplay;
      this.kelihatan = this.isDisplay ? "inherit" : "none";
      if (this.isDisplay && !this.dataDetails.length) {
        this.ambilDetail();
      }
    },
    ambilDetail: async function() {
      // this.$store.commit("loading");
      this.loading = true;
      let id = this.item.id;
      let params = {
        params: {
          q: id
        }
      };
      try {
        const res = await ord.getDetail(params);
        // this.$store.commit("notLoading");
        this.loading = false;
        if (res.status == 200) {
          this.dataDetails = res.data.data;
          // console.log(this.dataDetails)
        }
      } catch (e) {
        this.loading = false;
        // this.$store.commit("notLoading");
      }
    }
  }
};
</script>
<style scoped>
.transparent {
  background-color: transparent;
  border-color: transparent;
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
