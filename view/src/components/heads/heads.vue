<template>
    <div class="box">
         <div class="box-content">
             <el-menu  class="el-menu-demo" mode="horizontal">
                 <el-menu-item index="1">处理中心</el-menu-item>
                 <el-menu-item index="3" disabled>消息中心</el-menu-item>
                 <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
             </el-menu>
         </div>
    </div>
</template>

<script>
    export default {
        name: "heads"
    }
</script>

<style scoped>
.box{
    width: 100%;
    background: #fff;
    height: 60px;
    border-bottom: 1px solid #dcdcdc;
}
    .box-content{
        width: 1200px;
        margin: 0 auto;
    }
</style>