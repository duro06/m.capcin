<template>
  <section class="hero is-fullheight is-flex-mobile">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="box form-control">
          <div class="field fadeInUp">
            <figure class="avatar">
              <img src="../../assets/logocapcin.png" />
            </figure>
          </div>
          <form
            action="#"
            @submit.prevent="register"
            class="is-light is-danger has-text-left"
          >
            <div class="field fadeInUp">
              <div class="field">
                <div class="control has-icons-left">
                  <input
                    @change="NameValidation"
                    :class="['input', className, 'is-small']"
                    type="name"
                    placeholder="Nama"
                    name="name"
                    autocomplete="on"
                    v-model="user.name"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-portrait"></i>
                  </span>
                </div>
                <p :class="['help', 'align-left', className]">
                  {{ validName }}
                </p>
              </div>
            </div>

            <div class="field fadeInUp">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    @change="formValidation"
                    :class="['input', classDanger, 'is-small']"
                    type="email"
                    name="email"
                    autocomplete="on"
                    placeholder="Email"
                    v-model="user.email"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <span
                    class="icon is-small is-right"
                    :style="{ visibility: visClass }"
                  >
                    <i class="fas fa-exclamation-triangle"></i>
                  </span>
                </div>
                <p :class="['help', 'align-left', classDanger]">
                  {{ validMail }}
                </p>
              </div>
            </div>

            <div class="field fadeInUp">
              <div class="field">
                <div class="control has-icons-left">
                  <div :class="['select', valSelect, 'is-small']">
                    <select v-model="user.role" @change="validasiSelect">
                      <option value="">Pilih bagian</option>
                      <option v-for="(level, t) in levels" :key="t">
                        {{ level.nama }}
                      </option>
                    </select>
                  </div>
                  <span class="icon is-small is-left">
                    <i class="far fa-id-card"></i>
                  </span>
                </div>
                <p
                  :class="['help', 'align-left', 'is-danger']"
                  :style="{ display: classSelect }"
                >
                  {{ validSelect }}
                </p>
              </div>
            </div>

            <div class="field fadeInUp">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    @change="passOk"
                    :class="['input', validPass, 'is-small']"
                    type="password"
                    placeholder="Password"
                    v-model="user.password"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <span
                    class="icon is-small is-right is-success"
                    :style="{ visibility: visPass }"
                  >
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                <p :class="['help', 'lign-left', validPass]">{{ passCheck }}</p>
              </div>
            </div>

            <div class="field fadeInUp">
              <div class="field">
                <div class="control has-icons-left has-icons-right">
                  <input
                    :class="['input', classKonfirm, 'is-small']"
                    type="password"
                    placeholder="Konfirmasi Password"
                    v-model="user.password_confirmation"
                  />
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <span
                    class="icon is-small is-right is-success"
                    :style="{ visibility: kPass }"
                  >
                    <i class="fas fa-check"></i>
                  </span>
                </div>
                <p :class="['help', 'lign-left', konfirm()]">
                  {{ passKonfirm }}
                </p>
              </div>
            </div>

            <div class="field fadeInUp">
              <div class="has-text-centered">
                <button
                  :class="[
                    'button',
                    'is-vcentered',
                    'is-primary',
                    'is-outlined',
                    loading,
                    'is-small',
                    'is-rounded'
                  ]"
                  @click.prevent="register"
                >
                  Daftar
                </button>
              </div>
            </div>
          </form>
        </div>
        <div class="field fadeInUp">
          <div class="has-text-centered">
            <router-link :to="{ path: '/login' }">
              Sudah Punya Akun?
              <strong style="text-decoration:underline;">Log in</strong>
              Sekarang !
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import * as pusher from "@/services/pusher_service.js";
export default {
  name: "signup",
  data() {
    return {
      // data User
      user: {
        name: "",
        email: "",
        role: "",
        password: "",
        password_confirmation: ""
      },
      //validasi nama
      className: "",
      validName: "",
      //validasi email
      classDanger: "",
      visClass: "hidden",
      validMail: "",
      // pilihan Role
      levels: [
        // { id: "", nama: "Pilih bagian" },
        { id: 3, nama: "Produksi" },
        { id: 4, nama: "Packing" },
        { id: 5, nama: "Supplier" },
        { id: 6, nama: "Mitra" }
      ],
      //validasi select
      valSelect: "",
      classSelect: "hidden",
      validSelect: "",
      //validasi password
      validPass: "",
      visPass: "hidden",
      passCheck: "",
      //validasi konfirmasi password
      classKonfirm: "",
      kPass: "hidden",
      passKonfirm: "",

      loading: "", // kelas bulma button spinner 'is-loading'
      Vmail: false, //boolean validasi email
      Vpass: false, //boolean validasi password
      // validasi usernama, ga di pake sekarang, tapi simpen dulu aja
      reg2: /^[a-z0-9]+$/i,
      // validasi email
      reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
    };
  },
  // backup plan kalo gagal redirect ke halaman waiting, untuk menuggu verifikasi
  updated() {
    if (localStorage.getItem("waiting_verivication")) {
      this.$router.replace(this.$route.query.redirect || "/waiting");
    }
  },
  methods: {
    register: function() {
      // shortcut this
      const vm = this;
      //jika email dan password valid
      if (vm.Vpass == true && vm.Vmail == true && this.user.role != "") {
        vm.loading = "is-loading"; // button spinner enable
        //panggil fungsi "register" di action nya vuex, bawa data user
        vm.$store
          .dispatch("register", this.user)
          .then(response => {
            pusher.register(response.data.data.id);
            console.log("response id", response.data.data.id);
            // panggil fungsi "retriveVerivie" di action nya Vuex, bawa apa aja buat di tarun d locak storage
            // vm.$store.dispatch("retrieveVerifie", "response");
            console.log("respose", response);
            // tampilkan flas message
            this.flashMessage.success({
              message: response.data.message,
              time: 5000
            });
            vm.loading = ""; // button spinner
            this.errors = [];
            this.$router.replace({ name: "waiting" }, () => {}); // arahkan ke halaman waiting untuk menuggu verifikasi
          })
          .catch(error => {
            if (error) {
              //jika email sudah ada yang pake kosongkan dah kasih tanda
              // console.log(error.response.data.errors);
              let email = error.response.data.errors.email;
              let role = error.response.data.errors.role;
              switch (error.response.status) {
                case 422:
                  if (email) {
                    this.user.email = "";
                    this.mailString(
                      "is-danger",
                      "visible",
                      error.response.data.errors.email[0] +
                        "\n" +
                        " Please use another email address",
                      false
                    );
                  }
                  if (role) {
                    this.valSelect = "is-danger";
                    this.classSelect = "inherit";
                    this.validSelect =
                      error.response.data.errors.role[0] +
                      "\n" +
                      " Please choose one";
                  }

                  this.errors = error.response.data.errors;
                  break;
                case 500:
                  this.flashMessage.error({
                    message: error.response.data.message + " Please refresh",
                    time: 5000
                  });
                  break;
                default:
                  this.flashMessage.error({
                    message: "Some error occured, Please Try Again!",
                    time: 5000
                  });
                  break;
              }

              vm.loading = ""; // button spinner disable
            }
          })
          .then(function() {
            // always executed
          });
        //jika tidak cek semua data, jika ada salahsatu yang kosong panggil semua validasi
      } else if (
        vm.user.name == "" ||
        vm.user.email == "" ||
        vm.user.role == "" ||
        vm.slected == "" ||
        vm.user.password == ""
      ) {
        vm.NameValidation();
        vm.validasiSelect();
        vm.formValidation();
        vm.passOk();
        this.flashMessage.error({
          message: "silahkan isi dahulu yang belum di isi",
          time: 5000
        });
      } else {
        this.flashMessage.error({
          message: "silahkan isi dahulu yang belum di isi",
          time: 5000
        });
      }
    },
    //= ===================== ngisi pesan aja ===============
    mailString(kelas, visib, pesan, pass) {
      const vm = this;
      vm.classDanger = kelas;
      vm.visClass = visib;
      vm.validMail = pesan;
      vm.Vmail = pass;
    },
    passString(kelas, visib, pesan, pass) {
      const vm = this;
      vm.validPass = kelas;
      vm.visPass = visib;
      vm.passCheck = pesan;
      vm.Vpass = pass;
    },
    //= ===================== Validasi nama ===============
    NameValidation() {
      if (this.name == "") {
        this.className = "is-danger";
        this.validName = "Nama tidak boleh kosong";
      } else {
        this.className = "";
        this.validName = "";
      }
    },
    //= ===================== Validasi Level ===============

    validasiSelect() {
      if (this.user.role == "") {
        this.valSelect = "is-danger";
        this.classSelect = "inherit";
        this.validSelect = "Tidak boleh kosong";
      } else {
        this.valSelect = "";
        this.classSelect = "none";
        this.validSelect = "Tidak boleh kosong";
      }
    },
    // //====================== Validasi konfirm password ===============
    konfirm() {
      const vm = this;
      if (
        vm.user.password != vm.user.password_confirmation &&
        vm.user.password_confirmation != ""
      ) {
        vm.classKonfirm = "is-danger";
        vm.kPass = "hidden";
        vm.passKonfirm = "Tidak sama";
        vm.Vpass = false;
      } else if (
        vm.user.password == vm.user.password_confirmation &&
        vm.user.password_confirmation != ""
      ) {
        vm.classKonfirm = "is-success";
        vm.kPass = "visible";
        vm.passKonfirm = "";
        vm.Vpass = true;
      } else {
        vm.classKonfirm = "";
        vm.kPass = "hidden";
        vm.passKonfirm = "";
      }
    },
    //= ================ validasi email =====================
    formValidation: function() {
      const vm = this;
      if (vm.user.email != "") {
        if (vm.reg.test(vm.user.email) == false) {
          vm.mailString(
            "is-danger",
            "visible",
            "periksa kembali email anda",
            false
          );
        } else if (vm.reg.test(vm.user.email) == true) {
          vm.mailString("is-success", "hidden", "", true);
        }
      } else if (vm.user.email >= 80) {
        vm.mailString(
          "is-danger",
          "visible",
          "tidak boleh lebih dari 80 karakter",
          false
        );
      } else {
        vm.mailString("", "hidden", "", false);
      }
      return vm.classDanger;
    },
    //= ================== validasi Password ==================
    passOk: function() {
      const vm = this;
      if (vm.user.email != "" && vm.validMail == "" && vm.user.password != "") {
        if (vm.user.password.length <= 5) {
          vm.passString(
            "is-danger",
            "hidden",
            "password anda kurang dari 6 karakter",
            false
          );
        } else {
          vm.passString("is-success", "visible", "", true);
        }
      } else if (vm.user.password != "" && vm.user.email == "") {
        vm.passString("is-danger", "hidden", "Email anda kosong", false);
      } else if (vm.user.password != "" && vm.validMail != "") {
        vm.passString("is-danger", "hidden", "Email anda belum valid", false);
      } else if (vm.user.password == "" && vm.user.email != "") {
        vm.passString(
          "is-warning",
          "hidden",
          "Password tidak boleh kosong",
          false
        );
      } else {
        vm.passString("", "hidden", "", false);
      }
      return vm.validPass;
    }
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

/* @import "../../assets/css/login.css"; */
.hero-body {
  padding-top: 20px;
  padding-bottom: 20px;
}

img {
  width: 20%;
  height: auto;
}
.slide-fade-enter-active {
  transition: all 0.8s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
