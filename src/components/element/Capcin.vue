<template>
  <div class="capcin">
    <div class="vld-parent">
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="true"
        :color="color"
        :opacity="0.7"
      >
        <template v-slot:before>Loading...</template>
        <template v-slot:after>
          <img src="@/assets/logocapcin.png" alt="" />
        </template>
      </loading>
    </div>
  </div>
</template>
<script>
import loading from "vue-loading-overlay";
// import Vue from 'vue'
// Vue.use(Loading)
export default {
  name: "capcin",
  components: { loading },

  data() {
    return {
      color: "#42b549"
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    }
  }
};
</script>
<style scoped>
/* img {
  opacity: 0.6;
  position: relative;
  top: 50%;
  left: 50%;
  right: 10%;
  width: 100px;
  height: 100px;
  margin: 0px 0 0 0px;
  -webkit-animation: spin 4s linear infinite;
  -moz-animation: spin 4s linear infinite;
  animation: spin 4s linear infinite;
}

@-moz-keyframes spin {
  100% {
    -moz-transform: rotate(360deg);
  }
}
@-webkit-keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
} */
</style>
