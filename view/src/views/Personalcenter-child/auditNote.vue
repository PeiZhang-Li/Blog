<template>
    <div class="box">
        <div class="card" v-for="(item,index) of dataArr" :key="item._id" @click="show(item)">
            <div class="card-title">
                {{item.title}}
                <p style="float: right">状态:

                    <el-tag type="warning" v-if="item.Authority==0">未审核</el-tag>
                    <el-tag type="success" v-if="item.Authority==1">审核通过</el-tag>
                    <el-tag type="danger" v-if="item.Authority==2">审核失败</el-tag>
                </p>
            </div>
            <el-image :src="item.path" class="imgs"></el-image>
        </div>
        <el-dialog
                :title="dialog.title"
                :visible.sync="dialogVisible"
                width="80%"
        >
            <el-table
                    :data="dialog.userinfo"
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                >
                </el-table-column>
                <el-table-column
                        prop="username"
                        label="作者"
                >
                </el-table-column>

                <el-table-column
                        label="状态"
                        width="180">
                    <template slot-scope="data">
                        <el-select v-model="data.row.Authority" @change="select(data.row._id,data.row.Authority)">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column
                        label="操作"
                        width="180"
                >
                    <template slot-scope="data">
                        <el-button type="danger" @click="remove(data.row._id,data.row.filearr,data.row.path)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <p>内容:</p>
            <div class="content" v-html="dialog.userinfo[0].content"></div>
        </el-dialog>
    </div>
</template>

<script>
    import {baseUrl} from "../../../api/.env";

    export default {
        name: "auditNote",
        data() {
            return {
                options: [
                    {
                        value: 0,
                        label: '待审核'
                    },
                    {
                        value: 1,
                        label: '通过审核'
                    }, {
                        value: 2,
                        label: '拒绝审核'
                    }],
                dataArr: [],
                dialogVisible: false,
                dialog: {
                    title: '',
                    userinfo: [
                        {
                            date: '',
                            username: '',
                            Authority: '',
                            _id: '',
                            content: "",
                            filearr: '',
                            path: ''
                        }
                    ]
                }
            }
        },
        methods: {
            show(data) {
                this.dialog.title = data.title;
                this.dialog.userinfo[0].date = data.date
                this.dialog.userinfo[0].username = data.username;
                this.dialog.userinfo[0].Authority = data.Authority;
                this.dialog.userinfo[0]._id = data._id;
                this.dialog.userinfo[0].content = data.content;
                this.dialog.userinfo[0].filearr = data.filearr;
                this.dialog.userinfo[0].path = data.titleimgpath;
                this.dialogVisible = true;
            },
            async select(_id, Authority) {
                let res = await this.$http.post('/user/audit', {'data': JSON.stringify({_id, Authority})})
                if (res.data == 200) {
                    this.$message.success('修改成功')
                    this.getdata();
                } else {
                    this.$message.error('修改失败')
                }
            },
            async getdata() {
                let res = await this.$http.post('/getblog');
                res.data.forEach(item => {
                    item['path'] = baseUrl + this.$options.filters.ups(item.titleimgpath);
                })
                this.dataArr = res.data;
            },
            async remove(id, arr, path) {
                arr = Array.from(new Set(JSON.parse(arr)))
                arr.push(path)
                let res = await this.$http.post('/user/removeBlog', {
                    'id': JSON.stringify(id),
                    'filearr': JSON.stringify(arr)
                })
                if (res.data == 200) {
                    this.$message.success('删除成功')
                    this.dialogVisible = false;
                    this.getdata();
                } else {
                    this.$message.error('删除失败')
                }
            }
        },
        created() {
            //获取文章列表
            this.getdata();
        }
    }
</script>

<style scoped>
    .box {
        overflow: auto;
        padding: 20px;
        box-sizing: border-box;
    }

    .card {
        width: 300px;
        height: 200px;
        border: 1px solid #dcdcdc;
        border-radius: 10px;
        margin: 5px;
        float: left;
        cursor: pointer;
        overflow: hidden;
    }

    .card-title {
        height: 50px;
        border-bottom: 1px solid #dcdcdc;
        width: 100%;
        padding: 10px;
        overflow: hidden;
        box-sizing: border-box;
    }

    .imgs {
        width: 100%;
        text-align: center;
    }
</style>