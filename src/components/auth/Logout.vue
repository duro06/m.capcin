<template>
  <div></div>
</template>
<script>
export default {
  created() {
    this.$store
      .dispatch("destroyToken")
      .then(
        this.$router.replace(
          this.$route.query.redirect || { name: "login" },
          () => {}
        )
      )
      .catch(
        this.$router.replace(
          this.$route.query.redirect || { name: "login" },
          () => {}
        )
      );
  }
  // destroyed() {
  //   console.log("destroyed");
  //   location.reload();
  // }
};
</script>
