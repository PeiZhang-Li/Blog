<template>
   <div class="box">
      <el-card class="box-card" v-for="(item,index) of data" :key="index">
         <router-link :to="{path:'/Note',query:{data:JSON.stringify(item)}}" target="_blank">
            <div class="card-head">
               <el-tag type="warning" v-if="item.Authority==0">未审核</el-tag>
               <el-tag type="success" v-if="item.Authority==1">审核通过</el-tag>
               <el-tag type="danger" v-if="item.Authority==2">审核失败</el-tag>
               {{item.title}}
            </div>
            <div style="margin-top: 20px;">
               操作: <el-button type="danger" @click.prevent="remove(item)">删除</el-button>
            </div>
         </router-link>
      </el-card>
   </div>
</template>

<script>
    export default {
        name: "userNote",
        data(){
            return{
              data:[]
            }
        },
        methods:{
         async  getdata(){
               let email=JSON.parse(localStorage.getItem('userinfo')).email;
               let res=await  this.$http.post('/user/getBlog',{'email':JSON.stringify(email)})
               this.data=res.data;
           },
        async   remove(e){
             let id=e._id;
             let filearr=JSON.parse(e.filearr);
             filearr.push(e.titleimgpath);
           let res = await this.$http.post('/user/removeBlog', {
              'id': JSON.stringify(id),
              'filearr': JSON.stringify(filearr)
           })
           if (res.data == 200) {
              this.$message.success('删除成功')
              this.dialogVisible = false;
              this.getdata();
           } else {
              this.$message.error('删除失败')
           }
           }
        },
        created() {
           this.getdata()
        }
    }
</script>

<style scoped>
.box{
    padding: 20px;
    box-sizing: border-box;
}
   .box-card{
       width: 300px;
      float: left;
      margin: 5px;
   }
   .card-head{
       padding-bottom: 20px;
      border-bottom: 1px solid #dcdcdc;
   }
</style>