//这个文件是不需要登录验证的路由
const express = require('express');
//引入封装好的mongodb文件,方便进行增删改查
const mongo = require('../model/mongo');
//引入express Router
const Router = express.Router();
//密码加密:(框架自带的包)
const crypto = require("crypto");
//设置加密的密钥
const secret = 'dsadfdsfdkjfskdfkjafdddd';
//引入token工具包
let jwt = require('jsonwebtoken');
//引入发送验证码包
let sendemail=require('../static/javascript/sendemail');
//注册
Router.post('/register', (req, res) => {
    let data = JSON.parse(req.body.ruleForm);
    //进行加密操作
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
    //向数据库完成添加

    mongo.zeng('blog', 'user', data, {'email':data.email}).then(data => {
        if (data == 1) {
            //添加成功返回
            res.send({code: '200'})
        } else {
            //添加失败返回，包含重复添加也会被阻止,上面的形参最后一位就是用户唯一值
            res.send({code: '500'})
        }
    })
})
//登录
Router.post('/login', (req, res) => {
    let data = JSON.parse(req.body.ruleForm);
    //将发送来的密码进行和注册时同样的加密，这样就和数据库中存储的密文相对应
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
    mongo.cha('blog', 'user', data).then(data => {
        if (data.length !== 0) {
            //准备进行派发token
            delete data[0]._id;     //删除id，防止注入攻击
            delete data[0].password;//删除密码,删除这个是因为发送前端不可能将用户密码也发送过去
            const token = jwt.sign(data[0], "suibian", {
                expiresIn: 86400,//一天过期
            });
            data[0]['token'] = token;//添加token字段
            res.send(data[0])
        } else {
            res.send({code: '500'})
        }
    })
})
//重置账户信息
//1.发送验证码部分

let code=null//验证码,这个存储在服务器端
Router.post('/sendcode',(req,res)=>{
sendemail.sends(req.body.email).then(data=>{
    if(data==-1){
        res.send('-200')
    }else{
        code=data;
        let time=setTimeout(()=>{
            code=null;
            clearTimeout(time)
        },60000)
        res.send('200')
    }
})
})
//2.验证用户信息部分
Router.post('/Resetaccount',(req,res)=>{
    let data = JSON.parse(req.body.ruleForm);
    if(data.code===code){
       data.password= crypto.createHmac('sha256', secret).update(data.password).digest('hex');
       mongo.xiu('blog', 'user',{'email':data.email},{'password':data.password}).then(data=>{
           if(data==1){
               res.send('200')
           }else{
               res.send('001')
           }
       })
    }else{
        res.send('000')
    }

})


//获取文章
Router.post('/getblog',(req,res)=>{
mongo.cha('blog','w-blog',{}).then(data=>{
    res.send(data)
})
})
//获取个人文章中的用户信息
Router.post('/getuserinfo',(req,res)=>{
    let email=req.body.email;
     mongo.cha('blog','user',{email}).then(data=>{
         let datas=data[0];
         delete datas.password;
         delete datas._id;
         delete datas.Authority;
         res.send(datas)
     })
})
//获取分类
Router.post('/getmenu',(req,res)=>{
    mongo.cha('blog','menu',{}).then(data=>{
        res.send(data)
    })
})
//获取数据
Router.post('/getdata',(req,res)=>{
    let obj={'Authority':1}
   if(req.body.name){
       obj={'select':req.body.name,'Authority':1}
   }
    mongo.cha('blog','w-blog',obj).then(data=>{
          res.send(data)
    })
})
module.exports = Router;