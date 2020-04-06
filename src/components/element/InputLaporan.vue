<template>
  <div class="form">
    <div class="columns is-mobile">
      <div class="column is-6">
        <label class="label">{{ item.bubuk.nama }}</label>
      </div>
      <div class="column is-6">
        <p class="control">
          <input
            type="number"
            class="input is-small"
            @change="isi"
            v-model="data"
          />
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "input-bubuk",
  props: { item: Object },
  data() {
    return { data: 0 };
  },
  methods: {
    isi() {
      this.$emit("input", {
        data: this.data,
        id: this.item.id,
        nama: this.item.bubuk.nama
      });
    }
  }
};
</script>
