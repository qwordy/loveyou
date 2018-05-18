/**
 * LoveYou的入口程序
 */

const express = require('express');

const LoveYouApp = require('./loveYouApp');
var app = express();
global.Bot = LoveYouApp

// 探活请求
// DuerOS会定期发送探活请求到你的服务，确保你的服务正常运转，[详情请参考](http://TODO)
app.head('/', (req, res) => {
    res.sendStatus(204);
});

app.get('/', (req, res) => {
  res.sendStatus(200);
  res.send('OK!');
});

// 监听post请求，DuerOS以http POST的方式来请求你的服务，[具体协议请参考](http://TODO)
app.post('/', (req, res) => {
    req.rawBody = '';

    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        req.rawBody += chunk;
    });

    req.on('end', function() {
        var loveYouApp = new LoveYouApp(JSON.parse(req.rawBody));
        global.app = loveYouApp;

        // 开启签名认证
        loveYouApp.initCertificate(req.headers, req.rawBody).enableVerifyRequestSign();
       
        // 不需要监控
        loveYouApp.run().then(function(result){
           res.send(result);
        });
    });
}).listen(8008);

