<template>
  <div class="empty">
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="image" alt="Placeholder image" />
        </figure>
      </div>
      <div class="card-content">
        <div
          @click="redirect"
          class="halaman-isi"
          v-if="page.includes('order')"
        >
          <p class="tittle is-5">Halaman ini Kosong</p>
          <p class="subtittle is-6">Silahkan lakukan transaksi</p>
        </div>
        <div
          @click="redirect"
          class="halaman-isi"
          v-else-if="page.includes('packtask')"
        >
          <p class="tittle is-5">Halaman ini Kosong</p>
          <p class="subtittle is-6">Belum ada Tugas untuk Anda</p>
          <p class="subtittle is-6">Silahkan kembali ke halaman utama</p>
        </div>
        <div
          @click="redirect"
          class="halaman-isi"
          v-else-if="page.includes('supplier')"
        >
          <p class="tittle is-5">Halaman ini Kosong</p>
          <p class="subtittle is-6">Belum ada Tugas untuk Anda</p>
          <p class="subtittle is-6">Silahkan tunggu</p>
        </div>
        <div class="halaman-isi" v-else>
          <p class="tittle is-5">Halaman ini Kosong</p>
          <p class="subtittle is-6">Belum saya isi</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "empty",
  data() {
    return {
      emptyCart: "../img/emptyCart.png",
      emptyBag: "../img/emptyBag.png",
      sadBag: "../img/sadBag.png",
      sadBag2: "../img/sadBag2.png"
    };
  },
  computed: {
    role() {
      return this.$store.getters.levelAccess;
    },
    image() {
      if (this.$route.path.includes("order")) {
        return this.sadBag;
      } else if (this.$route.path.includes("keranjang")) {
        return this.emptyCart;
      } else if (this.$route.path.includes("packtask")) {
        return this.emptyBag;
      } else {
        return this.sadBag2;
      }
    },
    page() {
      return this.$route.path;
    }
  },
  methods: {
    redirect() {
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
.empty {
  padding: 55px 20px;
}
.halaman-isi {
  border-radius: 10px;
  text-align: center;
  background-color: #42b549 !important;
  color: white;
}
.card {
  border-radius: 10px;
  background-color: antiquewhite;
}
.image > img {
  border-radius: 10px;
}
</style>
