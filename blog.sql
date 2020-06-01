/*
 Navicat MongoDB Data Transfer

 Source Server         : test
 Source Server Type    : MongoDB
 Source Server Version : 40200
 Source Host           : localhost:27017
 Source Schema         : blog

 Target Server Type    : MongoDB
 Target Server Version : 40200
 File Encoding         : 65001

 Date: 01/06/2020 17:29:12
*/


// ----------------------------
// Collection structure for menu
// ----------------------------
db.getCollection("menu").drop();
db.createCollection("menu");

// ----------------------------
// Documents of menu
// ----------------------------
db.getCollection("menu").insert([ {
    _id: ObjectId("5ecba7e80529fe29588cc91e"),
    menuName: "ES6"
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("5ecca64c89856d0a08750e46"),
    menuName: "Vue"
} ]);
db.getCollection("menu").insert([ {
    _id: ObjectId("5ed4c83a3a5d2d20a03a40f4"),
    menuName: "javascript"
} ]);

// ----------------------------
// Collection structure for user
// ----------------------------
db.getCollection("user").drop();
db.createCollection("user");

// ----------------------------
// Documents of user
// ----------------------------
db.getCollection("user").insert([ {
    _id: ObjectId("5eca277519198d2cd0846a46"),
    email: "593872818@qq.com",
    username: "admin",
    password: "fd936f689a4b6dc57b53ff85ec7476e6edc0d266b656765fb4dc95ac706c33c7",
    Authority: "0",
    url: "upload\\userinfo\\f4miGRatH5v9Y-nNy89BXl7I.jpg"
} ]);
db.getCollection("user").insert([ {
    _id: ObjectId("5ecb79745bce4c122c319416"),
    email: "2075329892@qq.com",
    username: "憨憨",
    password: "b8988e82ac5dd09892234264929cccbfe615679f3e7d449bb0404f8c2c7907e0",
    Authority: "1",
    url: "upload\\userinfo\\Bkzi_IlMKgINMqMpmkNAL1e5.jpg"
} ]);

// ----------------------------
// Collection structure for w-blog
// ----------------------------
db.getCollection("w-blog").drop();
db.createCollection("w-blog");

// ----------------------------
// Documents of w-blog
// ----------------------------
db.getCollection("w-blog").insert([ {
    _id: ObjectId("5ecf74f21ade0431b8eccabb"),
    title: "Vue中的nexttick",
    content: "<p><img src=\"/api/upload/bolg\\JdlrIOJk9uiYlm8h7TIWgTo-.png\" style=\"max-width:100%;\"></p>",
    filearr: "[\"upload\\\\bolg\\\\JdlrIOJk9uiYlm8h7TIWgTo-.png\"]",
    select: "Vue",
    date: "2020-05-28 16:23:14",
    username: "admin",
    email: "593872818@qq.com",
    Authority: NumberInt("1"),
    titleimgpath: "upload\\bolg\\r5A6TXUMsDNb2npZpvA69FFs.webp"
} ]);
db.getCollection("w-blog").insert([ {
    _id: ObjectId("5ecf75361ade0431b8eccabc"),
    title: "ES6中的类",
    content: "<p><img src=\"/api/upload/bolg\\JogsbXzaFBoQ54drs8zsJh_7.png\" style=\"max-width:100%;\"></p>",
    filearr: "[\"upload\\\\bolg\\\\JogsbXzaFBoQ54drs8zsJh_7.png\"]",
    select: "ES6",
    date: "2020-05-28 16:24:22",
    username: "admin",
    email: "593872818@qq.com",
    Authority: NumberInt("1"),
    titleimgpath: "upload\\bolg\\BD6y-A_tmh3Y3Ltg4FCZSTMd.png"
} ]);
db.getCollection("w-blog").insert([ {
    _id: ObjectId("5ecf76931ade0431b8eccabd"),
    title: "vue如何完成的双向数据绑定？",
    content: "<p>\n\n</p><div yne-bulb-block=\"paragraph\"><span>defineProperty&nbsp;&nbsp;可以修改对象下某一个属性值,且实时监听修改的内容变化采用数据劫持,发布者和订阅者的原理,defineProperty去劫持setter中属性的,实时变化,在数据变动时发布消息给订阅者,触发响应的回调</span></div><div yne-bulb-block=\"paragraph\"><pre><code>&lt;!DOCTYPE html&gt;<br>&lt;html lang=\"en\"&gt;<br>&lt;head&gt;<br>    &lt;meta charset=\"UTF-8\"&gt;<br>    &lt;title&gt;Title&lt;/title&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>&lt;p id=\"p1\"&gt;&lt;/p&gt;<br>&lt;input type=\"text\" id=\"inp\"&gt;<br>&lt;script&gt;<br>    let p=document.getElementById('p1');<br>    let obj={txt:''};<br>    document.addEventListener('keyup',function (e) {<br>        obj.txt=e.target.value;<br>    });<br>    //采用数据劫持，发布者和订阅者的原理，defineProperty去劫持setter中属性的实时变化，在数据变化时触发响应的回调<br>    Object.defineProperty(obj,'txt',{<br>        set:function (val) {//接受到的属性的改变，发布修改过之后的内容<br>            p.innerHTML=val;<br>        },<br>        get:function () {//订阅者，检测到数据的变动<br>            return obj;<br>        }<br>    })<br>&lt;/script&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;</code></pre><p><br><br></p><span></span></div>\n\n",
    filearr: "[]",
    select: "Vue",
    date: "2020-05-28 16:30:11",
    username: "憨憨",
    email: "2075329892@qq.com",
    Authority: NumberInt("1"),
    titleimgpath: "upload\\bolg\\Ba8QVLS-z2qWd7cQtdjdYu8X.webp"
} ]);
db.getCollection("w-blog").insert([ {
    _id: ObjectId("5ed4c98c3a5d2d20a03a40f5"),
    title: "DOM",
    content: "<p><img src=\"/api/upload/bolg\\8uerE0L2iZFaoXq3utOZ8YDU.png\" style=\"max-width:100%;\"></p>",
    filearr: "[\"upload\\\\bolg\\\\8uerE0L2iZFaoXq3utOZ8YDU.png\"]",
    select: "javascript",
    date: "2020-06-01 17:25:31",
    username: "admin",
    email: "593872818@qq.com",
    Authority: NumberInt("1"),
    titleimgpath: "upload\\bolg\\kz3YAUeE5FzQIm-g90zJW1-z.png"
} ]);
