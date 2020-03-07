<template>
  <div class="content-body has-shadow">
    <h1 class="judul-component">Product to Order</h1>
    <div
      v-for="(item, apem) in products"
      :key="apem"
      class="infinite-list-item"
    >
      <Mitra
        class="produksi fadeInUp"
        v-wow
        data-wow-duration="1s"
        :data="item"
      />
    </div>
    <button
      v-if="this.more_exist"
      class="button is-info is-fullwidth is-loading fadeInUp"
    >
      loading ...
    </button>
    <div
      v-infinite-scroll="Scroll"
      infinite-scroll-disabled="busy"
      infinite-scroll-distance="12"
      infinite-scroll-throttle-delay="2000"
    ></div>
  </div>
</template>
<script>
import Mitra from "@/components/role/Mitra.vue";
import * as prod from "../services/product_service.js";

export default {
  name: "mitra",
  components: {
    Mitra
  },
  data() {
    return {
      products: {}, // data products

      loading: "", // ini untuk loading spinner input search
      current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
      per_page: 4, //DEFAULT LOAD PERPAGE ADALAH 8
      search: "", // data search
      sortBy: "id", //DEFAULT SORTNYA ADALAH CREATED_AT
      sortByDesc: false, //ASCEDING
      more_exist: true, // parameter masih ada halaman yang perlu di load true jika masih ada, di cek di fungsi updated
      last_page: null
    };
  },
  created() {
    // panggil data awal
    this.req();
  },
  methods: {
    req: async function() {
      this.$store.dispatch("productOut"); //kosongkan state product
      this.loading = "is-loading";
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
        console.log(response);
        let getData = response.data.data; // masukkan data response ke getData
        this.products = getData.data; //ambil data yang dibutuhkan
        this.$store.dispatch("productIn", getData.data); // masukkan data ke state
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total; // input parameter, ada berapa total data yang ada
        this.last_page = getData.last_page; // input paramaeter halaman teraksir

        this.loading = ""; // loadng spinner berhenti
        console.log(this.products); // nanti janagan lupa ini dihapus =============================
        this.more_exist = false; // kasih false biar nanti yang update value nya fungsi updated() saja
      } catch (error) {
        this.more_exist = false; //apapun hasilnya, more exist false dulu
        console.log("" + error); // jangan lupa di hapus nanti ======================================
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },
    //jika ada scroll event
    Scroll() {
      //================= development mode ===========================
      console.log("Last page  :  ", this.last_page);
      console.log("Current page  :  ", this.current_page);
      console.log("Busy Scroll :  ", this.busy);
      //================ jangan lupa nanti di hapus =========================
      this.busy = true; // disable fungsi VueInfiniteScroll
      //penting nya more exist ada di updated. biar yang ngecek satu aja
      // memastikan bahwa fungsi ini jalan ketika scroll, bukan refresh
      //jika refresh otomatis last_page nya null, karena belum di isi oleh fungsi req()
      if (this.more_exist && this.last_page != null) {
        this.loadMore(); //jalankan fungsi Load more
      }
    },
    // load lebih banyak data
    loadMore: async function() {
      this.loading = "is-loading";
      //================jangan lupa nanti di hapus =================
      console.log("Busy Load more :  ", this.busy);
      //================================================
      // inisialisasi lokal halaman sekarang
      let current_page;
      current_page = this.current_page + 1; // request ke server halaman selanjutnya
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
      this.busy = false; // jalankan lagi fungsi VueInfineScroll
      try {
        this.busy = true; // selama request matikan InfiniteScroll
        //==================== jangan lupa nanti dihapus =================
        console.log("Busy try :  ", this.busy);
        console.log("more exist  :  ", this.more_exist);
        //========================================================
        // ngene iki lho carane lek gawe async await hehehe
        const response = await prod.loadData(params);
        //================================jangan lupa ini nanti dihapus ===============
        console.log(response);
        //==============================================
        let getData = response.data.data;
        //================================jangan lupa ini nanti dihapus ===============
        console.log(getData);
        //==============================================
        // bedanya dengan fungsi request data awal, yang ini datanya di push
        getData.data.forEach(data => {
          this.products.push(data);
        });
        this.$store.dispatch("productIn", getData.data); // push data ke state
        //============ambil data yang dibutuhkan=====================
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total;
        this.current_page = getData.current_page; // jangan lupa current page dimasukkan juga..
        this.last_page = getData.last_page; // input paramaeter halaman teraksir
        //==============================================================
        this.loading = ""; // matikan button loading spinner
        // ==================== jangan lupa ini nanti di hapus ===================
        console.log("Busy response :  ", this.busy);
        console.log(this.products);
        //==============================================================
        // biar more_exist nilainya di update oleh fungsi updated saja
        this.more_exist = false;
      } catch (error) {
        this.more_exist = false;
        // ================= jangan lupa ini nanti di hapus ===================
        console.log("" + error);
        //=====================================================================
        this.flashMessage.error({
          message: "" + error,
          time: 5000
        });
      }
    }
    //jika ada emmit jumlah data tiap halaman
    // handleSearch(val) {
    //   this.current_page = 1; //reset halaman ke halaman satu
    //   this.search = val; // masukkan nilai search
    //   this.req(); //reload data
    // },
    // // fungsi untuk nutup modal, bukanya dari $emit komponen modal
    // handleModal() {
    //   this.showModal = false;
    // },
    // // fungsi menampilkan modal dari $emit data item @edit
    // handleEdit() {
    //   this.showModal = true;
    // }
  },
  // sementara hanya digunakan untuk ngecek masih ada data yang perlu di load lagi tau tidak
  updated() {
    // logikanya jika halaman terakhir kurang dari halaman sekarang
    // atau jika halama terkhir kurang dari halaman sekarang dan jumlah halaman hanya 2
    // kalo ga dikasih ini kalo halamannya cuma dua, ga muncul lagi halaman terakhir
    // sebab more_exist sudah false duluan untuk next page

    if (
      this.current_page < this.last_page ||
      (this.current_page < this.last_page && this.last_page == 2)
    ) {
      this.more_exist = true;
    } else {
      this.more_exist = false;
    }

    //=====================jangan lupa ini nanti di hapus ============
    console.log("Updated :  ", this.more_exist);
    //======================================================
  }
};
</script>
<style scoped>
.content-body {
  background: whitesmoke;
}
.VueCarousel {
  border-radius: 20px !important;
}
</style>
