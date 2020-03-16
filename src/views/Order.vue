<template>
  <div class="order">
    <div class="isi" v-if="items.length">
      <div class="pegulangan" v-for="(item, n) in items" :key="n">
        <OrderCard :data="item" />
      </div>
    </div>
    <div class="kosong" v-else>
      <Empty />
    </div>
  </div>
</template>
<script>
import * as ord from "@/services/order_service";
import OrderCard from "@/components/element/OrderCard";
import Empty from "@/components/element/EmptyPage";
import { mapState } from "vuex";

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
    // this.getID();
  },

  computed: {
    ...mapState(["profile"])
  },
  watch: {
    getID() {
      if (this.profile.id) {
        this.ambilData();
      }
    }
  },
  methods: {
    ambilData: async function() {
      this.$store.commit("loading");
      let id = this.profile.id;
      if (id) {
        this.id = id;
      } else {
        this.id = localStorage.getItem("mie");
      }
      let params = {
        params: {
          q: this.id
        }
      };

      try {
        const res = await ord.getOrder(params);
        this.items = res.data.data.data;
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
      }
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
