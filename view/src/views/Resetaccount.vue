<template>
    <div ref="box" class="box">
        <div class="content">
            <h2>重置账户</h2>
            <el-form :model="ruleForm" :rules="rules" label-width="100px" ref="ruleForm">
                <div class="inpbox">
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="ruleForm.email" type="email"></el-input>
                    </el-form-item>
                    <div class="inpbox">
                        <el-form-item label="新密码" prop="password">
                            <el-input v-model="ruleForm.password" type="password"></el-input>
                        </el-form-item>
                    </div>
                    <div class="inpbox">
                        <el-form-item label="验证码" prop="code">
                            <el-input v-model="ruleForm.code" style="width:100px;"></el-input>
                            <el-button style="margin-left: 20px;" @click="sendemail" :disabled="disabled">获取验证码</el-button>
                        </el-form-item>
                    </div>
                    <div class="inpbox">
                        <el-button @click="submit('ruleForm')">提交</el-button>
                    </div>
                </div>

            </el-form>

        </div>
    </div>
</template>

<script>
    import bg from '../../static/img/heytap_bg.1612deb5.png'

    export default {
        name: "Resetaccount",
        data() {
            let checkEmail = (rule, value, callback) => {
                const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                if (!value) {
                    return callback(new Error('邮箱不能为空'))
                }
                setTimeout(() => {
                    if (mailReg.test(value)) {
                        callback()
                    } else {
                        callback(new Error('请输入正确的邮箱格式'))
                    }
                }, 100)
            }
            return {
                disabled:false,
                ruleForm: {
                    email: '',
                    password: '',
                    code: ''
                },
                rules: {
                    email: [
                        {required: true, trigger: 'blur', validator: checkEmail},
                    ],
                    password: [
                        {required: true, message: '请填写', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '请填写', trigger: 'blur'},
                    ]
                }
            }
        },
        methods: {
            submit(name) {
                this.$refs[name].validate(async  (valid) => {
                    if (!valid) {
                        this.$message.error('请您检查,提交失败')
                    }else{
                      let res= await this.$http.post('/Resetaccount',{'ruleForm':JSON.stringify(this.ruleForm)})
                        if(res.data=='000'){
                            this.$message.error('验证码错误')
                        }else if(res.data=='200'){
                            this.$message.success('修改成功')
                        }else {
                            this.$message.error('修改失败')
                        }
                    }
                })
            },
            async sendemail() {
                if (this.ruleForm.email.length === 0) {
                    this.$message.error('请填写您的邮箱')
                } else {
                    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
                    if (mailReg.test(this.ruleForm.email)) {
                        this.disabled=true;
                        let time=setTimeout(()=>{
                            this.disabled=false;
                            clearTimeout(time)
                        },60000)
                        let res = await this.$http.post('/sendcode', {'email': this.ruleForm.email});
                        if(res.data==200){
                            this.$message.success('发送成功，请注意查收,一分钟有效')
                        }else{
                            this.$message.error('发送失败，请稍后重试')
                        }
                    } else {
                        return false;
                    }
                }
            }
        },
        mounted() {
            this.$refs.box.style.backgroundImage = `url(${bg})`
        },
    }
</script>

<style scoped>
    .box {
        height: 100%;
        width: 100%;
        overflow: hidden
    }

    .content {
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

    h2 {
        font-size: 26px;
        line-height: 37px;
    }

    .inpbox {

        margin-top: 20px;
        width: 340px;
    }
</style>