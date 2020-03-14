<template>
  <div class="order">
    <div class="pegulangan" v-for="(item, n) in items" :key="n">
      <OrderCard :data="item" />
    </div>
  </div>
</template>
<script>
import * as order from "../services/order_service";
import OrderCard from "../components/element/OrderCard";
import { mapState } from "vuex";

export default {
  name: "order",
  components: { OrderCard },
  data() {
    return {
      items: []
    };
  },
  created() {
    this.ambilData();
  },
  computed: {
    ...mapState(["profile"])
  },
  methods: {
    ambilData: async function() {
      this.$store.commit("loading");
      let id = this.profile.id;
      try {
        const res = await order.order(id);
        this.items = res.data.data.data;
        console.log(this.items);
        this.$store.commit("notLoading");
      } catch (e) {
        console.log(e);
        this.$store.commit("notLoading");
      }
    }
  }
};
</script>
<style scoped>
.order {
  padding-bottom: 55px;
}
</style>
