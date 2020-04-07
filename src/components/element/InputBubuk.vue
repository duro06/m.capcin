<template>
  <div class="form">
    <div class="columns is-mobile">
      <div class="column is-5">
        <label class="label">{{ item.bubuk.nama }}</label>
      </div>
      <div class="column is-3">
        <p class="control">
          <input type="number" class="input is-small" v-model.number="data" />
        </p>
      </div>
      <div class="column is-4">
        <button
          @click.prevent="isi"
          class="button warna-tema is-small"
          :disabled="isi_awal"
        >
          simpan
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "input-bubuk",
  props: { item: Object },
  data() {
    return { data: this.item.stok_awal, isi_awal: false };
  },
  methods: {
    isi() {
      console.log(this.item.id);
      this.isi_awal = true;
      this.$emit("input", {
        data: this.data,
        id: this.item.id,
        nama: this.item.bubuk.nama
      });
    }
  }
};
</script>
