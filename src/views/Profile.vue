<template>
  <div class="container">
    <div class="has-text-centered">
      <div>
        <div>
          <div class="card">
            <div class="gambar">
              <div class="card-image">
                <figure class="image is-4by5">
                  <img :src="image" alt="Placeholder image" />
                </figure>
              </div>
            </div>
            <div class="card-content">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-48x48">
                    <img :src="image" alt="Placeholder image" />
                  </figure>
                </div>
                <div class="media-content">
                  <p class="title is-6" style="color: black">{{ user.name }}</p>
                  <p class="subtitle is-7" style="color: black">
                    {{ user.email }}<br />
                    {{ user.role }} Capcin
                  </p>
                </div>
              </div>

              <div class="content">
                <div class="kotak">
                  <label class="isi-kotak" for="input">Nama </label>
                  <input class="isi-kotak input is-small" type="text" />
                </div>
                <div class="kotak">
                  <label class="isi-kotak" for="input">Email </label>
                  <input class="isi-kotak input is-small " type="text" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <br />
          <router-link
            class="button is-info"
            type="primary"
            :to="{ path: '/home' }"
            replace
            >Kembali</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { getProfile } from "../services/auth_service";
import { mapState } from "vuex";
import * as auth from "../services/auth_service";

export default {
  name: "profile",
  data() {
    return {
      user: "",
      image: ""
    };
  },
  beforeCreate: async function() {
    //===================jangan lupa ini nanti dihapus=============
    console.log("Profile Get Profile");
    //=============================================================
    try {
      const response = await auth.getProfile(); // ambil profile
      //===================jangan lupa ini nanti dihapus=============
      console.log(response);
      //=============================================================
      this.$store.dispatch("aunthenticate", response.data); // panggil action untuk manuliskan data
      this.user = response.data;
    } catch (error) {
      console.log("", error);
    }
  },
  computed: {
    ...mapState(["profile", "serverImage", "token"])
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.getProfile();
      }
    }
  },
  methods: {
    getProfile() {
      console.log("Profile Updated ", this.profile);
      let user = this.profile;
      this.user = user;
      this.image = this.serverImage + user.image;
    }
  }
  // updated() {
  //   this.getProfile();
  // },
  // created() {
  //   this.getProfile();
  //   // this.$store.dispatch("retrieveName");
  //   //   getProfile()
  //   //     .then(response => {
  //   //       this.user = response.data;
  //   //     })
  //   //     .catch(error => {
  //   //       switch (error.response.status) {
  //   //         case 422:
  //   //           this.errors = error.response.data.errors;
  //   //           break;
  //   //         case 500:
  //   //           this.flashMessage.error({
  //   //             message: error.response.data.message,
  //   //             time: 5000
  //   //           });
  //   //           break;
  //   //         case 401:
  //   //           this.flashMessage.error({
  //   //             message: error.response.data.message,
  //   //             time: 5000
  //   //           });
  //   //           break;
  //   //         case 404:
  //   //           this.flashMessage.error({
  //   //             message: error.response.data.message,
  //   //             time: 5000
  //   //           });
  //   //           break;
  //   //         default:
  //   //           this.flashMessage.error({
  //   //             message: "Some error occured, Please Try Again!",
  //   //             time: 5000
  //   //           });
  //   //           break;
  //   //       }
  //   // });
  // }
};
</script>
<style scoped>
.gambar {
  padding: 1rem 1rem 0rem 1rem;
}
.kotak {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
}
.kotak > label {
  text-align: left;
  width: 30%;
}
.kotak > input {
  width: 70%;
  /* border-color: #dbdbdb;
  border-radius: 2px;
  font-size: 0.75rem;
  clear: both;
  border: 1px solid #dbdbdb; */
}
</style>
