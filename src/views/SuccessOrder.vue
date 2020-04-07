<template>
  <div class="berhasil is-full-height">
    <div class="field slideInDown">
      <article class="message is-success">
        <div class="message-body">
          <h2 class="is-3">
            Anda {{ successOrder.status }} melakukan pembelian dengan referensi
            <strong> {{ successOrder.data.reff }} </strong>
            silahkan
            <br />
            <strong>
              <a @click="login">click link ini </a>
            </strong>
            <br />
            untuk kembali ke halaman utama
          </h2>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "berhasil",
  computed: {
    role() {
      return this.$store.getters.levelAccess;
    },
    ...mapState("order", { successOrder: state => state.successOrder })
  },
  mounted() {
    this.$store.commit("notLoading");
  },
  methods: {
    login() {
      // this.$store.commit("delSuccessOrder");
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
