<template>
   <div class="box">

   </div>
</template>

<script>
    export default {
        name: "userNote",
        data(){
            return{

            }
        },
        methods:{
         async  getdata(){
               let email=JSON.parse(localStorage.getItem('userinfo')).email;
               let res=await  this.$http.post('/user/getBlog',{'email':JSON.stringify(email)})
               console.log(res.data)
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
</style>