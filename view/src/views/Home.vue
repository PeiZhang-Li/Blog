<template>
    <div>
        <heads/>
        <div class="main">
            <p v-if="data.length==0" class="p1">
                <i class="el-icon-receiving"></i>暂时没有文章哦
            </p>
            <ul v-if="!data.length==0">
                <router-link :to="{path:'/Note',query:{data:JSON.stringify(item)}}" target="_blank" v-for="(item,index) of data" :key="index">
                <li  class="card">

                    <img :src="item.titleimgpath" alt="">
                    <div class="content">
                          <p class="title">{{item.title}}</p>
                           <div class="userinfo"><img :src="item.url" alt=""><p>{{item.username}}</p></div>

                    </div>
                    <p class="time"><i class="el-icon-time"></i>{{item.date}}</p>

                </li>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    import heads from '../components/heads/heads'
    import {baseUrl} from "../../api/.env";
    export default {
        name: "Home",
        components:{
            heads
        },
        data(){
            return{
                name:{},
                data:null
            }
        },
       async created() {
            let url=window.location.href;
            url=url.split('?')[1];
             if(url){
                 url=url.split('=')[1]
                  this.getdata(url)
             }else{
                 this.getdata()
             }

          // this.getdata()
        },
        methods:{
         async getdata(name={}){
              let res=await this.$http.post('/getdata',{name}).then(res=>{
                  res.data.forEach(async (item,index)=>{
                      let userinfo=await this.$http.post('/getuserinfo',{'email':item.email});
                      res.data[index]['url']=baseUrl+this.$options.filters.ups(userinfo.data.url);
                      res.data[index].titleimgpath=baseUrl+this.$options.filters.ups(item.titleimgpath);
                  })
                  this.data=res.data;
              })

          }
        },
       watch:{
            '$route'(to,form){
                let name=this.$route.query.name;
                 this.getdata(name)
            }
       }
    }
</script>

<style scoped>
    .p1{
        font-size: 20px;
        text-align: center;
        margin-top: 200px;
    }
.card{
    width: 100%;
    min-height: 123px;
    border-bottom: 1px solid #dcdcdc;
    padding: 20px 0;
    cursor: pointer;
}
    .card>img{
        width: 158px;
        height: 102px;
        margin-right: 16px;
        display: block;
        float: left;
    }
    .content{
        float: left;
    }
    .content>.title{
         font-size: 28px;
       font-weight: 800;
    }
    .userinfo{
        margin-top: 15px;
        overflow: hidden;
    }
    .userinfo img{
        width: 24px;
        height: 24px;
        border-radius: 50%;
        float: left;

    }
    .userinfo>p{
        float: left;
        font-size: 14px;
        color: #777;
        margin-left: 10px;
    }
    .time{
        margin-top: 20px;
        float: right;
    }
</style>