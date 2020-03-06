<template>
  <div class="produk">
    <div class="wrapper">
      <h2 class="has-text-centered fadeInUp" v-wow data-wow-duration="1s">
        Produksi
      </h2>
      <div class="level">
        <div
          class="level-item has-text-centered fadeInUp"
          v-wow
          data-wow-duration="1s"
        >
          <Search
            @search="handleSearch"
            class="is-small is-right is-7 search"
            v-model="search"
            :load="loading"
          />
        </div>

        <div class="level-item has-text-centered ">
          <p class="subtitle is-7 fadeInUp" v-wow data-wow-duration="1s">
            Data ke {{ meta.from }} sampai {{ meta.to }}, dari total
            {{ meta.total }} data ditemukan
          </p>
          <p class="subtitle is-7 fadeInUp" v-wow data-wow-duration="1s">
            Halaman ke {{ meta.current }} dari total {{ meta.last }}
            halaman
          </p>
        </div>
      </div>
      <div class="content">
        <div class="iterasi is-hidden-desktop">
          <div
            v-for="(item, apem) in items"
            :key="apem"
            class="infinite-list-item"
          >
            <Produksi
              class="produksi fadeInUp"
              v-wow
              data-wow-duration="1s"
              :data="item"
              @edit="handleEdit"
            />
          </div>
          <div
            v-infinite-scroll="Scroll"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="12"
            infinite-scroll-throttle-delay="2000"
          ></div>
        </div>
        <button
          v-if="this.more_exist"
          class="button is-info is-fullwidth is-loading fadeInUp"
          v-wow
          data-wow-duration="1s"
        >
          Button loading
        </button>
        <Modal v-if="showModal" @close="handleModal">
          <!-- <h3 slot="header">Custom header</h3> -->
          <header
            slot="header"
            class="modal-card-head fadeInUp"
            v-wow
            data-wow-duration="1s"
          >
            <p class="modal-card-title  fadeInUp" v-wow data-wow-duration="1s">
              Modal title
            </p>
            <button
              class="delete"
              aria-label="close"
              @click.prevent="handleModal"
            ></button>
          </header>
          <section
            slot="body"
            class="modal-card-body  fadeInUp"
            v-wow
            data-wow-duration="1s"
          >
            Content ...
          </section>
          <footer
            slot="footer"
            class="modal-card-foot  fadeInUp"
            v-wow
            data-wow-duration="1s"
          >
            <button
              class="button is-success fadeInUp"
              v-wow
              data-wow-duration="1s"
            >
              Save changes
            </button>
            <button class="button  fadeInUp" v-wow data-wow-duration="1s">
              Cancel
            </button>
          </footer>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script>
import Produksi from "../element/ProduksiEl.vue";
import Search from "../element/Search.vue";
import Modal from "../element/Modal.vue";
import * as itemService from "../../services/item_service.js";

export default {
  name: "produk",
  components: {
    Produksi,
    Modal,
    Search
  },
  data() {
    return {
      showModal: false, // modal tampil atau tidak
      units: {}, // data unit
      meta: {}, // perlu di review butuh atau
      items: {}, // data items

      loading: "", // ini untuk loading spinner input search
      current_page: 1, //DEFAULT PAGE YANG AKTIF ADA PAGE 1
      per_page: 8, //DEFAULT LOAD PERPAGE ADALAH 8
      search: "", // data search
      sortBy: "created_at", //DEFAULT SORTNYA ADALAH CREATED_AT
      sortByDesc: false, //ASCEDING
      more_exist: true, // parameter masih ada halaman yang perlu di load true jika masih ada, di cek di fungsi updated
      last_page: null // inisiali sasi awal halaman terakhir, isi pertama kali di init data awal (fungsi req())
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
        const response = await itemService.loadData(params);
        console.log(response);
        let getData = response.data.data; // masukkan data response ke getData
        this.items = getData.data; //ambil data yang dibutuhkan
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
        console.log(this.items); // nanti janagan lupa ini dihapus =============================
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
        const response = await itemService.loadData(params);
        //================================jangan lupa ini nanti dihapus ===============
        console.log(response);
        //==============================================
        let getData = response.data.data;
        // bedanya dengan fungsi request data awal, yang ini datanya di push
        getData.data.forEach(data => {
          this.items.push(data);
        });
        //============ambil data yang dibutuhkan=====================
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total;
        this.current_page = getData.current_page; // jangan lupa current page dimasukkan juga..
        this.last_page = getData.last_page; // input paramaeter halaman teraksir
        //==============================================================
        // ====================== review lagi data meta butuh atau tidak ========
        // masukkan data meta
        this.meta = {
          total: getData.total,
          current: getData.current_page,
          per_page: getData.per_page,
          from: getData.from,
          to: getData.to,
          last: getData.last_page
        };
        //===========================================
        this.loading = ""; // matikan button loading spinner
        // ==================== jangan lupa ini nanti di hapus ===================
        console.log("Busy response :  ", this.busy);
        console.log(this.items);
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
    },
    //jika ada emmit jumlah data tiap halaman
    handleSearch(val) {
      this.current_page = 1; //reset halaman ke halaman satu
      this.search = val; // masukkan nilai search
      this.req(); //reload data
    },
    // fungsi untuk nutup modal, bukanya dari $emit komponen modal
    handleModal() {
      this.showModal = false;
    },
    // fungsi menampilkan modal dari $emit data item @edit
    handleEdit() {
      this.showModal = true;
    }
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
/* @import "../../assets/css/debug.css"; */

.wrapper {
  padding: 0px 20px 55px 20px;
}
.iterasi {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  /* height: 500px; */
}
.iterasi > div {
  background-color: #f14668;
  width: 50%;
  height: auto;
}
.search {
  padding: 5px;
}
</style>
