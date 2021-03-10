<template>
  <div id="app">
    <el-container>
      <Sider/>
      <el-main><router-view/></el-main>
    </el-container>
  </div>
</template>

<script>
import Sider from './views/Sider.vue'

export default {
  name: 'app',
  components: {
    Sider,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.el-container{
  height: 100%;
}
.el-aside{
  height: 100%;
}


</style>
