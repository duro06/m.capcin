<template>
  <div class="order">
    <div class="isi" v-if="Order.length">
      <div class="pegulangan" v-for="(item, n) in Order" :key="n">
        <OrderCard :data="item" />
      </div>
    </div>
    <div class="kosong" v-else>
      <Empty />
    </div>
  </div>
</template>
<script>
import OrderCard from "@/components/element/OrderCard";
import Empty from "@/components/element/EmptyPage";
import { mapState } from "vuex";
// import Pusher from "pusher-js";

export default {
  name: "order",
  components: { OrderCard, Empty },
  data() {
    return {
      items: [],
      details: [],
      id: null
    };
  },
  mounted() {
    this.ambilData();
    // this.subscribe();
  },

  computed: {
    ...mapState(["profile", "Order"])
  },
  watch: {
    getID() {
      if (this.profile.id) {
        this.ambilData();
      }
    }
  },
  methods: {
    // Fungsinya pusher
    ambilData() {
      this.$store.dispatch("ambilOrder");
    },
    updateData() {
      // let id = this.profile.id;
      this.$$nextTick(() => {
        this.ambilData();
        // if (id) {
        // }
      });
    }
  }
};
</script>
<style scoped>
.order {
  padding-bottom: 55px;
}
</style>
