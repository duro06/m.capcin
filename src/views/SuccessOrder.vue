<template>
  <div class="berhasil is-full-height">
    <div
      class="field slideInDown"
      v-wow
      data-wow-duration="1s"
      data-wow-delay="0.4s"
    >
      <article class="message is-success">
        <div class="message-body">
          <h2 class="is-3">
            Anda berhsail melakukan
            <strong> pembelian </strong>
            silahkan
            <br />
            <strong>
              <a @click="login">kembali </a>
            </strong>
            <br />
            ke halaman sebelumya
          </h2>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
export default {
  name: "berhasil",
  computed: {
    role() {
      return this.$store.getters.levelAccess;
    }
  },
  methods: {
    login() {
      switch (this.role) {
        case "Produksi":
          this.$router.push({ name: "produksi" }, () => {});
          break;
        case "Packing":
          this.$router.push({ name: "packing" }, () => {});
          break;
        case "Supplier":
          this.$router.push({ name: "supplier" }, () => {});
          break;
        case "Mitra":
          this.$router.push({ name: "mitra" }, () => {});
          break;
        default:
          this.$store
            .dispatch("destroyToken")
            .then(
              this.flashMessage.success({
                message:
                  "Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin " +
                  this.role,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: "login" },
                () => {}
              )
            )
            .catch(
              this.flashMessage.success({
                message:
                  "Mohon maaf Anda tidak diijinkan untuk login, silahkan hubungi Admin " +
                  this.role,
                time: 5000
              }),
              this.$router.replace(
                this.$route.query.redirect || { name: "login" },
                () => {}
              )
            );

          break;
      }
    }
  }
};
</script>
<style scoped>
.berhasil {
  width: 400px;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
