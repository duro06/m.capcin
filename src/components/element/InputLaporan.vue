<template>
  <div class="form">
    <div class="columns is-mobile">
      <div class="column is-4">
        <label class="label">{{ item.bubuk.nama }}</label>
      </div>
      <div class="column is-3">
        <p class="control">
          <input type="number" class="input is-small" v-model.number="data" />
        </p>
      </div>
      <div class="column is-5">
        <button
          @click.prevent="isi"
          class="button warna-tema is-small"
          :disabled="isi_laporan"
        >
          simpan
        </button>
        <button @click.prevent="edit" class="button warna-tema is-small">
          Edit
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
    return { data: 0, isi_laporan: false };
  },
  methods: {
    edit() {
      this.isi_laporan = false;
    },
    isi() {
      this.isi_laporan = true;
      if (this.data != null && this.data != "" && this.data != 0) {
        this.$emit("input", {
          keluar: this.data,
          item_mitra_id: this.item.id
          // nama: this.item.bubuk.nama
        });
      } else if (this.data == 0) {
        this.data = 0;
        this.$emit("input", {
          keluar: this.data,
          item_mitra_id: this.item.id
          // nama: this.item.bubuk.nama
        });
        this.flashMessage.warning({
          message:
            "Penjualan bubuk rasa " +
            this.item.bubuk.nama +
            " nol, anda yakin dengan laporan anda?",
          time: 5000
        });
      } else {
        this.data = 0;
        this.$emit("input", {
          keluar: this.data,
          item_mitra_id: this.item.id
          // nama: this.item.bubuk.nama
        });
        this.flashMessage.error({
          message: "Penjualan bubuk rasa " + this.item.bubuk.nama + " kosong",
          time: 3000
        });
      }
    }
  }
};
</script>
