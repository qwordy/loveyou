var BaseBot = require('bot-sdk');
var HashMap = require('hashmap');
var SqlUtil = require('./SqlUtil');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);
        this.sqlUtil = new SqlUtil();

        this.addIntentHandler('LaunchRequest', ()=>{
            console.log('LaunchRequest');
            let card = new Bot.Card.ImageCard();
            card.addItem('https://upload.wikimedia.org/wikipedia/commons/3/33/-LOVE-love-36983825-1680-1050.jpg');
            this.setSessionAttribute('s1', 0);
            this.waitAnswer();
            return {
                card: card,
                outputSpeech: '欢迎使用有爱'
            };
        });

        /**
         * s1 is a status variable
         * 0: waiting new intent
         * 1:
         * 2:
         */
        this.addIntentHandler('ai.dueros.common.default_intent', ()=>{
            let s1 = this.getSessionAttribute('s1', 0)
            console.log('s1: ' + s1);
            if (s1 == 0) {
                if (this.matchRecord(text)) {
                    time = ''
                    event = ''

                }
            }

            this.setSessionAttribute('s1', s1 + 1);
            this.waitAnswer();

            //console.log(postData);
            let text = postData['request']['query']['original']
            //let card = new Bot.Card.TextCard(text);
            let card = new Bot.Card.ImageCard();
            card.addItem('https://upload.wikimedia.org/wikipedia/commons/3/33/-LOVE-love-36983825-1680-1050.jpg');
            var pos;
            if (this.matchRecord(text)) {
                console.log('matchRecord');
            } else if ((pos = this.matchReserve(text)) >= 0) {
                console.log("matchReserve@"+pos);
                var pos2 = text.indexOf('去');
                if (pos2 > 0) {
                    var time = text.substring(pos+2, pos2);
                    console.log('时间：'+ time);
                    var gap = this.getDateGap(time);
                    if (typeof(gap) != undefined) {
                        time = this.addDateFromNow('d', gap);
                        console.log('Actual time: '+time);
                    } else {
                      console.log('Relative Date Unknown, put raw data in');
                    }
                    console.log('动作：'+text.substring(pos2));
                }else {
                    console.log('total: '+text.substring(pos+2));
                }
            } else if (this.matchRemind(text)) {
                console.log('match matchRemind');
            } else if (this.matchRecall(text)) {
                console.log('match matchRecall');
            }else {
              console.log("nothing matched!");
            }
            console.log(text)
            return {
                card: card,
                outputSpeech: text
            }
        });

        this.addIntentHandler('recording', ()=>{
            console.log('recording');
            if(!this.request.isDialogStateCompleted()) {
                return this.nlu.setDelegate();
            }
            let date = this.getSlot('sys.date');
            let action = this.getSlot('action');
            console.log(date);
            console.log(action);
            console.log(this.request.getData())
            let card = new Bot.Card.TextCard('好的记下了呢');
            return {
                card: card,
                outputSpeech: '好的'
            };
        });

        this.addIntentHandler('apprRecord', ()=>{
            console.log('apprRecord');
            if(!this.request.isDialogStateCompleted()) {
                return this.nlu.setDelegate();
            }
            let date = this.getSlot('sys.date');
            let holiday = this.getSlot('sys.holiday');
            console.log(date);
            console.log(holiday);
            console.log(this.request.getData())
            let card = new Bot.Card.TextCard('好的记下了呢');
            return {
                card: card,
                outputSpeech: '提醒已经设置成功'
            };
        });

        this.addIntentHandler('query_event', ()=>{
            if(!this.request.isDialogStateCompleted()) {
                return this.nlu.setDelegate();
            }
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

    matchAsk(text) {

    }

    /**
     * @param {string} time 
     * @returns Time in format like '20180515000000'
     */
    convertTime(time) {
        return '';
    }

    /**
     * @returns [start position(-1 on failure), word length]
     * @param {*} text 
     * @param {*} dict 
     */
    findPos(text, dict) {
        let pos = -1;
        for (let i = 0; i < dict.length; i++) {
            pos = text.indexOf(dict[i]);
            if (pos > -1) return [pos, dict[i].length];
        }
        return [pos, 0];
    }

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
