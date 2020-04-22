<template>
  <div class="order">
    <div class="isi" v-if="Items.length">
      <div
        class="pegulangan"
        v-for="(item, n) in Items"
        :key="n"
        @scroll="testScroll"
      >
        <OrderCard :data="item" />
      </div>
    </div>
    <div class="kosong" v-else>
      <Empty />
    </div>
    <div
      v-infinite-scroll="orderScroll"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="0"
      infinite-scroll-throttle-delay="100"
    ></div>
    <button
      class="button transparent is-loading is-fullwidth is-large"
      v-if="mitraOrderMeta.more"
    >
      ...is loading
    </button>
  </div>
</template>
<script>
import Vue from "vue";
import infiniteScroll from "vue-infinite-scroll";
new Vue({
  directives: { infiniteScroll }
});
// import OrderCard from "@/components/element/OrderCard";
// import OrderFocus from "@/components/element/OrderFocus";
// import Empty from "@/components/element/EmptyPage";
import { mapState, mapActions } from "vuex";
import * as ord from "@/services/order_service";
import * as auth from "@/services/auth_service";

export default {
  name: "order",
  components: {
    OrderCard: () =>
      import(
        /* webpackChunkName: "order card" */ "@/components/element/OrderCard"
      ),
    Empty: () =>
      import(/* webpackChunkName: "empty" */ "@/components/element/EmptyPage")
  },

  data() {
    return {
      items: [],
      details: [],
      id: null,
      current: 1,
      last: null,
      more_exist: false,
      busy: false,
      update: false
    };
  },
  // created() {
  //   this.ambilData();
  // },
  mounted() {
    console.log(this.Items);
    console.log("busy", this.busy);
    // this.updateData();
    // if (!this.Items.length) {
    // }
  },

  computed: {
    ...mapState(["profile"]),
    ...mapState("order", {
      Items: state => state.Items,
      mitraOrderMeta: state => state.meta
    })
  },
  watch: {
    getData: {
      handler: "ambilData",
      immediate: true
    }
  },
  methods: {
    ...mapActions("order", ["getDataOrder", "setMeta"]),
    // removeFocus() {
    //   this.$store.commit("setOrderFocus", {});
    // },
    testScroll() {
      console.log("test scroll");
    },
    orderScroll: function() {
      // console.log("scroll");
      // console.log(this.mitraOrderMeta.more);
      if (this.mitraOrderMeta.more) {
        // this.mitraOrderMeta.more = false;
        this.ambilLagi(); //jalankan fungsi Load more
      }
    },
    //update data(halaman pertama aja.. kalo lagi ada di bawah ya maap saya update dulu...)
    // updateData: async function() {
    //   console.log("Update");
    //   this.busy = true; // disable scroll biar ga ambil2 data terus,
    //   let id = this.profile.id;
    //   let current_page;
    //   if (this.mitraOrderMeta.current) {
    //     current_page = this.mitraOrderMeta.current;
    //   } else {
    //     current_page = 1;
    //   }
    //   console.log("curretn atas", current_page);
    //   console.log("curretn atas", this.mitraOrderMeta);
    //   console.log("curretn atas", !this.mitraOrderMeta.current);

    //   // if (this.mitraOrderMeta.more) {
    //   // }
    //   let ID;
    //   if (id) {
    //     ID = id;
    //   } else {
    //     ID = localStorage.getItem("mie");
    //   }

    //   let params = {
    //     params: {
    //       page: current_page,
    //       q: ID
    //     }
    //   };
    //   try {
    //     const res = await ord.getOrder(params);
    //     // this.items = res.data.data.data;
    //     let par = res.data.data;
    //     let more;
    //     if (par.current_page < par.last_page) {
    //       more = true;
    //     } else {
    //       more = false;
    //     }
    //     let meta = {
    //       current: par.current_page,
    //       last: par.last_page,
    //       more: more
    //     };
    //     console.log("par", par);
    //     console.log("meta", meta);
    //     // this.$store.commit("order/setMitraOrderMeta", meta);
    //     this.setMeta(meta);
    //   } catch (e) {
    //     this.update = false;
    //     this.busy = false;
    //   }
    // },

    // ambilData: async function() {
    ambilData() {
      this.$store.commit("loading");
      // this.$store.commit("delOrderItems");
      this.busy = true;
      let ID = auth.getUserId();

      let params = {
        params: {
          q: ID
        }
      };
      // this.$store.dispatch("order/getOrderData", params);
      // this.getOrderData(params);
      this.getDataOrder(params)
        .then(() => {
          this.$store.commit("notLoading");
          console.log("res");
          this.busy = false;
        })
        .catch(() => {
          this.$store.commit("notLoading");
          console.log("err");
          this.busy = false;
        });
      // try {
      //   const res = await ord.getOrder(params);
      //   // this.items = res.data.data.data;
      //   this.$store.commit("order/setOrderItems", res.data.data.data);

      //   let par = res.data.data;
      //   let more;
      //   this.current = par.current_page;
      //   this.last = par.last_page;
      //   if (par.current_page < par.last_page) {
      //     more = true;
      //   } else {
      //     more = false;
      //   }
      //   let meta = {
      //     current: par.current_page,
      //     last: par.last_page,
      //     more: more
      //   };
      //   console.log("meta bawah", meta);
      // this.$store.commit("order/setMitraOrderMeta", meta);
      // this.setMeta(meta)
      //   this.$store.commit("notLoading");
      // } catch (e) {
      //   this.$store.commit("notLoading");
      //   this.busy = false;
      // }
    },
    ambilLagi: async function() {
      console.log("amvil lagi");

      this.busy = true; // disable scroll biar ga ambil2 data terus,
      let id = this.profile.id;
      let next_page = this.mitraOrderMeta.current + 1;
      console.log("current", next_page);
      let ID;
      if (id) {
        ID = id;
      } else {
        ID = localStorage.getItem("mie");
      }

      let params = {
        params: {
          page: next_page,
          q: ID
        }
      };

      try {
        const res = await ord.getOrder(params);
        let par = res.data.data;
        let more;
        par.data.forEach(e => {
          // this.items.push(e);
          this.$store.commit("order/pushOrderItems", e);
        });
        this.current = par.current_page;
        this.last = par.last_page;
        if (par.current_page < par.last_page) {
          more = true;
        } else {
          more = false;
        }
        let meta = {
          current: par.current_page,
          last: par.last_page,
          more: more
        };

        // this.$store.commit("order/setMitraOrderMeta", meta);
        this.setMeta(meta);
        this.$store.commit("notLoading");
        this.busy = false;
      } catch (e) {
        this.$store.commit("notLoading");
        this.busy = false;
      }
    }
  },
  destroyed() {
    this.$store.commit("order/delOrderItems");
  }
  // updated() {
  //   // if (this.mitraOrderMeta.more) {
  //   //   // this.mitraOrderMeta.more = false;
  //   // }
  //   // let ambil = (this.more_exist = true);

  //   // if (this.mitraOrderMeta.current < this.mitraOrderMeta.last) {
  //   if (this.mitraOrderMeta.more) {
  //     this.ambilLagi(); //jalankan fungsi Load more
  //   }
  //   // } else {
  //   //   this.more_exist = false;
  //   // }
  //   // console.log("more exist", this.more_exist);
  // }
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
