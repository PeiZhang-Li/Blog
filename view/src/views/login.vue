<template>
    <div ref="box" class="box">
        <div class="content">
            <h2>用户登录</h2>
            <el-form :model="ruleForm" :rules="rules"  label-width="100px" ref="ruleForm">
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
                    <router-link to="/register">没有账号？立即注册!</router-link>
                    <router-link to="/Resetaccount" style="margin-left: 50px;">忘记密码?</router-link>
                    <div class="inpbox">
                        <el-button @click="submit('ruleForm')">登录</el-button>
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
        name: "login",
        components:{sidentify},
        mounted() {
            this.$refs.box.style.backgroundImage=`url(${bg})`
        },
        methods:{
            submit(name){
                //确定登录，也要考虑从新登录,每次提交前清空所有登录信息
                localStorage.removeItem('userinfo');
                this.$refs[name].validate(async (valid) => {
                    if(!valid){
                        this.$message.error('请您检查,提交失败')
                    }else {
                        delete this.ruleForm.code;//删除验证码
                        delete this.ruleForm.username;//删除用户名
                        //这两部只是减少提交的数据的大小，提升服务器响应速度
                        let res=await this.$http.post('/login',{'ruleForm':JSON.stringify(this.ruleForm)})
                        if(res.data.code==='500'){
                            this.$message.error('用户名或者密码错误')
                        }else{
                           await this.$store.dispatch('SETAUTHORITY',res.data.Authority);//设置权限信息
                            delete res.data.Authority;     //删除权限信息,防止用户篡改
                            localStorage.setItem('userinfo',JSON.stringify(res.data));// 在缓存中设置用户登录状态
                            this.$message.success('登录成功');
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