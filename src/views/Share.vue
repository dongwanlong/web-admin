<template>
  <div class="wrap-share">

    <div class="head fh">
      <el-card class="">
        <div class="f item-wrap">
          <el-input class="item" v-model="srhKey" placeholder="key"></el-input>
        </div>
        <div class="f fj-end">
          <el-button @click="search" type="primary" :style="{width:'200px'}">搜索</el-button>
        </div>
      </el-card>
    </div>

    <el-table
      :data="tbData"
      border
      style="width: 100%">
      <el-table-column
        prop="key"
        label="key">
      </el-table-column>
      <el-table-column
        prop="userId"
        label="用户ID">
      </el-table-column>
      <el-table-column
        prop="pptId"
        label="PPT ID">
      </el-table-column>
    </el-table>

    <div class="f fa-center">
      <span>分享PPT总数: {{total}}</span>
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
  name: 'share',
  data(){
    return {
      tbData:[],
      pageIndex:0,
      pageSize:3,
      total:0,
      srhKey:"",
    }
  },
  mounted(){
    this.refresh();
  },
  methods:{
    search(){
      this.refresh();
    },
    changePage(val){
      this.pageIndex = val-1;
      this.refresh();
    },
    refresh(){
      let { pageIndex, pageSize, srhKey } = this;
      let url = `proj/share-list?pageIndex=${pageIndex}&pageSize=${pageSize}`;
      if(srhKey)url += `&key=${srhKey}`;

      axios.get(url).then(({data})=>{
        if(data.res)return;
        this.total = data.val.total;
        this.tbData = [];

        for(let i=0;i<data.val.list.length;++i){
          let item = data.val.list[i];
          this.tbData.push({
            key:item.key,
            userId:item.data.userId,
            pptId:item.data.pptId,
          });
        }
      });
    }
  }
}
</script>
<style lang="scss" scoped>
  .wrap-share{
    .head{
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