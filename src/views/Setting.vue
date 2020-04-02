<template>
  <div class="main">
    <div class="content"></div>
    <nav class="navbar is-fixed-bottom-touch ">
      <div class="custom_bottom_nav">
        <div class="navbar-brand level is-mobile is-pulled-right">
          <div class="btn_nav_item level-item has-text-centered">
            <router-link :to="{ path: '/logout' }" exact>
              <span class="mega-icon">
                <i class="fas fa-sign-out-alt"></i>
              </span>
              <p class="subtitle is-7">
                Logout
              </p>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  name: "setting"
};
</script>
<style scoped>
.mega-icon {
  font-size: 1.5rem;
}
</style>
