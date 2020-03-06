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
      per_page: 8, //DEFAULT LOAD PERPAGE ADALAH 8
      search: "", // data search
      sortBy: "created_at", //DEFAULT SORTNYA ADALAH CREATED_AT
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
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total; // input parameter, ada berapa total data yang ada
        this.last_page = getData.last_page; // input paramaeter halaman teraksir

        // masukkan data meta
        // ini perlu di cermati nanti, kira-kira meta ini dibutuhka  atau tidak
        //===============================  !!!! ==================================
        this.meta = {
          total: getData.total,
          current: getData.current_page,
          per_page: getData.per_page,
          from: getData.from,
          to: getData.to,
          last: getData.last_page
        };
        //========================================!!!!!!=========================
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
    }
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
