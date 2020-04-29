<template>
  <div class="packing">
    <h1>Tugas anda</h1>
    <Empty v-if="!packingOrders.length" />
    <div class="isi" v-else v-for="(item, n) in packingOrders" :key="n">
      <Packing :data="item" />
    </div>
  </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "packing",
  components: {
    Packing: () => import("@/components/role/Packing.vue"),
    Empty: () => import("@/components/element/EmptyPage")
  },
  created() {
    this.getPackingOrder();
  },
  computed: {
    ...mapState("pack", {
      packingOrders: state => state.packingOrders
    })
  },
  methods: {
    ...mapActions("pack", ["getPackingOrder"])
  }
};
</script>
<style lang="scss" scoped>
/* .isi {
  display: block;
  width: -webkit-fill-available;
  background-color: rgb(252, 255, 75);
} */
.isi-ikon {
  color: #42b549;
}
.ikon {
  align-items: center;
  justify-content: center;
  display: flex;
}
.packing {
  margin: 20px 15px 60px 15px;
  background-color: whitesmoke;
  h1 {
    padding-bottom: 10px;
    font-weight: 500;
  }
}
.packing-isi {
  padding-bottom: 20px;
}
</style>
