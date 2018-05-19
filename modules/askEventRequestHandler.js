var async = require('async')
var SqlUtil = require('../SqlUtil');
var Common = require('../config/common');
var TIME_WINDOW = 21; //3weeks in future

var common = new Common();
var sqlUtil = new SqlUtil();
// var sqlUtil = new SqlUtil();
// sqlUtil.insert('20180505120000', 'abc', 'def', '', 0, 0);
// sqlUtil.query('20180501000000', '20180530000000', 1, function(rows) */

var rows;
function handleAskEventRequest (bot, input) {
    console.log('askEventRequest');

    async.waterfall(
            [
               //parse input
               function(callback) {
                 // TODO 处理请求得到开始时间、终止时间和重要性
                var beginTime =  new Date().format("yyyyMMddhhmmss");
                var endTime = common.addDateFromNow('d', TIME_WINDOW).format("yyyyMMddhhmmss");

                var priority = 2;
                // callback(error, response)
                callback(null,  {
                    'beg' : beginTime,
                    'end' : endTime,
                    'prio': priority
                });
               },
               
               //send DB query
               function(queryInfo, callback) {
                console.log('query -> ', queryInfo);
                sqlUtil.query(queryInfo.beg, queryInfo.end, queryInfo.prio, (err, rows)=>{
                    callback(err, rows);
                })
               },

               //process result
               function(rows, callback) {
                console.log('process -> ', rows);
                text = "";
                for (const i in rows) {
                    if (rows[i].alias != undefined) {
                        text += rows[i].alias;
                    }else {
                        text += rows[i].date;
                    }
                    if (rows[i].event != undefined) {
                        text += rows[i].event;
                    }
                }            
                callback(null, text);
               }

               //handle final result
            ], function(error, result) {
                if (error) {
                    console.log("Async ERROR");
                    return;
                }
                //normal return;
                if (result.length == 0) 
                    result = "并没有什么重要的日子呢，尽力把每一天活得有点不一样吧";
                console.log(result);
                return bot.makeTextCard(result);
                /*return new Promise(function(resolve, reject){
                    resolve({
                        card : bot.makeTextCard(result),
                        outputSpeech : '你工资多少呢'
                    });
                });*/

            });
    
    return bot.makeTextCard();
}
//日期格式化
Date.prototype.format = function(fmt) { 
  var o = { 
     "M+" : this.getMonth()+1,                 //月份 
     "d+" : this.getDate(),                    //日 
     "h+" : this.getHours(),                   //小时 
     "m+" : this.getMinutes(),                 //分 
     "s+" : this.getSeconds(),                 //秒 
     "q+" : Math.floor((this.getMonth()+3)/3), //季度 
     "S"  : this.getMilliseconds()             //毫秒 
     }; 
     if(/(y+)/.test(fmt)) {
             fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
     }
      for(var k in o) {
         if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
     return fmt; 
}

function parseQuery (input, callback) {
    // TODO 处理请求得到开始时间、终止时间和重要性
    var beginTime =  new Date().format("yyyyMMddhhmmss");
    var endTime = common.addDateFromNow('d', TIME_WINDOW).format("yyyyMMddhhmmss");

    var priority = 2;
    // callback(error, response)
    callback(null,  {
        'beg' : beginTime,
        'end' : endTime,
        'prio': priority
    });
}

function query(beginTime, endTime, priority) {
    var rows; 
    sqlUtil.query(beginTime, endTime, priority, function(results){
        rows = results;
    });
}

let MAX_COUNT = 5
function processResult(results) {
    if (typeof(results) == undefined) {
        results = new Array();
    } else if (results.length > MAX_COUNT) {
        results = results.slice(0, MAX_COUNT);
    }

    return results
}

module.exports = handleAskEventRequest;
