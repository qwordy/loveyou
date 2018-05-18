var SqlUtil = require('./SqlUtil');
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
    rows = query(queryInfo[],queryInfo[],queryInfo[]).processResult();

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

function parseQuery (input) {
    // TODO 处理请求得到开始时间、终止时间和重要性
    var beginTime =  new Date().format("yyyyMMddhhmmss");
    var endTime = addDateFromNow(TIME_WINDOW).format("yyyyMMddhhmmss");
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