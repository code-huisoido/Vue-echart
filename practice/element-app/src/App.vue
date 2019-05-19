<template>
  <div id="app">
    <el-menu
      class="menu"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link class="link-a" to="/practice">Go to practice</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/hello">Go to hello</router-link>
      </el-menu-item>
      <el-menu-item index="3">
        <router-link to="/watch">Go to watch</router-link>
      </el-menu-item>
      <el-menu-item index="4">
        <router-link to="/promise">Go to promise</router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link to="/map">Go to map</router-link>
      </el-menu-item>
    </el-menu>

    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {}
};
</script>

<style lang="stylus">
html, body, #app {
  width: 100% !important;
  height: 100% !important;
  margin: 0 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;

  .content {
    display: flex;
    justify-content: space-between;
  }

  .menu {
    a {
      display: block;
    }
  }
}
</style>
