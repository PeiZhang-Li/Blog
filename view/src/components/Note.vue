<template>
    <div class="box">
         <div class="content">
             <p class="title">
                 {{data.title}}
             </p>
             <div class="user-box">
                 <img :src="api+data.userimg" alt="">
                 <div class="userbox">
                      <div class="b1">{{data.username}}</div>
                     <div class="b1">{{data.date}}</div>
                 </div>
             </div>
             <div class="contents" v-html="data.content">

             </div>
         </div>
    </div>
</template>

<script>
    import {baseUrl} from '../../api/.env.js'
    export default {
        name: "Note",
        data(){
            return{
               data:'',
                api:baseUrl
            }
        },
       async created() {
            let data=JSON.parse(this.$route.query.data);
            let email=data.email;
           let res=await this.$http.post('/getuserinfo',{email})
            data['userimg']=res.data.url;
           data['username']=res.data.username;
           this.data=data;
           document.title=data.title;
       }
    }
</script>

<style scoped lang="less">
.box{

    width: 100%;
    background: #F8F8F8;
}
    .content{
        width: 1200px;
        margin: 0 auto;

        background: #fff;
        padding: 25px;
        box-sizing: border-box;
    }
    .title{
        color: #333333;
        font-weight: 900;
        font-size: 25px;
    }
    .user-box{
        width: 100%;
        height: 48px;
        margin-top: 40px;
        img{
            width: 48px;
            height: 48px;
            overflow: hidden;
            border-radius: 50%;
            box-sizing: border-box;
            display: block;
            float: left;
        }
        .userbox{
            height: 100%;
            width: 300px;
            float: left;
            overflow: hidden;
            margin-left: 20px;
            .b1{
                width: 100%;
                height: 50%;

            }
        }
    }
    .contents{
        margin-top: 40px;
    }
</style>