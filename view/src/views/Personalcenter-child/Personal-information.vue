<template>
    <div>
        <div class="content">
            <el-form label-width="80px">
                <el-form-item label="用户名:">
                    <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="头像:">
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :limit="1"
                            :on-exceed="alerts"
                            :before-upload="getfile"
                            >
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button @click="submit">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Personal-information",
        data(){
            return{
                username:'',
                dialogImageUrl: '',
                dialogVisible: false,
                file:null,
                email:''
            }
        },
        created() {
            let data=JSON.parse(localStorage.getItem('userinfo'));
            this.email=data.email;
            this.username=data.username;

        },
        methods:{
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            alerts(){
                this.$message.error('最多一个文件')
            },
            getfile(file){
               this.file=file;
            },
         async   submit(){
                 if(this.file==null){
                  let res=await   this.$http.post('/user/upBlog',{'username':this.username,'email':this.email});
                 if(res.data==200){
                     this.$message.success('修改成功')
                 }else{
                     this.$message.error('修改失败')
                 }
                 }else{
                     let fd=new FormData();
                     fd.append('username',this.username);
                     fd.append('file',this.file);
                     fd.append('email',this.email);
                     let res=await this.$http.post('/user/upBlog',fd);
                     if(res.data==200){
                         this.$message.success('修改成功')
                     }else{
                         this.$message.error('修改失败')
                     }
                 }
            }
        }
    }
</script>

<style scoped>
  .content{
      width: 400px;
      margin: 0 auto;
      margin-top: 150px;
  }
    .inpbox{

    }
</style>