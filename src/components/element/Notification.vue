<template>
  <div class="container" @click="posisi">
    <div :class="['card', pesan.read ? '' : 'unread']" @click="read">
      <div class="card-header">
        <p><B>Referensi : </B> Capcin-{{ pesan.reff }}</p>
      </div>
      <div class="content">
        <p>
          sudah berganti status menjadi
          <span class="status"
            ><B> {{ pesan.status }}</B></span
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "notif",
  props: { data: Object },
  data() {
    return {
      pesan: this.data
    };
  },
  methods: {
    posisi() {
      location.href = "order#" + this.pesan.id;
    },
    read() {
      this.$store.commit("notifIsRead", this.pesan.id);
    }
  }
};
</script>
<style lang="scss" scoped>
.unread {
  background-color: rgb(193, 243, 250);
}
.status {
  color: EDF2FA;
}
</style>
