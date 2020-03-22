<template>
  <div class="container" @click="read">
    <router-link :to="{ name: 'focus', params: { id: this.data.id } }">
      <!-- <router-link :to="{ path: '/order#' + pesan.id }"> -->
      <div :class="['card', pesan.read ? '' : 'unread']">
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
  methods: {
    read() {
      this.$store.commit("setOrderFocus", this.data);
      this.$store.commit("notifIsRead", this.pesan.id);
      console.log(this.data);
      this.$emit("tutup");
      // this.$router.replace({ name: "order" }, () => {});
    }
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
