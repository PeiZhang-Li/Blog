<template>
    <div id="wangeditor">
        <div ref="editorElem" style="text-align:left;"></div>
    </div>
</template>
<script>
    import E from "wangeditor";
    import { baseUrl } from '../../api/.env.js'
    export default {
        name: "Editor",
        data() {
            return {
                editor: null,
                editorContent: ''
            };
        },
        mounted() {
            let that=this;
            this.editor = new E(this.$refs.editorElem);
            // 编辑器的事件，每次改变会获取其html内容
            this.editor.customConfig.onchange = html => {
                this.editorContent = html;
                this.$emit('Editor',html)
            };
            this.editor.customConfig.menus = [
                // 菜单配置
                'head', // 标题
                'bold', // 粗体
                'fontSize', // 字号
                'fontName', // 字体
                'italic', // 斜体
                'underline', // 下划线
                'strikeThrough', // 删除线
                'foreColor', // 文字颜色
                'backColor', // 背景颜色
                'link', // 插入链接
                'list', // 列表
                'justify', // 对齐方式
                'quote', // 引用
                'emoticon', // 表情
                'image', // 插入图片
                'table', // 表格
                'code', // 插入代码
                'undo', // 撤销
                'redo' // 重复
            ];
           this.editor.customConfig.customUploadImg = async  function (files, insert) {
                // files 是 input 中选中的文件列表
                // insert 是获取图片 url 后，插入到编辑器的方法
                // 上传代码返回结果之后，将图片插入到编辑器中
                let fd=new FormData();

                fd.append('file',files[0]);
                 let res=await that.$http.post('/user/upImg',fd);
                that.$emit('getfilepath',res.data.path)
               insert(baseUrl+'/'+that.$options.filters.ups(res.data.path))
            }
            this.editor.create();
        }
    } // 创建富文本实例
</script>