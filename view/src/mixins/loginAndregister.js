

export const loginAndregister={
    data(){
        let that=this;
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
        let checkcode=(rule,value,callback)=>{
            if(!value){
                return callback(new Error('请输入验证码'))
            }else{
                setTimeout(() => {
                    if(that.$data.captcha===value){
                        callback()
                    }else{
                        callback(new Error('验证码输入错误'))
                    }
                }, 100)
            }
        }
        return{
            captcha:'',
            rules: {
                username: [
                    { required: true, message: '请填写', trigger: 'blur'},
                ],
                email:[
                    { required: true,  trigger: 'blur',validator: checkEmail},
                ],
                code:[
                    { required: true,validator: checkcode , trigger: 'blur'},
                ],
                password:[
                    { required: true, message: '请填写', trigger: 'blur'},
                ]
            },

            ruleForm:{
                email:'',
                username:'',
                password:'',
                code:''
            }
        }
    },
    methods:{
        setcaptcha(e){
            this.captcha=e;
        }
    },

}