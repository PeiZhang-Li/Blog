<template>
    <div>
        <heads/>
        <div class="main">

            <el-row >
                <el-col :span="4">
                    <el-menu
                            :default-active="this.$route.path"
                            class="el-menu-vertical-demo"
                            router
                    >
                        <el-menu-item  v-for="(item,index) of arr"  :index="item.path">{{item.meta.name}}</el-menu-item>

                    </el-menu>
                </el-col>
                <el-col :span="20">
                         <router-view></router-view>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import heads from '../components/heads/heads'
    export default {
        name: "Personalcenter",
        components:{heads},
        computed:{
             arr(){
                 return this.$store.state.Authorityarr
             }
        }
    }
</script>

<style scoped>
.el-menu{
    border: 0;
}
</style>