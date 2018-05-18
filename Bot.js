/**
 * 主程序逻辑
 */

'use strict';

var BaseBot = require('bot-sdk');
var HashMap = require('hashmap');
var SqlUtil = require('./SqlUtil');
var Dispatcher = require('./dispatcher');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);
        this.sqlUtil = new SqlUtil();
        this.dispatcher = new Dispatcher(this);
        // console.log('Bot ctor');

        this.addLaunchHandler(()=>{
            console.log('LaunchRequest');
            let card = new Bot.Card.ImageCard();
            card.addItem('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1526643927543&di=bf879630cece61edba1a4d353ead06e8&imgtype=0&src=http%3A%2F%2Fn1image.hjfile.cn%2Fmh%2F2017%2F02%2F23%2Ff3eb90ab776791a3d5cb4879ae91fbd0.jpg');
            //card.addItem('https://upload.wikimedia.org/wikipedia/commons/3/33/-LOVE-love-36983825-1680-1050.jpg');
            this.setSessionAttribute('s1', 0);
            this.waitAnswer();
            return {
                card: card,
                outputSpeech: '有爱，呵呵哒'
            };
        });

        /**
         * Handle all requests
         */
        this.addIntentHandler('ai.dueros.common.default_intent', ()=>{
            console.log('Default intent');
            let text = postData['request']['query']['original'];
            console.log(text);
            this.dispatcher.parseIntent(text);

            return;
        });

        /**
         * Use system dictionary to extract time
         */
        this.addIntentHandler('extract_time', ()=>{
            /*
            //这两个信息slot可以在handler里面通过bot.getSlot()获取
            let time = this.getSlot('sys.date-time');
            let date = this.getSlot('sys.date');*/

            let text = postData['request']['query']['original'];
            console.log(text);
            this.dispatcher.parseIntent(text);
        });

        this.addIntentHandler('personal_income_tax.inquiry', ()=>{
            let loc = this.getSlot('location');
            let monthlySalary = this.getSlot('monthlysalary');

            if(!monthlySalary) {
                let card = new Bot.Card.TextCard('你工资多少呢');

                // 如果有异步操作，可以返回一个promise
                return new Promise(function(resolve, reject){
                    resolve({
                        card : card,
                        outputSpeech : '你工资多少呢'
                    });
                });
            }

            if(!loc) {
                let card = new Bot.Card.TextCard('你在哪呢');
                return {
                    card: card,
                    outputSpeech: '你在哪呢'
                };

            }
          });
    }

    makeTextCard(text) {
        return {
            card: new Bot.Card.TextCard(text),
            outputSpeech: text
        }
    }

    matchYes(text) {
        let dict = [
             '是',
             '是的',
             '好',
             '好的',
             '行',
             '可以',
             '没问题',
             '确认',
             '确定',
             '对的',
             '对',
             '不错',
             '嗯'
        ];
        return this.exactMatch(text, dict);
    }

    matchNo(text) {
        let dict = [
            '不是',
            '否',
            '不是的',
            '不',
            '不对'
        ];
        return this.exactMatch(text, dict);
    }

    /**
     * @param {String} time 
     * @returns Time in format like '20180515000000'
     */
    formatTime(time) {
        return '';
    }

    /**
     * If text === any word of dict
     * @param {String} text 
     * @param {String[]} dict 
     */
    exactMatch(text, dict) {
        for (let word of dict) 
            if (text === word) return true;
        return false;
    }

    /**
     * If text has any word of dict
     * @returns boolean
     * @param {String} text 
     * @param {String[]} dict 
     */
    findMatch(text, dict) {
        return this.findPos(text, dict)[0] > -1;
    }

    /**
     * @returns [start position(-1 on failure), word]
     * @param {String} text 
     * @param {String[]} dict 
     */
    findPos(text, dict) {
        let pos = -1;
        for (let i = 0; i < dict.length; i++) {
            pos = text.indexOf(dict[i]);
            if (pos > -1) return [pos, dict[i]];
        }
        return [pos, ''];
    }

    /**
     * 
     * @param {String} text 
     */
    matchTime(text) {
        let dict = [
            '今天',
            '昨天',
            '前天',
            '大前天',
            '明天',
            '后天',
            '大后天',
            '星期一',
            '星期二',
            '星期三',
            '星期四',
            '星期五',
            '星期六',
            '星期日',
            '星期天',
            '周一',
            '周二',
            '周三',
            '周四',
            '周五',
            '周六',
            '周日',
            '周天',
            '周末',
            '礼拜一',
            '礼拜二',
            '礼拜三',
            '礼拜四',
            '礼拜五',
            '礼拜六',
            '礼拜日',
            '礼拜天',
            '上周',
            '下周',
            '上个月',
            '下个月',
            '春节',
            '情人节',
            '元旦',
            '国庆节'
        ];
        return this.findPos(text, dict);
    }

    matchRecord(text) {
        let dict = ['帮我记下', '记一下', '记得', '要提醒我', '记下', '添加提醒', '帮我记录', '记住', '记录'];
        return this.findPos(text, dict)[0] > -1;
    }

    matchReserve(text) {
        let dict = ['预订','预设','设定','预约'];
        let pos  =   - 1;
        for (var i = 0; i < dict.length; ++i) {
            pos = text.indexOf(dict[i]);
            if (pos > -1) {
                return pos;
            }
        }
        return pos;
    }
    matchRemind(text) {}
    matchRecall(text) {}
    relativeDays(){return [
      ['明天', 1],['后天',2],['大后天',3],['下周',7],['下个月',30],
      ['昨天', -1], ['前天',-2],['大前天',-3],['上周',-7],['上个月',-30]
    ]}
    relativeDaysMap() {return new HashMap(this.relativeDays())};

    getDateGap(dayText) {
      return this.relativeDaysMap().get(dayText);
    }

//add number of date gap, get Date object
    addDate(interval,number,date){
      switch(interval.toLowerCase()){
      case "y": return new Date(date.setFullYear(date.getFullYear()+number));
      case "m": return new Date(date.setMonth(date.getMonth()+number));
      case "d": return new Date(date.setDate(date.getDate()+number));
      case "w": return new Date(date.setDate(date.getDate()+7*number));
      case "h": return new Date(date.setHours(date.getHours()+number));
      case "n": return new Date(date.setMinutes(date.getMinutes()+number));
      case "s": return new Date(date.setSeconds(date.getSeconds()+number));
      case "l": return new Date(date.setMilliseconds(date.getMilliseconds()+number));
      }
    }
    addDateFromNow(interval, number) {
      return this.addDate(interval, number, new Date());
    }

    //calculate difference between 2 date
    diffDate(interval,date1,date2){
        var long = date2.getTime() - date1.getTime(); //相差毫秒
        switch(interval.toLowerCase()){
          case "y": return parseInt(date2.getFullYear() - date1.getFullYear());
          case "m": return parseInt((date2.getFullYear() - date1.getFullYear())*12 + (date2.getMonth()-date1.getMonth()));
          case "d": return parseInt(long/1000/60/60/24);
          case "w": return parseInt(long/1000/60/60/24/7);
          case "h": return parseInt(long/1000/60/60);
          case "n": return parseInt(long/1000/60);
          case "s": return parseInt(long/1000);
          case "l": return parseInt(long);
        }
    }
}

module.exports = Bot;
