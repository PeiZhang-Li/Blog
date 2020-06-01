<template>
    <div class="box">
         <div class="box-content">
             <el-menu  class="el-menu-demo" mode="horizontal"  default-active="2">
                 <el-menu-item><router-link to="/">首页</router-link></el-menu-item>
                 <el-menu-item v-for="(item,index) of arr" :key="index"><router-link :to="{path:'/',query:{'name':item.menuName}}">{{item.menuName}}</router-link></el-menu-item>
                 <el-menu-item v-if="!kg" style="float:right" index="/login">{{username}}</el-menu-item>
                 <el-submenu style="float:right;" index="/" v-if="kg">
                     <template slot="title" >
                         <el-image
                                 style="width: 30px; height: 30px;border-radius: 50%;"
                                 :src="url"
                                 ></el-image>
                            {{username}}
                     </template>
                     <router-link to="/Personalcenter"> <el-menu-item ><i class="el-icon-s-operation"></i>控制中心</el-menu-item></router-link>

                     <el-menu-item @click="tuichu"><i class="el-icon-switch-button"></i>退出登录</el-menu-item>
                 </el-submenu>
             </el-menu>
         </div>
    </div>
</template>

<script>
    import { baseUrl } from '../../../api/.env.js'
    export default {
        name: "heads",
        data(){
            return{
                url:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
                username:'',
                kg:false,
                arr:[]
            }
        },
        methods:{
                 tuichu(){
                     localStorage.removeItem('userinfo');
                     this.$router.push('/login')
                 }
        },
      async  created() {
            let res=await this.$http.post('/getmenu');
            this.arr=res.data;
            if(localStorage.getItem('userinfo')){
                this.kg=true;
                let data=JSON.parse(localStorage.getItem('userinfo'));
                if(data.url){
                    this.url=baseUrl+this.$options.filters.ups(data.url);
                }
                this.username=data.username;
            }else{
                this.username='未登录'
            }
        }
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

.el-menu--horizontal > .el-menu  .router-link-exact-active  .el-menu-item {
 color: #409EFF ;
}
.el-menu--horizontal > .el-menu  .router-link-exact-active  .el-menu-item i{
    color: #409EFF;
}
    .box-content > .el-menu--horizontal > .el-menu-item > .router-link-exact-active{
        color: #409EFF;
    }
</style>