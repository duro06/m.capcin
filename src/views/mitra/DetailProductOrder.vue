<template>
  <div>
    <h1>Test Detail Order</h1>
    <h5>
      <b>Nama Product: {{ this.name }}</b>
    </h5>
    <h5>
      <b>Nama Product: {{ this.harga }}</b>
    </h5>
    <input type="number" v-model="qty" />
    <hr />
    <button @click="orderThisProduct">Order</button>
  </div>
</template>

<script>
import { http } from "../../services/http_service";
export default {
  name: "DetailProductOrder",
  created() {
    this.productDetail(this.$route.params.id);
  },
  data() {
    return {
      id: "",
      name: "",
      harga: "",
      qty: 1
    };
  },
  methods: {
    productDetail: function(val) {
      http()
        .get(`user/products/${val}/edit`)
        .then(response => {
          //APABIL BERHASIL, DI ASSIGN KE FORM
          let getData = response.data.data;
          console.dir(getData);
          this.id = getData.id;
          this.nama = getData.nama;
          this.harga = getData.harga;
        });
    },
    orderThisProduct: function() {
      let product_id = this.$route.params.id;
      let harga = this.harga;
      let qty = this.qty;
      let total = harga * qty;
      let user_id = this.$store.state.profile.id;
      console.log(user_id);

      let formData = new FormData();
      formData.append("product_id", product_id);
      formData.append("harga", harga);
      formData.append("qty", this.qty);
      formData.append("total", total);
      formData.append("user_id", user_id);

      http()
        .post(`/user/orders`, formData)
        .then(response => {
          //APABILA BERHASIL KITA MELAKUKAN REQUEST LAGI
          console.log(response);
        })
        .catch(error => {
          console.log("" + error);
        });
    }
  }
};
</script>
