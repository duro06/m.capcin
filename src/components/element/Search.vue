<template>
  <!-- <keep-alive> -->
  <div class="cari">
    <div class="field">
      <div :class="['control', 'has-icons-left', load]">
        <input
          class="input is-small"
          type="string"
          placeholder="Cari"
          v-model="cari"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </div>
    </div>
  </div>
  <!-- </keep-alive> -->
</template>
<script>
export default {
  name: "search",
  props: {
    value: {
      type: String,
      required: true
    },
    load: String
  },
  data() {
    return { loading: "", hasil: "" };
  },
  computed: {
    cari: {
      get() {
        let value = this.value;
        return value;
      },
      set(newValue) {
        this.$emit("search", newValue);
      }
    }
  }
};
</script>
