<template>
  <div class="supplier">
    <h1>Tugas Anda:</h1>
    <empty v-if="!tasks.length" />
    <div v-else class="isi" v-for="(task, n) in tasks" :key="n">
      <shipping :data="task" />
    </div>
  </div>
</template>
<script>
// import Supplier from "@/components/role/Supplier.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "supplier",
  components: {
    shipping: () => import("@/components/role/Supplier.vue"),
    empty: () => import("@/components/element/EmptyPage")
  },
  created() {
    this.getShipping();
  },
  computed: {
    ...mapState("shipping", {
      tasks: state => state.shipping
    })
  },
  methods: {
    ...mapActions("shipping", ["getShipping"])
  }
};
</script>

<style scoped>
/* .isi {
  display: block;
  width: -webkit-fill-available;
  background-color: rgb(252, 255, 75);
}
.isi-ikon {
  color: #42b549;
}
.ikon {
  align-items: center;
  justify-content: center;
  display: flex;
} */
.supplier {
  padding: 20px 15px 60px 15px;
}
h1 {
  margin-bottom: 20px;
}
</style>
