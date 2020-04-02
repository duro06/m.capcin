<template>
  <div class="hello">
    <div class="field slideInDown">
      <div class="card" @click="redirect">
        <div class="card-image">
          <figure class="image is-5by3">
            <img :src="image" alt="Placeholder image" />
          </figure>
        </div>
        <div class="card-content">
          <div class="halaman-isi">
            <p class="tittle is-5">Halaman ini Kosong</p>
            <p class="subtittle is-6">Memang tidak ada isi nya</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      image: "../img/404.png"
    };
  },
  computed: {
    role() {
      return this.$store.getters.levelAccess;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
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
