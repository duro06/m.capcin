<template>
  <label>
    {{ label }}
    <input
      type="file"
      v-bind:value="value"
      v-on:change="$emit('input', $event.target.value)"
    />
  </label>
</template>
<script>
export default {
  name: "myInput",
  props: ["label", "value"]
};
</script>
