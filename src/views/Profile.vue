<template>
  <div class="profile">
    <div class="has-text-centered">
      <div class="card">
        <div class="avatar-profile">
          <div class="card-image">
            <figure class="image is-480x480">
              <img
                class="avatar-ku"
                :src="displayImage"
                ref="displayAvatarImage"
                alt="avatar"
              />
            </figure>
          </div>
          <div class="edit-avatar">
            <input
              type="file"
              ref="editAvatar"
              id="image"
              @change="attachImage"
            />
            <!-- <input type="file" id="image" @change="previewFiles" /> -->
            <label for="image"> Change Avatar </label>
            <!-- <myInput id="image" @input="onFilePicked" /> -->
          </div>
        </div>

        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  :src="displayImage"
                  alt="avatar"
                  ref="miniDisplayAvatarImage"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-6" style="color: black">{{ user.name }}</p>
              <p class="subtitle is-7" style="color: black">
                {{ user.email }}<br />
                {{ user.alamat }}<br />
                {{ user.role }} Capcin
              </p>
            </div>
            <div class="media-content">
              <button
                class="button is-info is-small"
                @click.prevent="editProfile"
              >
                edit
              </button>
            </div>
          </div>
        </div>
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
          this.$refs.miniDisplayAvatarImage.src = reader.result;
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
