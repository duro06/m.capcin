<template>
  <input type="string" v-model="model" class="input is-primary is-small" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    model: {
      get() {
        // We extract decimal number, beacause toLocaleString will automagically
        // remove the dot and zeros after it while the user is still typing
        let value = this.value.split(".");
        let decimal = typeof value[1] !== "undefined" ? "." + value[1] : "";

        return Number(value[0]).toLocaleString("en-GB") + decimal;
      },

      set(newValue) {
        this.$emit("input", newValue.replace(/,/g, ""));
      }
    }
  }
};
</script>
