<template>
  <div class="wrap-sider">
    <el-menu :default-active="activeIndex" class="el-menu-demo" 
    background-color="#666"
    text-color="#FFF"
    @select="handleSelect">
      <el-menu-item index="user">用户列表</el-menu-item>
      <el-menu-item index="share">分享列表</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  name: 'sider',
  data(){
    return {
      activeIndex:"user",
    }
  },
  methods:{
    handleSelect(val){
      this.$router.push({ name: val })
    }
  },
  components: {
  }
}
</script>
<style lang="scss" scoped>
  .wrap-sider{
    .el-menu{
      height: 100%;
    }
  }
</style>
