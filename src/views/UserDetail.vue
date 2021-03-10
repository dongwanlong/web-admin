<template>
  <div class="wrap-userdetail">
    <el-card class="box f fa-start">
      <div class="item">ID: {{id}}</div>
      <div class="item">用户名: {{name}}</div>
      <div class="item">类型: {{level}}</div>
      <div class="item">创建时间: {{createTime}}</div>
      <div class="item">图片数量: {{imgNums}}</div>
      <div class="item">PPT数量: {{pptNums}}</div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'UserDetail',
  data(){
    return {
      id:"",
      name:"",
      level:"",
      createTime:"",
      imgNums:0,
      pptNums:0,
    }
  },
  mounted(){
    let id = this.$route.params.id;
    axios.get(`user/detail?id=${id}`).then(({data})=>{
      if(data.res)return;
      this.id = data.data._id;
      this.name = data.data.username;
      this.level = data.data.level;
      this.createTime = data.data.createTime;
      this.imgNums = data.data.imgs;
      this.pptNums =data. data.pptList;
    });
  },
  methods:{
  }
}
</script>
<style lang="scss" scoped>
  .wrap-userdetail{
    .box{
      width: 100%;
      height: 100%;
      .item{
        text-align: left;
        margin: 20px 4px;
        font-size: 18px;
      }
    }
  }
</style>