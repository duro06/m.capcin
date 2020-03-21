<template>
  <div class="order">
    <div class="isi" v-if="OrderItems.length">
      <div class="pegulangan" v-for="(item, n) in OrderItems" :key="n">
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
      busy: false,
      update: false
    };
  },
  mounted() {
    console.log(this.OrderItems.length);
    if (!this.OrderItems.length) {
      this.ambilData();
    }
  },

  computed: {
    ...mapState(["profile", "OrderItems"])
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
    Scroll: function() {
      if (this.moreExist) {
        this.moreExist = false;

        this.ambilLagi(); //jalankan fungsi Load more
      }
    },
    //update data(halaman pertama aja.. kalo lagi ada di bawah ya maap saya update dulu...)
    updateData: async function() {
      console.log("Update");
      this.busy = true; //disable sementara fungsi scroll
      let id = this.profile.id; //ambil id dari profil
      // jika tidak ada id tidak perlu jalankan update... karena sudah dijalanan ambilData
      if (id) {
        let params = {
          params: {
            q: id
          }
        };
        try {
          const res = await ord.getOrder(params);
          this.items = res.data.data.data;
          let par = res.data.data;
          this.current = par.current_page;
          this.last = par.last_page;
          this.update = false;
          this.busy = false;
          this.$store.commit("needUpdate", null);
        } catch (e) {
          this.update = false;
          this.busy = false;
        }
      }
    },
    // Fungsinya pusher
    ambilData: async function() {
      this.$store.commit("needUpdate", null);
      this.$store.commit("loading");
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
          // this.items.push(e);
          this.$store.commit("pushOrderItems", e);
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
