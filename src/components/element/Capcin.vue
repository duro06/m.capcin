<template v-slot:after>
  <div class="capcin">
    <div class="avatar ">
      <!-- <h2>Nyoba lek</h2> -->
      <img src="../../assets/logocapcin.png" alt="logo" />
    </div>
  </div>
</template>
<script>
// import loading from "vue-loading-overlay";
// import Vue from 'vue'
// Vue.use(Loading)
export default {
  name: "capcin"
};
</script>
<style scoped>
img {
  opacity: 0.6;
  position: relative;
  /* top: 50%; */
  /* left: 50%; */
  /* right: 10%; */
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
}
</style>
