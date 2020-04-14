<template>
  <div class="pack-order">
    <Empty v-if="!packingOrders.length" />
    <div class="isi" v-else v-for="(item, n) in packingOrders" :key="n">
      <Packing :data="item" />
    </div>
  </div>
</template>
<script>
import Empty from "@/components/element/EmptyPage";
import { mapState } from "vuex";
import Packing from "@/components/role/Packing.vue";

export default {
  name: "packorder",
  components: {
    Empty,
    Packing
  },
  computed: {
    ...mapState("pack", {
      packingOrders: state => state.packingOrders
    })
  }
};
</script>
<style scoped>
.pack-order {
  padding: 15px 15px 60px 15px;
}
.isi {
  padding: 10px 0px;
}
</style>
