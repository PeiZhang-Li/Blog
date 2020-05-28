<template>
    <div class="box">
         <div class="box-content">
             <el-menu  class="el-menu-demo" mode="horizontal" :default-active="this.$route.path" router>
<!--                 <el-menu-item index="1">处理中心</el-menu-item>-->
                 <el-menu-item v-if="!kg" style="float:right" index="/login">{{username}}</el-menu-item>
                 <el-submenu style="float:right;" index="/" v-if="kg">
                     <template slot="title" >
                         <el-image
                                 style="width: 30px; height: 30px;border-radius: 50%;"
                                 :src="url"
                                 ></el-image>
                            {{username}}
                     </template>
                     <el-menu-item index="/Personalcenter"><i class="el-icon-s-operation"></i>控制中心</el-menu-item>
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
                kg:false
            }
        },
        methods:{
                 tuichu(){
                     localStorage.removeItem('userinfo');
                     this.$router.push('/login')
                 }
        },
        created() {
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
</style>