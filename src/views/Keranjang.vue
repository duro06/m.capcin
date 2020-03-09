<template>
  <div class="profile">
    <div class="has-text-centered">
      <div>
        <div>
          <div class="card">
            <div class="card-content">
              <div class="media">
                <div class="media-content">
                  <p class="title is-6" style="color: black">
                    <!-- id : {{ product().id }} Nama :
                    {{ product().name }} -->
                    isi nanti dah
                  </p>
                  <p class="subtitle is-7" style="color: black">
                    <!-- {{ harga }} <br />
                    Tersedia {{ product().stok_awal }} <br />
                    {{ product().description }} -->
                    yang penting ente kelihatan
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <Footer class="navbar" /> -->
  </div>
</template>
<script>
// import { getProfile } from "../services/auth_service";
import { mapState } from "vuex";
// import * as auth from "../services/auth_service";
// import Modal from "../components/element/Modal.vue";
// import Footer from "../components/element/bulmaFooter";

export default {
  name: "Keranjang",
  components: {
    //  Modal,
    // Footer
  },
  data() {
    return {
      user: "",
      showModal: false, // modal tampil atau tidak
      errors: [],
      disable: false
    };
  },

  computed: {
    ...mapState(["products"])
    // displayImage() {
    //   if (this.product().image) {
    //     return this.product().image;
    //   } else {
    //     return "../img/no-image.jpg";
    //   }
    // },
    // harga() {
    //   if (this.product().harga) {
    //     let harga =
    //       "Rp " + new Intl.NumberFormat().format(this.product().harga);
    //     return harga;
    //   } else {
    //     return "data tidak ditemukan";
    //   }
    // }
  },
  watch: {
    // user: {
    //   immediate: true,
    //   handler() {
    //     this.getProfile();
    //   }
    // }
    // imageName: {
    //   immediate: true,
    //   handler() {
    //     this.pickFile();
    //   }
    // }
  },
  methods: {
    // product() {
    //   // let product;
    //   const id = new Intl.NumberFormat().format(this.$route.params.id);
    //   console.log("route : ", this.$route.params.id);
    //   console.log("id : ", id);
    //   for (let index = 0; index < this.products.length; index++) {
    //     if (this.products[index].id == id) {
    //       console.log("products : ", this.products[index]);
    //       return this.products[index];
    //     }
    //     // console.log("product : ", product);
    //     // return product;
    //   }
    // }
  }
};
</script>
<style scoped>
.profile {
  padding: 3rem 0.3rem 3rem 0.3rem;
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

/* Avatar */
.avatar-profile {
  padding: 0.25rem;
  overflow: hidden;
  background-color: white;
  border-radius: 5px;
}
img.avatar-ku {
  width: 100%;
  border-radius: 5px;
}
/* -=========================================================== */
.edit-avatar {
  position: absolute;
  left: 11px;
  top: 10px;
  /* text-align: center;  */
}

.edit-avatar input {
  display: none;
}
.edit-avatar label {
  display: inline-block;
  width: 100%;
  height: 34px;
  color: black;
  padding: 1px;
  background: #00ffec61;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}
.file-cta {
  display: inline-flex;
  width: 100%;
  /* height: 34px; */
  color: black;
  padding: 0px;
  background: #00ffec61;
  border: 1px solid transparent;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  font-weight: normal;
  transition: all 0.2s ease-in-out;
}

.edit-avatar label:hover {
  background: grey;
  border-color: #d6d6d6;
  color: white;
}
.edit-avatar label:after {
  /* content: "\f007";
        font-family: 'Font Awesome 5 Free'; */
  color: white;
  position: absolute;
  /* top: 10px; */
  left: 0;
  right: 0;
  text-align: center;
  margin: auto;
}
</style>
