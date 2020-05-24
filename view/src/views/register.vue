<template>
    <div ref="box" class="box">
        <div class="content">
            <h2>用户注册</h2>
            <el-form :model="ruleForm" :rules="rules"  label-width="100px" ref="ruleForm">
                <div class="inpbox">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                </div>
               <div class="inpbox">
                   <el-form-item label="邮箱" prop="email">
                       <el-input v-model="ruleForm.email" type="email"></el-input>
                   </el-form-item>
                   <div class="inpbox">
                       <el-form-item label="密码" prop="password">
                           <el-input v-model="ruleForm.password" type="password"></el-input>
                       </el-form-item>
                   </div>
                   <div class="inpbox">
                       <el-form-item label="验证码" prop="code">
                           <el-input v-model="ruleForm.code"  style="width:100px;"></el-input>
                           <sidentify @getcaptcha="setcaptcha" style="float:left;"/>
                       </el-form-item>
                   </div>
                   <router-link to="/login">已有账号？立即登录</router-link>
                   <div class="inpbox">
                       <el-button @click="submit('ruleForm')">注册</el-button>
                   </div>
               </div>

            </el-form>

        </div>
    </div>
</template>

<script>
    import sidentify from "../components/Captcha/captcha";
    import bg from '../../static/img/heytap_bg.1612deb5.png'
    import {loginAndregister} from "../mixins/loginAndregister";
    export default {
        mixins:[loginAndregister],
        name: "register",
        components:{sidentify},
        mounted() {
            this.$refs.box.style.backgroundImage=`url(${bg})`
        },
        methods:{
           submit(name){
                this.$refs[name].validate( async (valid) => {
                    if(!valid){
                        this.$message.error('请您检查,提交失败')
                    }else{
                        this.ruleForm['Authority']='0'//设置一个默认权限
                        delete this.ruleForm.code;//删除验证码
                     let res=  await this.$http.post('/register',{'ruleForm':JSON.stringify(this.ruleForm)})
                        if(res.data.code==='200'){
                            this.$message.success('注册成功');
                            this.$router.push('/login');
                        }else if(res.data.code==='500'){
                            this.$message.error('注册失败,您的邮箱可能已经被注册,请修改邮箱')
                        }else{
                            this.$message.error('未知错误')
                        }
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .box{
        height: 100%;
        width: 100%;
        overflow:hidden
    }
.content{
    width: 380px;
    background: #fff;
    margin: 0 auto;
    position: relative;
    border-radius: 8px;
    min-height: 375px;
    margin-top: 145px;
    text-align: center;
    padding-top: 30px;
    box-sizing: border-box;
    padding-bottom: 20px;
}
    h2{
        font-size: 26px;
        line-height: 37px;
    }
    .inpbox{

        margin-top: 20px;
        width: 340px;
    }
</style>