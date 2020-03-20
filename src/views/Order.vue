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
    <div
      v-infinite-scroll="Scroll"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="50"
      infinite-scroll-throttle-delay="100"
    ></div>
    <!-- <button
      class="button transparent is-loading is-fullwidth is-large"
      v-if="moreExist"
    >
      ...is loading
    </button> -->
  </div>
</template>
<script>
import OrderCard from "@/components/element/OrderCard";
// import OrderFocus from "@/components/element/OrderFocus";
import Empty from "@/components/element/EmptyPage";
import { mapState } from "vuex";
import * as ord from "@/services/order_service";

export default {
  name: "order",
  components: { OrderCard, Empty },

  data() {
    return {
      items: [],
      details: [],
      id: null,
      current: 1,
      last: null,
      moreExist: false,
      busy: false
    };
  },
  mounted() {
    this.ambilData();
  },

  computed: {
    ...mapState(["profile", "orderFocus"])
  },
  // watch: {
  //   getID() {
  //     if (this.profile.id) {
  //       this.ambilData();
  //     }
  //   }
  // },
  methods: {
    removeFocus() {
      this.$store.commit("setOrderFocus", {});
    },
    Scroll: function() {
      if (this.moreExist) {
        this.moreExist = false;

        this.ambilLagi(); //jalankan fungsi Load more
      }
    },
    // Fungsinya pusher
    ambilData: async function() {
      this.busy = true;
      this.$store.commit("loading");
      let id = this.profile.id;
      let ID;
      if (id) {
        ID = id;
      } else {
        ID = localStorage.getItem("mie");
      }

      let params = {
        params: {
          q: ID
        }
      };

      try {
        const res = await ord.getOrder(params);
        this.items = res.data.data.data;
        let par = res.data.data;
        this.current = par.current_page;
        this.last = par.last_page;

        this.$store.commit("notLoading");
        this.busy = false;
      } catch (e) {
        this.$store.commit("notLoading");
        this.busy = false;
      }
    },
    ambilLagi: async function() {
      this.busy = true; // disable scroll biar ga ambil2 data terus,
      let id = this.profile.id;
      let current = this.current + 1;
      let ID;
      if (id) {
        ID = id;
      } else {
        ID = localStorage.getItem("mie");
      }

      let params = {
        params: {
          page: current,
          q: ID
        }
      };

      try {
        const res = await ord.getOrder(params);
        let par = res.data.data;
        par.data.forEach(e => {
          this.items.push(e);
        });
        this.current = par.current_page;
        this.last = par.last_page;
        this.$store.commit("notLoading");
        this.busy = false;
      } catch (e) {
        this.$store.commit("notLoading");
        this.busy = false;
      }
    }
  },
  updated() {
    if (this.current < this.last) {
      this.moreExist = true;
    } else {
      this.moreExist = false;
    }
  }
};
</script>
<style scoped>
.order {
  padding-bottom: 55px;
}
.transparent {
  background-color: transparent;
}
</style>
