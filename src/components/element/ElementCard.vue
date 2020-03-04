<template>
  <keep-alive>
    <div class="card">
      <div class="card-image">
        <figure class="image is-4by3">
          <img :src="dataImageBig" alt="Placeholder image" />
        </figure>
      </div>
      <!-- <div class="card-content">
        <div class="media">
           <div class="media-left">
      <figure class="image is-48x48">
       <img :src="dataImageSmall" alt="Placeholder image" />
      </figure>
     </div>
          <div class="media-content">
            <p class="title is-6" style="color: black">{{ name }}</p>
            <p class="subtitle is-7" style="color: black">{{ email }}</p>
          </div>
        </div>
        <div class="content">
          {{ message }}
          <br />
          <time datetime="now"></time>
        </div>
      </div> -->
    </div>
  </keep-alive>
</template>
<script>
export default {
  name: "card2",
  props: { data: Object },
  computed: {
    dataImageBig: function() {
      if (this.data.image) {
        return this.data.image;
      } else {
        return "https://bulma.io/images/placeholders/1280x960.png";
      }
    }
    // dataImageSmall: function() {
    //   if (this.data.image) {
    //     return this.data.image;
    //   } else {
    //     return "https://bulma.io/images/placeholders/96x96.png";
    //   }
    // },
    // name: function() {
    //   if (this.data.name) {
    //     return this.data.name;
    //   } else {
    //     return "";
    //   }
    // },
    // email: function() {
    //   if (this.data.email) {
    //     return this.data.email;
    //   } else {
    //     return "";
    //   }
    // },
    // message: function() {
    //   if (this.data.message) {
    //     return this.data.message;
    //   } else {
    //     return "";
    //   }
    // }
  }
};
</script>
<style scoped></style>
