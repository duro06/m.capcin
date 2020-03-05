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
          <a>What exacly you are looking for? </a>
          we suggest you to use our

          <a @click="login"> Link </a>

          To navigate to whatever you're looking for, if its not there, it means
          you are not allowed to get it not there
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  methods: {
    login() {
      this.$router.replace({ name: "login" });
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
