<template>
  <div class="wrap-login fh">
    <div class="body fh fa-center">
      <el-input class="item" v-model="username" placeholder="用户名"></el-input>
      <el-input class="item" v-model="secret" placeholder="密码"></el-input>
      <el-button class="item" @click="login" type="primary">登录</el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'login',
  data(){
    return {
      username:"",
      secret:"",
    }
  },
  mounted(){

  },
  components: {
  },
  methods:{
    login(){
      let { username, secret } = this;
      if(!username || !secret)return;
      axios.post(`user/login`,{ username, secret }).then(({data})=>{
        if(data.res){
          this.$message({message: '用户名或密码不对',type: 'error'});
        }else{
          localStorage.setItem("userInfo", JSON.stringify(data.val));
          this.$router.push({ path: '/user' })
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap-login{
    .body{
      margin-top: 100px;
    }
    .item{
      width: 500px;
      margin: 10px 0;
    }
  }
</style>