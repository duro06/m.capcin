<template>
  <div id="coba">
    <section class="hero is-fullheight">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="field fadeInUp">
            <h1 class="avatar has-text-centered custom section">
              <img src="../assets/logocapcin.png" alt="logo" />
            </h1>
          </div>
          <div class="column is-4 is-offset-4">
            <article class="message is-danger">
              <div class="message-header field fadeInUp">
                <p>
                  <strong>Anda telah berhasil melakukan Regestrasi</strong>
                </p>
              </div>
              <div class="message-body field fadeInUp">
                <strong>Silahkan tunggu </strong>
                <p>hubungi Admin di nomor</p>
                <strong>088 000 888 999</strong>
                <p>jika dalam waktu 1 x 24 jam anda belum bisa Login</p>
              </div>
            </article>
            <div class="message-body field fadeInUp">
              <h3 class="notification berhasil" v-if="reg.length">
                Sudah mendapatkan konfirmasi
              </h3>
              <h3 class="notification berhasil" v-else>Menunggu konfirmasi</h3>
              <a @click="pindah" class="button is-small is-rounded is-danger">
                Klik untuk Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
/* eslint-disable */

// import Pusher from "pusher-js";

// Pusher.logToConsole = true;

export default {
  name: "info",
  data () {
    return { messages: [] };
  },

  created () {
    // this.subscribe();
    // this.kirimKePuser()
  },
  mounted(){
    let userId = 25;
            // eslint-disable-next-line no-undef
            Echo.private("App.Register." + userId).notification(data => {
              if (data != "") {
                this.$store.dispatch("destroyVerifie");
                this.$store.dispatch("stockMitra/remove", "ada");
              }
              console.log(data.type);
              console.log("data ", data);
            });
  },
  computed: {
    //Menunggu Verivikasi 
    ...mapState({
      reg:state=>state.registrasi
    }),
    waiting () {
    return this.$store.getters.waitingVerified;
    }
  },

  methods: {
    pindah(){
      this.$router.replace({ name: "login" },()=>{})
    },
    // Fungsinya pusher
    // subscribe () {
    // // Api key + cluster
    // let pusher = new Pusher("c1b487e073e0124e259f", {
    //   cluster: "ap1",
    //   forceTLS: true
    // });
    // let channel = pusher.subscribe("capcin-reg.19");

    // channel.bind("App\\Events\\RegisterEvent", data => {
    //   this.messages.push(data);
    //   if (data != "") {
    //     console.log('data ada')
    //   this.$store.dispatch("destroyVerifie");
    //   // this.$router.push('/')
    //   }

    // });
    // }
  }
};
</script>
<style scoped>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, 30%, 0);
    -ms-transform: translate3d(0, 30%, 0);
    transform: translate3d(0, 30%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    -ms-transform: none;
    transform: none;
  }
}

.fadeInUp {
  animation-name: fadeInUp;
  animation-timing-function: ease-out;
}

</style>
<style lang="sass" scoped>

  @charset 'utf-8'
  Import Bulma core
  // @import 'bulma.sass';
  Import component
  // @import 'bulma-badge.sass';
  </style>
  <style scoped>
  .notification {
  padding: 10px;
  }
  .section {
  padding-top: 10px;
  padding-bottom: 10px;
  }
  .berhasil {
  background-color: rgb(255, 57, 90);
  color: white;
}
</style>
