<template>
    <div>
        <el-tabs v-model="activeName"  @tab-click="handleClick">
            <el-tab-pane label="新建分类" name="first">
                <div class="main">'
                     <el-form :model="ruleForm"  :rules="rules" label-width="100px" ref="ruleForm">
                         <el-form-item label="分类名称:" prop="name">
                             <el-input v-model="ruleForm.name"></el-input>
                         </el-form-item>
                         <el-form-item>
                             <el-button @click="submit('ruleForm')">提交</el-button>
                         </el-form-item>
                     </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane label="分类管理" name="second">
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="menuName"
                            label="名称"
                            width="180">

                    </el-table-column>
                    <el-table-column
                            fixed="right"
                            label="操作"
                            >
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="remove(scope.$index,scope.row._id)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>p

<script>
    export default {
        name: "classification",
        data(){
            return{
                tableData:null,
                activeName:'first',
                ruleForm:{
                    name:''
                },
                rules:{
                    name:[
                        { required: true, message: '请输入名称', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
              submit(formName){
                  this.$refs[formName].validate(async (valid) => {
                      if(!valid){
                          this.$message.error('请填写')
                      }else{
                          let res=await this.$http.post('/user/upMenu',{'menuName':this.ruleForm.name})
                           if(res.data==200){
                               this.$message.success('添加成功')
                           }else{
                               this.$message.error('添加失败')
                           }
                      }
                  })
              },
            async remove(index,id){
                let res=await this.$http.post('/user/removeMenu',{'_id':id});
                if(res.data==200){
                    this.$message.success('删除成功');
                    this.tableData.splice(index,1);
                }else{
                    this.$message.error('删除失败')
                }
            },
         async handleClick(tab){
               if(tab.$options.propsData.label==="分类管理"){
                   let res=await this.$http.post('/user/getMenu');
                   this.tableData=res.data;
               }
            }
        },
       async created() {
            let res=await this.$http.post('/user/getMenu');
            this.tableData=res.data;
        }
    }
</script>

<style scoped>
.main{
    width: 600px;
    margin: 0 auto;
    margin-top: 150px;
}
</style>