<template>
  <div class="login">
    <LoginForm msg="Login" />
  </div>
</template>
<script>
// import LoginForm from "@/components/auth/LoginForm.vue";
export default {
  name: "login",
  components: {
    LoginForm: () =>
      import(
        /* webpackChunkName: "loginform" */ "@/components/auth/LoginForm.vue"
      )
  }
};
</script>
<style scoped></style>
