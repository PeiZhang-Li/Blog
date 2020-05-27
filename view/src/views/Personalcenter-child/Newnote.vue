<template>
    <div>

        <div class="main">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
                <el-form-item label="笔记名称:" prop="name">
                    <el-input v-model="ruleForm.title" style="width: 600px;"></el-input>
                </el-form-item>
                <el-form-item label="分类:" prop="select">
                    <el-select v-model="ruleForm.select" placeholder="请选择">
                        <el-option
                                v-for="item in selectarr"
                                :key="item.menuName"
                                :label="item.menuName"
                                :value="item.menuName">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="封面图:" prop="fileimg">
                    <el-input v-model="num" disabled style="display: none"></el-input>
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :limit="1"
                            :on-exceed="alerts"
                            :before-upload="getfile"
                            ref="uploadMaterialFile"
                    >
                        <i class="el-icon-plus"></i>
                    </el-upload>

                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>

                <el-form-item label="文章主题:">
                    <el-input v-model="ruleForm.content" disabled style="display: none"></el-input>
                    <Editor style="width: 700px;" @Editor="gethtml" @getfilepath="getfilepath" ref="editor"/>
                </el-form-item>
                <el-button @click.prevent="submit('ruleForm')">提交</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Editor from "../../components/Editor";
    export default {
        name: "Newnote",
        components: {Editor},
        data() {
            let checkfile = (rule, value, callback) => {
                if (this.num == null) {
                    callback(new Error('请选择要上传的文件'));
                } else if (this.num > 1) {
                    callback(new Error('每次上传只支持一个文件'));
                } else {
                    callback();
                }
            }
            let checktext = (rule, value, callback) => {
                if (this.ruleForm.title.length == 0) {
                    callback(new Error('请输入'))
                } else {
                    callback()
                }

            }
            return {
                selectarr:[],
                arr: [],
                filearr: [],
                num: null,
                file: null,
                dialogImageUrl: '',
                dialogVisible: false,
                ruleForm: {
                    title: '',
                    content: '',
                    filearr: [],
                    removearr: [],
                    select:''
                },
                rules: {
                    name: [{required: true, validator: checktext, trigger: 'blur'}],
                    fileimg: [{required: true, validator: checkfile}],
                    select:[ { required: true, message: '请选择分类', trigger: 'change' }]
                }
            }
        },
        methods: {
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            alerts() {
                this.$message.error('最多一个文件')
            },
            getfile(file) {
                this.file = file;
                this.num = this.$refs.uploadMaterialFile.uploadFiles.length;
            },
            submit(name) {
                this.$refs[name].validate( async (valid) => {
                    if (valid) {
                        //获取内容中的所有img标签,将其和历史添加文件的数组进行比对，分辨出哪些是不需要的文件
                        let imgarr = Array.from(this.$refs.editor.$el.children[0].children[1].getElementsByTagName('img'));
                        if(imgarr.length!==0){
                            imgarr.forEach(item => {
                                this.arr.push(this.$options.filters.reups(item.src.split('bolg/')[1]))
                            })
                            this.arr.forEach(item => {
                                let data = 'upload\\bolg\\' + item;
                                this.filearr.forEach(item => {
                                    if (item == data) {
                                        this.ruleForm.filearr.push(item);
                                    } else {
                                        this.ruleForm.removearr.push(item);
                                    }
                                })
                            })
                        }
                        let fd=new FormData();
                        this.ruleForm['date']=this.getTimes();
                        this.ruleForm['username']=JSON.parse(localStorage.getItem('userinfo')).username;
                        this.ruleForm['Authority']=0;
                        fd.append('file',this.file)
                        fd.append('data',JSON.stringify(this.ruleForm))
                        let res=await this.$http.post('/user/upBlogs',fd)
                        if(res.data.code=='200'){
                              this.$message.success('提交成功,等待审核哦')
                        }else{
                            this.$message.error('提交失败')
                        }
                    } else {
                        this.$message.error('请填写完整')
                        return false;
                    }
                })
            },
            gethtml(e) {
                this.ruleForm.content = e;
            },
            getfilepath(e) {
                this.filearr.push(e)
            },
            getTimes() {
                var date = new Date();
                var seperator1 = "-";
                var seperator2 = ":";
                //以下代码依次是获取当前时间的年月日时分秒
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                var minute = date.getMinutes();
                var hour = date.getHours();
                var second = date.getSeconds();
                //固定时间格式
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
                }
                if (minute >= 0 && minute <= 9) {
                    minute = "0" + minute;
                }
                if (second >= 0 && second <= 9) {
                    second = "0" + second;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate
                    + " " + hour + seperator2 + minute + seperator2 + second;
                return currentdate;
            }
        },
      async  created() {
            //去拿分类数据
            let res=await this.$http.post('/user/getMenu');
            this.selectarr=res.data;
        }
    }
</script>

<style scoped>
    .main {

        margin: 0 auto;
        margin-top: 100px;
        overflow: auto;

    }
</style>