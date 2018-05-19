function f(text){
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
 }



 var common = require('../config/common');
 module.exports = (bot, input) => {
    let s1 = bot.getSessionAttribute('s1', 0);
    console.log('s1: ' + s1);
    if (s1 == 0) {  // wait new intent
        if (bot.matchRecord(text)) {
            let timeResult = bot.matchTime(text);
            let pos = timeResult[0];
            let time = timeResult[1];
            let event = text.substr(pos + time.length);
            if (time == '' || event == '') {    // incomplete info
              bot.setSessionAttribute('s1', 2);
              bot.waitAnswer();
                return bot.makeTextCard('请问您要记录的事件是？');
            } else {    // enough info
                let formatedTime = bot.formatTime(time);
                bot.setSessionAttribute('s1', 1);
                bot.setSessionAttribute('time', time);
                bot.setSessionAttribute('formatTime', formatedTime);
                bot.setSessionAttribute('event', event);
                bot.waitAnswer();
                return bot.makeTextCard('好的，您是要记录' + time + event + '吗？');
            }
        }
    } else if (s1 == 1) {   // wait for comfirm
        if (bot.matchYes(text)) {  // answer is yes
            let formatTime = bot.getSessionAttribute('formatTime');
            let event = bot.getSessionAttribute('event');
            // todo: write db
            bot.endSession();
            return bot.makeTextCard('好的，已记录');
        } else if (bot.matchNo(text)) {    // answer is no
            bot.endSession();
            return bot.makeTextCard('好的，不记录了');
        } else {    // answer not clear
            let time = bot.getSessionAttribute('time');
            let formatTime = bot.getSessionAttribute('formatTime');
            let event = bot.getSessionAttribute('event');
            bot.waitAnswer();
            return bot.makeTextCard('什么，您是要记录' + time + event + '吗？');
        }
    } else if (s1 == 2) {   // wait for event
        let event = text;
        bot.setSessionAttribute('event', event);
        bot.setSessionAttribute('s1', 3);
        bot.waitAnswer();
        return bot.makeTextCard('请问时间是？');
    } else if (s1 == 3) {   // wait for alias
        let alias = text;
        bot.setSessionAttribute('alias', alias);
        bot.setSessionAttribute('s1', 4);
        bot.waitAnswer();
        return bot.makeTextCard('请问这是您的什么日子？');
    } else if (s1 == 4) {   // wait for time
        let time = text;
        let formatTime = bot.formatTime(text);
        bot.setSessionAttribute('time', time);
        bot.setSessionAttribute('formatTime', formatTime);
        let event = bot.getSessionAttribute('event');
        let alias = bot.getSessionAttribute('alias');
        
        bot.setSessionAttribute('s1', 1);
        bot.waitAnswer();
        return bot.makeTextCard('好的，您是要记录' + time + '的重要日子' + alias + ',' + event + '吗？');
    }
  };
  

let daysKeyWord = [
    '劳动节', '儿童节', // 节日
    '结婚纪念日', // 纪念日
    '老婆生日', // 生日
    '520'// 其他
]