<template>
  <div class="produk">
    <div class="content-body has-shadow">
      <h1 class="judul-component">
        Produksi
      </h1>
      <!-- <img src="../../assets/svg/coba.svg" alt="" /> -->
      <div class="info-produksi ">
        <div class="ibu" id="frame1">
          <img :src="info" alt="" id="worker" />
          <div id="info">
            <p>Ini informasi dari admin</p>
          </div>
          <button
            class="button is-info is-small is-rounded"
            @click="handleEdit"
          >
            Laporkan pencapaian target
          </button>
        </div>
      </div>
      <!-- <div class="content" v-if="items.length">
        <div class="is-hidden-desktop">
          <div
            v-for="(item, apem) in items"
            :key="apem"
            class="infinite-list-item"
          >
            <ProduksiEl class="produksi" :data="item" @edit="handleEdit" />
          </div>
          <div
            v-infinite-scroll="Scroll"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="50"
            infinite-scroll-throttle-delay="100"
          ></div>
        </div>
      </div> -->
      <!-- <button
          v-if="this.more_exist"
          class="button is-info is-fullwidth is-loading"
          
          
        >
          Button loading
        </button> -->

      <Modal v-if="showModal" @close="handleModal">
        <!-- <h3 slot="header">Custom header</h3> -->
        <header slot="header" class="modal-card-head">
          <p class="modal-card-title ">
            Kirim Laporan
          </p>
          <!-- <button
            class="delete"
            aria-label="close"
            @click.prevent="handleModal"
          ></button> -->
        </header>
        <section slot="body" class="modal-card-body ">
          <div class="field">
            <div class="control">
              <input
                class="input is-primary is-small"
                type="number"
                placeholder="Masukkan jumlah capaian target"
                v-model="capaianTarget"
              />
            </div>
          </div>
          <div class="field">
            <div class="control">
              <textarea
                class="textarea is-small is-info"
                placeholder="Keterangan"
                rows="3"
                v-model="keterangan"
              ></textarea>
            </div>
          </div>
        </section>
        <footer slot="footer" class="modal-card-foot ">
          <button
            class="button is-success is-small is-rounded"
            @click.prevent="submit"
          >
            Kirimkan
          </button>
          <button
            class="button is-small is-rounded"
            @click.prevent="handleModal"
          >
            Batal
          </button>
        </footer>
      </Modal>
    </div>
  </div>
</template>
<script>
// import ProduksiEl from "@/components/element/ProduksiEl.vue";

import Modal from "@/components/element/Modal.vue";
import * as itemService from "@/services/item_service.js";

export default {
  name: "produk",
  components: {
    // ProduksiEl,
    Modal
  },
  data() {
    return {
      capaianTarget: null,
      keterangan: "",
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
      last_page: null, // inisiali sasi awal halaman terakhir, isi pertama kali di init data awal (fungsi req())
      busy: false,
      info: "../../img/produksi/worker.svg"
    };
  },
  created() {
    // panggil data awal
    // this.req();
  },
  methods: {
    submit() {
      console.log(this.capaianTarget);
      console.log(this.keterangan);

      this.showModal = false;
    },
    req: async function() {
      this.busy = true;
      this.$store.commit("loading");
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
        let getData = response.data.data; // masukkan data response ke getData
        this.items = getData.data; //ambil data yang dibutuhkan
        this.units = response.data.data_unit; //untuk sementara ini ga usah ga papa sih, selama ga bikin data baru
        this.totaldata = getData.total; // input parameter, ada berapa total data yang ada
        this.last_page = getData.last_page; // input paramaeter halaman teraksir

        this.$store.commit("notLoading"); // loadng spinner berhenti
        this.more_exist = false; // kasih false biar nanti yang update value nya fungsi updated() saja
        this.busy = false;
      } catch (error) {
        this.busy = false;
        this.more_exist = false; //apapun hasilnya, more exist false dulu
        this.flashMessage.error({
          message: "" + error, // kirim flash Message
          time: 5000
        });
      }
    },

    //jika ada scroll event
    Scroll() {
      // this.busy = true; // disable fungsi VueInfiniteScroll
      //penting nya more exist ada di updated. biar yang ngecek satu aja
      // memastikan bahwa fungsi ini jalan ketika scroll, bukan refresh
      //jika refresh otomatis last_page nya null, karena belum di isi oleh fungsi req()

      if (this.more_exist && this.last_page != null) {
        this.busy = true;
        this.loadMore(); //jalankan fungsi Load more
      }
    },
    // load lebih banyak data
    loadMore: async function() {
      // this.$store.commit("loading");
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
      try {
        // this.busy = true; // selama request matikan InfiniteScroll
        // ngene iki lho carane lek gawe async await hehehe
        const response = await itemService.loadData(params);
        this.$store.commit("notLoading");
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
        // biar more_exist nilainya di update oleh fungsi updated saja
        this.busy = false; // jalankan lagi fungsi VueInfineScroll
        this.more_exist = false;
      } catch (error) {
        this.busy = false; // jalankan lagi fungsi VueInfineScroll
        this.more_exist = false;
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
  }
};
</script>
<style scoped>
/* .info-produksi {
   display: flex; 
   justify-items: center; 
   align-items: center; 
}
.ibu {
   display: flex; 
   z-index: -1; 
} */
#worker {
  background-color: aliceblue;
  border-radius: 10px;
}
#info {
  /* position: absolute; */
  background-color: rgb(162, 212, 255);
  color: #3c3a92;
  /* background-color: #42b549; */
  display: block;
  border-radius: 10px;
  padding: 1em;
  margin-bottom: 10px;
  /* height: 6.5%; */
  /* width: 70%; */
  /* margin-top: 8.5%;
  margin-left: 15.6%; */
}

.iterasi {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-evenly; */
  /* height: 500px; */
}
.iterasi > div {
  background-color: #42b549;
  width: 50%;
  height: auto;
}
.search {
  padding: 5px;
}
</style>
