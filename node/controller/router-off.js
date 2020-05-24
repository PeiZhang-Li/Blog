//这个文件是不需要登录验证的路由
const express = require('express');
//引入封装好的mongodb文件,方便进行增删改查
const mongo = require('../model/mongo');
//引入express Router
const Router = express.Router();
//引入token工具包
let jwt = require('jsonwebtoken');
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
Router.post('/upBlog',(req,res)=>{
    res.send('Hello Word')
})
module.exports=Router;

