<template>
  <div class="container" @click="read">
    <router-link :to="{ name: 'focus', params: { id: this.data.id } }">
      <!-- <router-link :to="{ path: '/order#' + pesan.id }"> -->
      <div :class="['card', data.read ? '' : 'unread']">
        <div class="card-header">
          <p><B>Referensi : </B> Capcin-{{ pesan.order.reff }}</p>
        </div>
        <div class="content">
          <p v-if="pesan.status != 'Order'">
            sudah berganti status menjadi
            <span class="status"
              ><B> {{ pesan.status }}</B></span
            >
          </p>
          <p v-else>
            Pesanan Anda sudah kami terima. status pesanan anda saat ini:
            <span class="status"
              ><B> {{ pesan.status }}</B></span
            >
          </p>
        </div>
      </div>
    </router-link>
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
  // computed: {
  //   baca() {
  //     console.log(this.data.read);
  //     return this.data.read;
  //   }
  // },
  methods: {
    ...mapActions("notifications", ["readNotifications"]),
    read() {
      this.$store.commit("order/setOrderFocus", this.data);
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
