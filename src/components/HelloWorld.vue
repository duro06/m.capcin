<template>
  <div class="hello">
    <div
      class="field slideInDown"
      v-wow
      data-wow-duration="1s"
      data-wow-delay="0.4s"
    >
      <article class="message is-danger">
        <div class="message-body">
          You are trying to type something
          <strong>That we not produce in normal state </strong>
          What exacly you are looking for? we suggest you to use
          <br />
          <strong>
            <a @click="login">This link </a>
          </strong>
          <br />
          To navigate to our home page then look for whatever you want from
          there, if its not there, it means you are not allowed to get in there.
          or if you need another page, request it to our developer
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
