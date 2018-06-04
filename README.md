# myapp

> Vue + express 前后台分离

说来惭愧，搞前端这么久了，自己从没写过接口。打算写一个vue+express的博客。计划采用的是前后台分离的。前端用的vue-cli 脚手架，后端用的express框架。

```js
// 在一个合适的文件夹内,创建项目myapp 
vue init webpack myapp

cd myapp

cnpm install

cnpm install axios 

cnpm run dev

``` 

在main.js 中作如下修改
``` main.js
import axios from 'axios'

Vue.prototype.axios=axios;
```

开始搭建后台这块，我用的ubuntu ，默认安装好了mongodb
```

cnpm i -g express-generator
// 在myapp 的根目录下面  `express server`
express server

cnpm instal 
cnpm i cors // 解决跨域用的
cnpm i config-lite connect-flash connect-mongo express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save

/*
config-lite: 读取配置文件
connect-flash: 页面通知的中间件，基于 session 实现
connect-mongo: 将 session 存储于 mongodb，结合 express-session 使用
express-formidable: 接收表单及文件上传的中间件
express-session: session 中间件
marked: markdown 解析
moment: 时间格式化
mongolass: mongodb 驱动
objectid-to-timestamp: 根据 ObjectId 生成时间戳
sha1: sha1 加密，用于密码加密
winston: 日志
express-winston: express 的 winston 日志中间件
*/

node ./bin/www      
// 保持后台启动状态
```

在 server 里面的app.js 中加入
```js
var cors =require('cors');

app.use(cors());

```
到此处，后台基本搭建完了。 在server 文件夹下面找到routes 下面的 index.js . 更改一下代码

```
router.get('/',function(req,res,next){
    res.send({
        status:110,
        info:'这个是index接口返回来的内容'
        content:'终于调试通了这个接口！'
    });
})

```

此时在浏览器上输入 `localhost:3000` 理论上可以看到上面接口返回的内容，如果看不到，重启后台服务器，即 node ./bin/www



再来到 vue 里面，打开 HelloWorld.vue . 将下面的代码复制到里面。
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
   
  <div>{{test.info}}</div>
  <h2>{{test.content}}</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      test:'',
      content:''
    }
  },
  mounted(){
    this.axios({
      method:'get',
      url:'http://localhost:3000'
    }).
    then((res)=> {
      console.log(res);
      console.log(this.msg)
      this.test=res.data;
      })
  }
}
</script>

```  
**注意:**在this.axios().then((res)=>{}).catch()  一定要用箭头函数，否则this 将不是你认为的那个this
打开浏览器  http://localhost:8080




**注意**对于跨域问题，不通过cors包，还可以通过app.all 进行配置
```js
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
　next();　
});
```

```
.myapp
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── index.js
│   └── prod.env.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── server
│   ├── app.js
│   ├── bin
│   │   └── www
│   ├── package.json
│   ├── public
│   │   ├── images
│   │   ├── javascripts
│   │   └── stylesheets
│   ├── routes
│   │   ├── first.js
│   │   ├── index.js
│   │   └── users.js
│   └── views
│       ├── error.jade
│       ├── index.jade
│       └── layout.jade
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
│   │   └── HelloWorld.vue
│   ├── main.js
│   └── router
│       └── index.js
└── static

```




## 关于mongodb的部分未完待续
