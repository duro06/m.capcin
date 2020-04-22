<template>
  <div class="shipping-order">
    Laporan pengiriman
    <!-- <empty v-if="!tasks.length" />
    <div v-else class="isi" v-for="(task, n) in tasks" :key="n">
      <shipping :data="task" />
    </div> -->
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "shipping-order",
  // components: {
  //   shipping: () => import("@/components/role/Supplier.vue"),
  //   empty: () => import("@/components/element/EmptyPage")
  // },
  computed: {
    ...mapState("shipping", {
      tasks: state => state.shipping
    })
  }
};
</script>
