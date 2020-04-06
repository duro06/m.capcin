<template>
  <div class="container" @click="read">
    <router-link :to="{ name: 'focus', params: { id: this.data.id } }">
      <!-- <router-link :to="{ path: '/order#' + pesan.id }"> -->
      <div :class="['card', baca ? '' : 'unread']">
        <div class="card-header">
          <p><B>Referensi : </B> Capcin-{{ pesan.reff }}</p>
        </div>
        <div class="content">
          <p>
            sudah berganti status menjadi
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
export default {
  name: "notif",
  props: { data: Object },
  data() {
    return {
      pesan: this.data
    };
  },
  computed: {
    baca() {
      return this.data.read;
    }
  },
  methods: {
    read() {
      this.$store.commit("order/setOrderFocus", this.data);
      this.$store.commit("notifIsRead", this.pesan.id);
      console.log("Notif card", this.data);
      this.$emit("tutup");
      this.$destroy();
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
