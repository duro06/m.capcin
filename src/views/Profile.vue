<template>
  <div class="profile">
    <div class="edit-avatar">
      <input type="file" ref="editAvatar" id="image" @change="attachImage" />
      <label for="image"><i class="fa fa-pencil-alt"></i> </label>
    </div>
    <div class="avatar-profile">
      <div class="card-image">
        <figure class="image">
          <img
            class="avatar-ku"
            :src="displayImage"
            ref="displayAvatarImage"
            alt="avatar"
          />
        </figure>
      </div>
    </div>
    <div class="detail-profile">
      <div class="headline">
        <div class="tempat-nama">
          <h1 class="has-text-centered"><b>{{ user.name }}</b></h1>
        </div>
        <div class="tempat-button">
          <button
            class="button is-fullwidth is-success"
            @click.prevent="editProfile"
          >
            <i class="fa fa-pencil-alt"></i> <span> Edit Profile</span>
          </button>
        </div>
      </div>
      <div class="content-profile">
        <p>
          <span class="icon is-medium has-text-success">
            <i class="fas fa-handshake"></i>
          </span>
          {{ user.role }} Capcin
        </p>
        <p>
          <span class="icon is-medium has-text-success">
            <i class="fas fa-envelope"></i>
          </span>
          {{ user.email }}
        </p>
        <p>
          <span class="icon is-medium has-text-success">
            <i class="fas fa-address-card"></i>
          </span>
          {{ user.alamat == null? "data belum ada": user.alamat }}
        </p>
        <p>
          <span class="icon is-medium has-text-success">
            <i class="fas fa-clock"></i>
          </span>
          {{ user.created_at }}
        </p>
      </div>
    </div>
    <Modal v-if="showModal" @close="handleModal">
      <header slot="header" class="modal-card-head fadeInUp">
        <p class="modal-card-title  fadeInUp">
          Update Profile
        </p>
        <button
          class="delete"
          aria-label="close"
          @click.prevent="handleModal"
        ></button>
      </header>
      <section slot="body" class="modal-card-body  fadeInUp">
        <div class="content">
          <div class="kotak">
            <label class="isi-kotak" for="input">Nama </label>
            <input
              class="isi-kotak input is-small"
              type="text"
              v-model="user.name"
            />
          </div>
          <div class="kotak">
            <label class="isi-kotak" for="input">Email </label>
            <input
              class="isi-kotak input is-small "
              type="text"
              v-model="user.email"
            />
          </div>
          <div class="kotak">
            <label class="isi-kotak" for="input">Alamat </label>
            <input
              class="isi-kotak input is-small "
              type="text"
              v-model="user.alamat"
            />
          </div>
        </div>
      </section>
      <footer slot="footer" class="modal-card-foot  fadeInUp">
        <button
          class="button is-success fadeInUp is-small"
          @click.prevent="saveModal"
          :disabled="disable"
        >
          Save changes
        </button>
        <button class="button  fadeInUp is-small" @click.prevent="handleModal">
          Cancel
        </button>
      </footer>
    </Modal>
    <!-- <Footer class="navbar" /> -->
  </div>
</template>
<script>
// import { getProfile } from "@/services/auth_service";
import { mapState, mapGetters } from "vuex";
import * as auth from "@/services/auth_service";
import Modal from "@/components/element/Modal.vue";
// import Footer from "@/components/element/bulmaFooter";

export default {
  name: "profile",
  components: {
    Modal
    //  Footer
  },
  data() {
    return {
      user: "",
      showModal: false, // modal tampil atau tidak
      errors: [],
      disable: false
    };
  },

  beforeCreate: async function() {
    try {
      const response = await auth.getProfile(); // ambil profile
      this.$store.dispatch("aunthenticate", response.data); // panggil action untuk manuliskan data
      this.user = response.data;
      this.errors = [];
    } catch (error) {
      this.errors = error;
    }
  },
  computed: {
    ...mapState(["profile", "token"]),
    ...mapGetters(["storageUrl"])
    // loading() {
    //   if (this.user.image != "" || this.user.image != undefined) {
    //     console.log("not Loading");
    //     return this.$store.commit("notLoading");
    //   } else {
    //     console.log("not Loading");
    //     return this.$store.commit("loading", "terserah");
    //   }
    // }
  },
  watch: {
    user: {
      immediate: true,
      handler() {
        this.getProfile();
      }
    }
    // imageName: {
    //   immediate: true,
    //   handler() {
    //     this.pickFile();
    //   }
    // }
  },
  mounted() {
    this.$store.commit("loading");
  },
  methods: {
    editProfile() {
      this.showModal = true;
      this.disable = false;
    },
    handleModal() {
      this.showModal = false;
    },
    saveModal: async function() {
      this.$store.commit("loading");
      try {
        this.disable = true;
        const response = await auth.updateProfile(this.user.id, this.user);
        this.$store.commit("notLoading");
        this.flashMessage.success({
          message: "Profile Updated successfully!",
          time: 5000
        });
        this.user = response.data;
        // this.getProfile()
      } catch (error) {
        switch (error.response.status) {
          case 422:
            this.errors = error.response.data.errors;
            break;

          default:
            this.flashMessage.error({
              message: "Some error occured, Please Try Again!",
              time: 5000
            });
            break;
        }
      }
      this.showModal = false;
    },
    getProfile() {
      if (!this.profile.length) {
        this.$store.commit("loading");
      }
      let user = this.profile;
      this.user = user;
      if (
        user.image != undefined &&
        user.image != null &&
        user.image != "null"
      ) {
        this.displayImage = `${this.storageUrl}` + `${user.image}`;
        this.$store.commit("notLoading");
      } else {
        this.displayImage = "../img/nouser.png";
        this.$store.commit("notLoading");
      }
    },

    attachImage: async function() {
      this.$store.commit("loading");
      this.user.image = this.$refs.editAvatar.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.$refs.displayAvatarImage.src = reader.result;
          // this.$refs.miniDisplayAvatarImage.src = reader.result;
        }.bind(this),
        false
      );

      reader.readAsDataURL(this.user.image);

      const formData = new FormData();
      formData.append("image", this.user.image);
      formData.append("_method", "put");

      try {
        const response = await auth.updateImage(this.user.id, formData);
        this.$store.commit("notLoading");
        this.flashMessage.success({
          message: "Avatar has been updated successfully!",
          time: 5000
        });
        this.user.image = response.data.image;
      } catch (error) {
        this.flashMessage.error({
          message: error.response.data.message,
          time: 5000
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.profile {
  background-color: grey;
  padding-top: 40px;
}
/* Avatar */
.avatar-profile {
  /* padding: 0.25rem;
  overflow: hidden;
  background-color: white;
  border-radius: 5px; */
  width: 160px;
  height: 160px;
  /* border-radius: 100%; */
  /* position: absolute; */
  margin-left: auto;
  margin-right: auto;
}
img.avatar-ku {
  /* padding-top: 40px; */
  /* width: 100%; */
  width: 160px;
  height: 160px;
  border-radius: 100%;
  border: 5px solid #fff;
}

.card-image {
  display: block;
  position: relative;
  z-index: 1;
}

.detail-profile {
  position: relative;
  background-color: white;
  min-height: 650px;
  // border-radius: 20px;
  top: -80px;
  .headline {
    padding-top: 80px;
  }
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


/* -=========================================================== */
.edit-avatar {
  position: absolute;
  left: 58%;
  z-index: 10;
}

.edit-avatar input {
  display: none;
}
.edit-avatar label {
  display: inline-block;
  width: 40px;
  height: 40px;
  color: black;
  padding: 5px;
  padding-left: 12px;
  background: grey;
  border: 2px solid white;
  border-radius: 50%;
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
.tempat-button {
  margin-top: 10px;
  margin-bottom: 10px;
}
.content-profile {
  padding: 10px;
}

</style>
