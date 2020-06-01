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
let fs=require('fs');
//引入mongodb相关处理
let objectId = require('mongodb').ObjectID;
//全局拦截器
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
//上传分类
Router.post('/upMenu',(req,res)=>{
    console.log(req.body.menuName)
    mongo.zeng('blog','menu',req.body,req.body).then(data=>{
       if(data==1){
           res.send('200')
       }else{
           res.send('501')
       }
    })
})
//获取分类
Router.post('/getMenu',(req,res)=>{
    mongo.cha('blog','menu',{}).then(data=>{
          res.send(data)
    })
})
//删除分类
Router.post('/removeMenu',(req,res)=>{
   let _id=objectId(req.body._id);
    mongo.shan('blog','menu',{_id}).then(data=>{
        if(data==1){
            res.send('200')
        }else{
            res.send('501')
        }
    })

})
//获取用户信息
Router.post('/getUsrtinfo',(req,res)=>{
    mongo.cha('blog','user',{}).then(data=>{
        let arr=[]
        data.forEach(item=>{
            delete item.password;
            delete item.url;
            arr.push(item)
        })
        res.send(arr);
    })
})
//设置用户信息
Router.post('/setUserinfo',(req,res)=>{
     let data=JSON.parse(req.body.userinfo);
     let _id=objectId(data._id);
     delete data._id;
     mongo.xiu('blog','user',{_id},data).then(data=>{
         if(data==1){
             res.send('200')
         }else{
             res.send('501')
         }
     })

})
//上传图片
Router.post('/upImg',(req,res)=>{
    let form = new multiparty.Form();
    form.uploadDir = "upload/bolg"; //设置文件上传的目录
    form.parse(req,(err, fields, files)=>{

         res.send({'path':files.file[0].path})
    })
})
//上传文章
Router.post('/upBlogs',(req,res)=>{
    let form = new multiparty.Form();
    form.uploadDir = "upload/bolg"; //设置文件上传的目录
    form.parse(req,(err,fileds,files)=>{
           let titleimgpath=files.file[0].path;
            let data=JSON.parse(fileds.data[0]);
            data.removearr.forEach(item=>{
                fs.unlink(item,()=>{})
            })
            delete  data.removearr
              data['filearr']=JSON.stringify(data.filearr)
            data['titleimgpath']=titleimgpath
           mongo.zeng('blog','w-blog',data,{'title':data.title}).then(data=>{
               if (data == 1) {
                   //添加成功返回
                   res.send({code: '200'})
               } else {
                   //添加失败返回，包含重复添加也会被阻止,上面的形参最后一位就是用户唯一值
                   res.send({code: '500'})
               }
           })
    })
})
//审核
Router.post('/audit',(req,res)=>{
    let data=JSON.parse(req.body.data);
    let _id=objectId(data._id)
    delete data._id;
    mongo.xiu('blog','w-blog',{_id},data).then(data=>{
       if(data==1){
           res.send('200')
       }else{
           res.end()
       }
    })

})
//删除文章
Router.post('/removeBlog',(req,res)=>{
    let _id=objectId(JSON.parse(req.body.id));
    let filearr=JSON.parse(req.body.filearr)
    mongo.shan('blog','w-blog',{_id}).then(data=>{
        if(data==1){
               filearr.forEach(item=>{
                    fs.unlink(item,()=>{})
               })
            res.send('200')
        }else{
            res.end();
        }
    })
})
//获取个人文章
Router.post('/getBlog',(req,res)=>{
    let email=JSON.parse(req.body.email);

    mongo.cha('blog','w-blog',{email}).then(data=>{
           res.send(data)
    })

})

module.exports=Router;

