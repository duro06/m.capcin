<template>
  <div class="content-body has-shadow">
    <h1 class="judul-component">Product to Order</h1>
    <div
      v-for="(item, apem) in products"
      :key="apem"
      class="infinite-list-item"
    >
      <Mitra class="produksi " :data="item" />
    </div>
    <!-- <button
      v-if="this.more_exist"
      class="button is-info is-fullwidth is-loading fadeInUp"
    >
      loading ...
    </button> -->
    <div
      v-infinite-scroll="Scroll"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="50"
      infinite-scroll-throttle-delay="100"
    ></div>
  </div>
</template>
<script>
import Mitra from "@/components/role/Mitra.vue";
import * as prod from "@/services/product_service.js";
import { mapState } from "vuex";

export default {
  name: "mitra",
  components: {
    Mitra
  },

  data() {
    return {
      items: {}, // data items
      current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
      per_page: 5, //DEFAULT LOAD PERPAGE ADALAH 5
      search: "", // data search
      sortBy: "id", //DEFAULT SORTNYA ADALAH CREATED_AT
      sortByDesc: false, //ASCEDING
      more_exist: true, // parameter masih ada halaman yang perlu di load true jika masih ada, di cek di fungsi updated
      last_page: null,
      busy: false
    };
  },
  mounted() {
    // panggil data awal
    console.log(this.products.length);
    console.log(!this.products.length);
    if (!this.products.length) {
      this.req();
    }
    // kosongkan state SuccessOrder
    this.$store.commit("delSuccessOrder");
  },
  computed: {
    ...mapState(["products", "mitraProductMeta"])
  },
  methods: {
    req: async function() {
      this.busy = true;
      this.$store.commit("loading");
      // this.$store.dispatch("productOut"); //kosongkan state product
      let sorting = this.sortByDesc ? "DESC" : "ASC";
      let params = {
        //kalo ga ada params servernya ga mau.. karena sudah di setting gitu..
        //dan params ini sudah sesuai dengan permintaan server, kepala ga boleh diganti
        // yang boleh diganti itu ekornya
        params: {
          page: this.current_page, // handle halaman berapa
          per_page: this.per_page, // berapa data tiap halaman
          q: this.search, // ada yang disearch atau tidak
          sortby: this.sortBy, // sort parameter... berdasarkan apa? . ini belum tak pakai
          sortbydesc: sorting // DESC ASC
        }
      };
      try {
        const response = await prod.loadData(params);
        let getData = response.data.data; // masukkan data response ke getData
        // this.items = getData.data; //ambil data yang dibutuhkan
        this.$store.commit("setProduct", getData.data); // set data product
        let meta = {
          current: getData.current_page,
          last: getData.last_page
        };
        this.$store.commit("setMitraProductMeta", meta);
        // this.$store.dispatch("productIn", getData.data); // masukkan data ke state
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total; // input parameter, ada berapa total data yang ada
        this.last_page = getData.last_page; // input paramaeter halaman teraksir

        this.$store.commit("notLoading"); // loadng spinner berhenti
        this.more_exist = false; // kasih false biar nanti yang update value nya fungsi updated() saja
        this.busy = false;
      } catch (error) {
        this.more_exist = false; //apapun hasilnya, more exist false dulu
        this.busy = false;
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },
    //jika ada scroll event
    Scroll() {
      if (this.more_exist) {
        this.more_exist = false;
        // this.$store.commit("loading");
        this.loadMore(); //jalankan fungsi Load more
      }
    },
    // load lebih banyak data
    loadMore: async function() {
      this.busy = true;
      // this.$store.commit("loading");
      // inisialisasi lokal halaman sekarang
      let current_page;
      current_page = this.mitraProductMeta.current + 1; // request ke server halaman selanjutnya
      let sorting = this.sortByDesc ? "DESC" : "ASC";
      let params = {
        //kalo ga ada params servernya ga mau.. karena sudah di setting gitu..
        //dan params ini sudah sesuai dengan permintaan server, kepala ga boleh diganti
        // yang boleh diganti itu ekornya
        params: {
          page: current_page,
          per_page: this.per_page,
          q: this.search,
          sortby: this.sortBy,
          sortbydesc: sorting
        }
      };
      try {
        // ngene iki lho carane lek gawe async await hehehe
        // console.log("load lagi cak");
        const response = await prod.loadData(params);
        let getData = response.data.data;
        // bedanya dengan fungsi request data awal, yang ini datanya di push
        getData.data.forEach(data => {
          // this.items.push(data);
          this.$store.commit("pushProduct", data); // set data product
        });
        // this.$store.dispatch("productPush", response.data.data.data); // push data ke state
        //============ambil data yang dibutuhkan=====================
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total;
        this.current_page = getData.current_page; // jangan lupa current page dimasukkan juga..
        this.last_page = getData.last_page; // input paramaeter halaman teraksir
        let meta = {
          current: getData.current_page,
          last: getData.last_page
        };
        this.$store.commit("setMitraProductMeta", meta);
        //==============================================================
        this.$store.commit("notLoading"); // matikan button loading spinner
        this.busy = false;
        // biar more_exist nilainya di update oleh fungsi updated saja
        this.more_exist = false;
      } catch (error) {
        this.busy = false;
        this.more_exist = false;
        this.flashMessage.error({
          message: "" + error,
          time: 5000
        });
      }
    }
  },
  // sementara hanya digunakan untuk ngecek masih ada data yang perlu di load lagi tau tidak
  updated() {
    // logikanya jika halaman terakhir kurang dari halaman sekarang
    // atau jika halama terkhir kurang dari halaman sekarang dan jumlah halaman hanya 2
    // kalo ga dikasih ini kalo halamannya cuma dua, ga muncul lagi halaman terakhir
    // sebab more_exist sudah false duluan untuk next page

    if (this.mitraProductMeta.current < this.mitraProductMeta.last) {
      this.more_exist = true;
    } else {
      this.more_exist = false;
    }
    // console.log("more exits", this.more_exist);
  }
};
</script>
<style scoped>
.content-body {
  background: whitesmoke;
  padding: 0px 5px 55px 5px;
}
.VueCarousel {
  border-radius: 20px !important;
}
</style>
