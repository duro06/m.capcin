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
.navbar-brand {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  height: 60px;
  box-shadow: 0 -2px 1px -2px #333;
  background-color: #fff;
}
</style>
