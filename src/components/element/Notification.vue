<template>
  <div class="container" @click="read">
    <router-link
      v-if="role == 'Mitra'"
      :to="{ name: 'focus', params: { id: this.data.id } }"
    >
      <div :class="['card', data.read ? '' : 'unread']">
        <div class="content">
          <p class="has-text-left"></p>
          <p v-if="pesan.order.status_id == 1">
            Pesanan anda sudah kami terima dengan nomor referensi<B>
              {{ pesan.order.reff }} </B
            >. status pesanan anda saat ini:
            <span class="status"
              ><B> {{ pesan.status }}</B></span
            >
          </p>
          <p v-else-if="pesan.order.status_id == 7">
            Pesanan anda dengan nomor referensi<B> {{ pesan.order.reff }} </B>
            sudah berganti status menjadi
            <span class="status">
              <B>{{ pesan.status }}</B>
            </span>
            dan data stok anda sudah ditambahkan.
          </p>
          <p v-else>
            Pesanan anda dengan nomor referensi<B> {{ pesan.order.reff }} </B>
            sudah berganti status menjadi
            <span class="status">
              <B>{{ pesan.status }}</B>
            </span>
          </p>
        </div>
      </div>
    </router-link>
    <a v-if="role == 'Packing'" @click.prevent="toPacking">
      <div :class="['card', data.read ? '' : 'unread']">
        Anda mendapat tugas packing dengan
        <p><B>Referensi : </B> {{ pesan.order.reff }}</p>
      </div>
      <!-- <p>data Packing {{ packing.order.id }}</p> -->
    </a>
    <a v-if="role == 'Supplier'" @click.prevent="toShipping">
      <div :class="['card', data.read ? '' : 'unread']">
        Anda mendapat tugas pengantaran dengan
        <p><B>Referensi : </B> {{ pesan.order.reff }}</p>
      </div>
    </a>
  </div>
</template>
<script>
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
          if (dat.order_id == this.data.order.id) {
            return true;
          }
        });
        return packOrder ? packOrder[0] : [];
      } else return [];
    },
    shipping() {
      if (this.role == "Supplier") {
        let shipOrder = this.$store.state.shipping.shipping.filter(dat => {
          if (dat.order_id == this.data.order.id) {
            return true;
          }
        });
        return shipOrder ? shipOrder[0] : [];
      } else return [];
    }
  },
  methods: {
    ...mapActions("notifications", ["readNotifications"]),
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
      this.$store.commit("order/setOrderFocus", this.data.order);
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
  background-color: rgb(193, 243, 250);
}
.status {
  color: #07ffc9;
}
</style>
