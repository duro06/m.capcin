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
      infinite-scroll-distance="5"
      infinite-scroll-throttle-delay="1500"
    ></div>
  </div>
</template>
<script>
import OrderCard from "@/components/element/OrderCard";
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
      moreExist: false
    };
  },
  mounted() {
    this.ambilData();
    // this.subscribe();
  },

  computed: {
    ...mapState(["profile", "Order"])
  },
  // watch: {
  //   getID() {
  //     if (this.profile.id) {
  //       this.ambilData();
  //     }
  //   }
  // },
  methods: {
    Scroll: function() {
      this.busy = true;
      if (this.moreExist && this.last != null) {
        this.$store.commit("loading");
        this.ambilLagi(); //jalankan fungsi Load more
      }
    },
    // Fungsinya pusher
    ambilData: async function() {
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
        console.log("par ", par);
        console.log("curent", this.current);
        console.log("last", this.last);
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
      }
    },
    ambilLagi: async function() {
      this.$store.commit("loading");
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
        // this.items = res.data.data.data;
        let par = res.data.data;
        par.data.forEach(e => {
          this.items.push(e);
        });
        this.current = par.current_page;
        this.last = par.last_page;
        console.log(par.data);
        this.$store.commit("notLoading");
      } catch (e) {
        this.$store.commit("notLoading");
      }
    }
  },
  updated() {
    if (this.current < this.last) {
      this.moreExist = true;
    } else {
      this.moreExist = false;
    }
    console.log("more ", this.moreExist);
    console.log("last ", this.last);
    console.log("current ", this.current);
  }
};
</script>
<style scoped>
.order {
  padding-bottom: 55px;
}
</style>
