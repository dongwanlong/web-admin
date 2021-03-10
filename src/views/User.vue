<template>
  <div class="wrap-user">

    <div class="head fh">
      <el-card class="">
        <div class="f item-wrap">
          <el-input class="item" v-model="srhId" placeholder="ID"></el-input>
          <el-input class="item" v-model="srhName" placeholder="用户名"></el-input>
        </div>
        <div class="f item-wrap">
          <el-select class="item item-select" v-model="srhLevel" placeholder="用户等级">
            <el-option
              v-for="item in [{v:'a',k:'普通用户'},{v:'z',k:'管理员'}]"
              :key="item.v"
              :label="item.k"
              :value="item.v">
            </el-option>
          </el-select>

          <el-date-picker
            v-model="srhTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
          </el-date-picker>
        </div>

        <div class="f fj-end">
          <el-button @click="search" type="primary" :style="{width:'200px'}">搜索</el-button>
        </div>

      </el-card>
    </div>

    <el-table
      :data="userData"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        fixed
        prop="username"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="createTime"
        :formatter="formatDate"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="level"
        :formatter="formatLevel"
        label="用户级别"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button @click="viewDetial(scope.row)" type="text" size="small">详细</el-button>
          <el-button @click="del(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="f fa-center">
      <span>用户总数: {{total}}</span>
      <el-pagination
        @current-change="changePage"
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'user',
  data(){
    return {
      userData:[],
      pageIndex:0,
      pageSize:3,
      total:0,
      srhId:"",
      srhName:"",
      srhLevel:"",
      srhTime:"",
    }
  },
  mounted(){
    this.refresh();
  },
  methods:{
    viewDetial(val){
      this.$router.push({ path: '/userdetail/'+val.id })
    },
    search(){
      this.refresh();
    },
    changePage(val){
      this.pageIndex = val-1;
      this.refresh();
    },
    formatDate(row, column, cellValue, index) {
      return moment(cellValue).format('YYYY-MM-DD HH:mm:ss')
    },
    formatLevel(row, column, cellValue, index){
      if(cellValue=='a'){
        return "普通用户";
      }else if(cellValue=='z'){
        return "超级管理员";
      }
    },
    del(val){
      this.$confirm('', '是否删除!!', {
        distinguishCancelAndClose: true,
        confirmButtonText: '删除',
        cancelButtonText: '取消'
      })
      .then(() => {
        axios.post(`user/remove?id=${val.id}`).then(({data})=>{
          if(data.res){
            this.$message({
              type: 'error',
              message: '删除失败'
            });
          }else{
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.refresh();
          }
        });
      })
      .catch(action => {
        this.$message({
          type: 'info',
          message: '取消删除'
        })
      });
    },
    refresh(){
      let { pageIndex, pageSize, srhId, srhName, srhLevel, srhTime } = this;
      let url = `user/list?pageIndex=${pageIndex}&pageSize=${pageSize}`;
      if(srhId)url += `&id=${srhId}`;
      if(srhName)url += `&username=${srhName}`;
      if(srhLevel)url += `&level=${srhLevel}`;
      if(srhTime){
        let startTime = moment(srhTime[0]).format('YYYY-MM-DD HH:mm:ss');
        let endTime = moment(srhTime[1]).format('YYYY-MM-DD HH:mm:ss');
        url += `&startTime=${startTime}`;
        url += `&endTime=${endTime}`
      }

      axios.get(url).then(({data})=>{
        if(data.res)return;
        this.total = data.val.total;
        
        this.userData = [];

        for(let i=0;i<data.val.list.length;++i){
          let {
            createTime,
            level,
            username,
            _id,
          } = data.val.list[i];

          this.userData.push({
            createTime,
            level,
            username,
            id:_id,
          });
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap-user{
    .head{
      // height: 100px;
      border-bottom: 1px solid #ddd;
      margin-bottom: 60px;
      .item-wrap{
        margin: 10px 0;
        .item{
          margin: 0 10px;
        }
      }
    }
    .el-pagination{
      margin: 20px;
    }
  }
</style>