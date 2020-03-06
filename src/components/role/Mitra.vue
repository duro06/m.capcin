<template>
  <div>
    <h1 class="judul-component">Product to Order</h1>
    <div class="card">
      <div class="card-content">
        <div class="columns is-mobile">
          <div class="column is-3">
            ini nanti gambarnya
          </div>
          <div class="column is-5">
            <p class="rata-kiri">Nama Productnya</p>
          </div>
          <div class="column is-4">
            <p class="rata-kanan">
              <B>hARGA</B>
            </p>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <p class="rata-kanan">
          <span> Details </span>
        </p>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: "mitra"
};
</script>
<style scoped>
.card {
  border-radius: 0 12px 0 12px;
}
.card-content {
  padding: 10px !important;
}
.card-footer {
  display:block !important;
  padding:5px 10px 5px 5px;
}
.item-product {
  font-size: 1.3ddddddddddddddddddrem;
  font-weight: bold;
}
</style>
