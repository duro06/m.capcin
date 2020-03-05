<template>
  <div class="produk">
    <article class="message is-primary is-small">
      <div class="message-header">
        <p>{{ name }}</p>
        <button
          class="button is-small is-info"
          aria-label="Edit"
          @click.prevent="edit"
        >
          Edit
        </button>
      </div>
      <div class="notification is-info is-light">
        <p class="title is-7 ">Harga : {{ harga }}</p>
        <p class="title is-7">Stok awal : {{ message }}</p>
      </div>
    </article>
  </div>
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
    },
    dataImageSmall: function() {
      if (this.data.image) {
        return this.data.image;
      } else {
        return "https://bulma.io/images/placeholders/96x96.png";
      }
    },
    name: function() {
      if (this.data.nama) {
        return this.data.nama;
      } else {
        return "";
      }
    },
    harga: function() {
      if (this.data.harga_beli) {
        let harga =
          "Rp " +
          new Intl.NumberFormat().format(this.data.harga_beli) +
          " / " +
          this.data.unit.nama;
        return harga;
      } else {
        return "";
      }
    },
    message: function() {
      // console.log(this.data);
      if (this.data.stok_awal) {
        return this.data.stok_awal;
      } else {
        return "";
      }
    }
  },
  methods: {
    print() {
      console.log(this.data);
    },
    edit() {
      this.$emit("edit");
    }
  }
};
</script>
<style scoped>
article {
  padding: 5px 5px 5px 5px;
  background-color: #f14668;
}
</style>
