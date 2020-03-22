<template>
  <div class="order">
    <div class="isi" v-if="OrderItems.length">
      <div
        class="pegulangan"
        v-for="(item, n) in OrderItems"
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
      more_exist: false,
      busy: false,
      update: false
    };
  },
  mounted() {
    console.log(this.OrderItems.length);
    console.log("busy", this.busy);
    this.updateData();
    // if (!this.OrderItems.length) {
    this.ambilData();
    // }
  },

  computed: {
    ...mapState(["profile", "OrderItems", "mitraOrderMeta"])
  },
  // watch: {
  //   needUpdate() {
  //     if (this.orderUpdate != null) {
  //       this.updateData();
  //     }
  //   }
  // },
  methods: {
    // removeFocus() {
    //   this.$store.commit("setOrderFocus", {});
    // },
    testScroll() {
      console.log("scroll");
    },
    orderScroll: function() {
      console.log("scroll");
      if (this.mitraOrderMeta.more) {
        // this.mitraOrderMeta.more = false;
        this.ambilLagi(); //jalankan fungsi Load more
      }
    },
    //update data(halaman pertama aja.. kalo lagi ada di bawah ya maap saya update dulu...)
    updateData: async function() {
      console.log("Update");
      this.busy = true; // disable scroll biar ga ambil2 data terus,
      let id = this.profile.id;
      let current_page;
      current_page = this.mitraOrderMeta.current;

      // if (this.mitraOrderMeta.more) {
      // }
      let ID;
      if (id) {
        ID = id;
      } else {
        ID = localStorage.getItem("mie");
      }

      let params = {
        params: {
          // page: current,
          q: ID
        }
      };
      try {
        const res = await ord.getOrder(params);
        // this.items = res.data.data.data;
        let par = res.data.data;
        let more;
        if (par.current_page < par.last_page) {
          more = true;
        } else {
          more = false;
        }
        let meta = {
          current: current_page,
          last: par.last_page,
          more: more
        };

        this.$store.commit("setMitraOrderMeta", meta);
      } catch (e) {
        this.update = false;
        this.busy = false;
      }
    },

    ambilData: async function() {
      this.$store.commit("loading");
      this.$store.commit("delOrderItems");
      this.busy = true;
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
        // this.items = res.data.data.data;
        this.$store.commit("setOrderItems", res.data.data.data);

        let par = res.data.data;
        let more;
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
        this.$store.commit("setMitraOrderMeta", meta);
        this.$store.commit("notLoading");
        this.busy = false;
      } catch (e) {
        this.$store.commit("notLoading");
        this.busy = false;
      }
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
          this.$store.commit("pushOrderItems", e);
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

        this.$store.commit("setMitraOrderMeta", meta);
        this.$store.commit("notLoading");
        this.busy = false;
      } catch (e) {
        this.$store.commit("notLoading");
        this.busy = false;
      }
    }
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
