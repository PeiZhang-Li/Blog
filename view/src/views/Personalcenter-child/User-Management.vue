<template>
    <div>
        <p class="title">*权限1为正常用户权限，权限0为管理员权限,权限3为黑名单,切记最少保留一个0权限的</p>
        <el-table
                :data="tableData"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="_id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱地址"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="Authority"
                    label="权限"
                    width="180">
                <template slot-scope="scope" >

                    <el-select v-model="scope.row.Authority" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="submit(scope.row)">提交</el-button>
                </template>
            </el-table-column>

        </el-table>
    </div>
</template>

<script>
    export default {
        name: "User-Management",
        data(){
            return{
                tableData:null,
                options:['0','1','3']
            }
        },
        methods:{
            async submit(e){
                 let res=await  this.$http.post('/user/setUserinfo',{'userinfo':JSON.stringify(e)})
                if(res.data==200){
                    this.$message.success('修改成功')
                }else{
                    this.$message.error('修改失败')
                }
             }
        },
       async created() {
            let res=await this.$http.post('/user/getUsrtinfo');
            this.tableData=res.data;
        }
    }
</script>

<style scoped>
.title{
    font-size: 12px;
    color: gainsboro;
}
</style>