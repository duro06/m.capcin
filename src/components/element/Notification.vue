<template>
  <div class="container" @click="read">
    <router-link
      v-if="role == 'Mitra'"
      :to="{ name: 'focus', params: { id: this.data.id } }"
    >
      <div :class="['card', data.data.read ? '' : 'unread']">
        <div class="content">
          <p class="has-text-left"></p>
          <div v-if="pesan.data.order.status_id == 1">
            Pesanan anda sudah kami terima dengan status pesanan :
            <span class="status">
              <i>{{ pesan.data.status }}</i>
            </span>
            <p style="color:gray; font-size:10px !important;">
              <i>{{ perbedaan(pesan.created_at) }} yang lalu</i>
            </p>
          </div>
          <div v-else-if="pesan.data.order.status_id == 7">
            Status pesanan
            <span class="status">
              <i>{{ pesan.data.status }}</i>
            </span>
            dan stok anda sudah ditambahkan.
            <p style="color:gray; font-size:10px !important;">
              <i>{{ perbedaan(pesan.created_at) }} yang lalu</i>
            </p>
          </div>
          <div v-else>
            Status pesanan berganti :
            <span class="status">
              <i>{{ pesan.data.status }}</i>
            </span>
            <p style="color:gray; font-size:10px !important;">
              <i>{{ perbedaan(pesan.created_at) }} yang lalu</i>
            </p>
          </div>
        </div>
      </div>
    </router-link>
    <a v-if="role == 'Packing'" @click.prevent="toPacking">
      <div :class="['card', data.data.read ? '' : 'unread']">
        Anda mendapat tugas packing
        <p style="color:gray; font-size:10px !important;">
          <i>{{ perbedaan(pesan.created_at) }} yang lalu</i>
        </p>
      </div>
      <!-- <p>data Packing {{ packing.order.id }}</p> -->
    </a>
    <a v-if="role == 'Supplier'" @click.prevent="toShipping">
      <div :class="['card', data.data.read ? '' : 'unread']">
        Anda mendapat tugas pengantaran

        <p style="color:gray; font-size:10px !important;">
          <i>{{ perbedaan(pesan.created_at) }} yang lalu</i>
        </p>
      </div>
    </a>
  </div>
</template>
<script>
import moment from "moment";
import { mapActions } from "vuex";
export default {
  name: "notif",
  props: { data: Object },
  data() {
    return {
      pesan: this.data
    };
  },
  computed: {
    role() {
      return this.$store.state.profile.role;
    },
    packing() {
      if (this.role == "Packing") {
        let packOrder = this.$store.state.pack.packingOrders.filter(dat => {
          if (dat.order_id == this.data.data.order.id) {
            return true;
          }
        });
        return packOrder ? packOrder[0] : [];
      } else return [];
    },
    shipping() {
      if (this.role == "Supplier") {
        let shipOrder = this.$store.state.shipping.shipping.filter(dat => {
          if (dat.order_id == this.data.data.order.id) {
            return true;
          }
        });
        return shipOrder ? shipOrder[0] : [];
      } else return [];
    }
  },
  methods: {
    ...mapActions("notifications", ["readNotifications"]),
    perbedaan(from) {
      moment.locale("id");
      // let to = Date.now();
      let durations = moment.duration(moment().diff(moment(from))).humanize();
      return durations;
    },
    toPacking() {
      console.log("packing", this.packing);
      if (this.packing) {
        this.$store.commit("delDetailsProduct");
        this.$store.commit("bubuk/delBubuks");
        this.$store.commit("pack/delOrderId");
        // this.getProductById(this.product_id);
        this.$store.commit(
          "setDetailsProduct",
          this.packing.order.detail_order_one.product.detail_items
        );
        this.$store.commit("bubuk/setBubuks", this.packing.order.details_bubuk);
        this.$store.commit("pack/setOrderId", this.packing.order_id);
        this.$router.replace(
          this.$route.query.redirect || {
            name: "detailproduk"
          },
          () => {}
        );
      } else {
        this.flashMessage.error({
          message: "Data tidak ada. silahkan lihat tugas anda di beranda", // kirim flash Message
          time: 5000
        });
      }
      // console.log()
    },
    toShipping() {
      console.log("shipping", this.shipping);
      if (this.shipping) {
        let data = {
          nama: this.shipping.order.user.name,
          alamat: this.shipping.order.user.alamat,
          tlp: this.shipping.order.user.tlp,
          reff: this.shipping.order.reff,
          product: this.shipping.order.detail_order_one.product.name,
          order_id: this.shipping.order_id
        };
        this.$store.dispatch("shipping/setDetails", data);
        // this.setDetails(data);
        this.$router.replace(
          this.$route.query.redirect || {
            name: "shipping"
          },
          () => {}
        );
      } else {
        this.flashMessage.error({
          message: "Data tidak ada. silahkan lihat tugas anda di beranda", // kirim flash Message
          time: 5000
        });
      }
      // console.log()
    },
    read() {
      this.$store.commit("order/setOrderFocus", this.data.data.order);
      this.$store.dispatch("readNotification", this.pesan.id);
      this.readNotifications(this.pesan.id);
      console.log("Notif card", this.data);

      this.$emit("tutup");

      // this.$router.replace({ name: "order" }, () => {});
    }
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>
<style lang="scss" scoped>
.unread {
  background-color: whitesmoke;
}
.status {
  color: gray;
  // font-size: 18px;
}
</style>
