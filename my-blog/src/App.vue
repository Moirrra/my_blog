<template>
  <div id="app">
    <router-view name="navtop"></router-view>
    <div class="app-wrap">
      <router-view></router-view>
      <router-view name="sidebar"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  background-color: #eee;
}

body {
  background-color: #eee;
}

.app-wrap {
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  margin: auto;
  width: calc(100% - 20px);
}

@media (min-width: 1200px) {
  .app-wrap {
    width: 1160px;
  }
}
@media (min-width: 1600px) {
  .app-wrap {
    width: 73%;
  }
}
@media (max-width: 991px) {
  .app-wrap {
    display: block;
    width: auto;
  }
}


</style>
