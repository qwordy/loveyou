var SqlUtil = require('../SqlUtil');
var Common = require('../config/common');
var TIME_WINDOW = 21; //3weeks in future

var common = new Common();
var sqlUtil = new SqlUtil();
// var sqlUtil = new SqlUtil();
// sqlUtil.insert('20180505120000', 'abc', 'def', '', 0, 0);
// sqlUtil.query('20180501000000', '20180530000000', 1, function(rows) */

function handleAskEventRequest (bot, input) {
    console.log('askEventRequest');

    queryInfo = parseQuery(input);
    rows = query(queryInfo.beg, queryInfo.end, queryInfo.prio);
    console.log('query -> ', rows);
    rows = processResult(rows);
    console.log('processResult -> ', rows);
    
    // TODO 返回结果给用户
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
    return common.makeTextCard(text);
    
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

function parseQuery (input) {
    // TODO 处理请求得到开始时间、终止时间和重要性
    var beginTime =  new Date().format("yyyyMMddhhmmss");
    var endTime = common.addDateFromNow('d', TIME_WINDOW).format("yyyyMMddhhmmss");

    var priority = 2;
    return  {
        'beg' : beginTime,
        'end' : endTime,
        'prio': priority
    }
}

function query(beginTime, endTime, priority) {
    
    sqlUtil.query(beginTime, endTime, priority, function(results){
        return results;
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
