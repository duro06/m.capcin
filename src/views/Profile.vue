<template>
  <div class="container">
    <div class="has-text-centered">
      <div>
        <div>
          <div class="card">
            <div class="avatar-profile">
              <div class="card-image">
                <figure class="image is-4by5">
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
                    <img :src="displayImage" alt="Placeholder image" />
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
// import myInput from "../components/element/myInput";
export default {
  name: "profile",
  // components: { myInput },
  data() {
    return {
      user: "",
      displayImage: "",
      editAvatar: "",
      imageUrl: "",
      imageName: ""
      // files: []
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
    // imageName: {
    //   immediate: true,
    //   handler() {
    //     this.pickFile();
    //   }
    // }
  },
  methods: {
    previewFiles(event) {
      // this.files = this.$refs.myFiles.files;
      console.log(event);
    },
    cobaLah(event) {
      // this.imageUrl = this.$refs.editAvatar;
      console.log(event.target.files);
    },
    getProfile() {
      console.log("Profile Updated ", this.profile);
      let user = this.profile;
      this.user = user;
      if (user.image != null) {
        this.displayImage = this.serverImage + user.image;
      } else {
        this.displayImage = this.serverImage + "galleries_images/nouser.png";
      }
    },

    pickFile() {
      const fileInput = document.querySelector("#gambar input[type=file]");
      fileInput.onchange = () => {
        if (fileInput.files.length > 0) {
          const fileName = document.querySelector("#gambar .file-name");
          fileName.textContent = fileInput.files[0].name;
        }
      };
    },
    attachImage: async function() {
      console.log("Ane jalan bos, situ salah");
      this.user.image = this.$refs.editAvatar.files[0];
      let reader = new FileReader();

      reader.addEventListener(
        "load",
        function() {
          this.$refs.displayAvatarImage.src = reader.result;
        }.bind(this),
        false
      );

      reader.readAsDataURL(this.user.image);

      const formData = new FormData();
      formData.append("image", this.user.image);
      formData.append("_method", "put");

      try {
        const response = await auth.updateImage(this.user.id, formData);
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
/* .gambar {
  padding: 1rem 1rem 0rem 1rem;
} */
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
