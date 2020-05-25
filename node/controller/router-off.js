//这个文件是不需要登录验证的路由
const express = require('express');
//引入封装好的mongodb文件,方便进行增删改查
const mongo = require('../model/mongo');
//引入express Router
const Router = express.Router();
//引入token工具包
let jwt = require('jsonwebtoken');
//引入处理文件的模块
let multiparty=require('multiparty')
//引入fs
let fs=require('fs')
Router.use((req,res,next)=>{
    jwt.verify(req.headers.authorization, 'suibian', function(err, decoded) {
        if(!err){
            res.setHeader('Authority',decoded.Authority)
            next()
        }else{
            res.send('-207')
        }
    })

})
//设置用户信息部分
Router.post('/upBlog',(req,res)=>{
    if(req.body.username){
       //没有文件
        mongo.xiu('blog','user',{'email':req.body.email},{'username':req.body.username}).then(data=>{
            if(data=='1'){
                res.send('200')
            }else{
                res.send('-201')
            }
        })
    }else{
        //有文件
        let form = new multiparty.Form();
        form.uploadDir = "upload/userinfo"; //设置文件上传的目录
        form.parse(req,(err, fields, files)=>{
            let username=fields.username[0];
            let email=fields.email;
            let path=files.file[0].path;
            mongo.cha('blog','user',{'email':email[0]}).then(data=>{
                 if(data[0].url){
                     let oldurl=data[0].url;
                     fs.unlink(oldurl,(err)=>{})
                 }
                 mongo.xiu('blog','user',{'email':email[0]},{'url':path,'username':username}).then(data=>{
                     if(data=='1'){
                         res.send('200')
                     }else{
                         res.send('-201')
                     }
                 })
            })
        })
    }
})
module.exports=Router;

