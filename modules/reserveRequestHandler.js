/**
 * s1 is a status variable
 * State:
 * 0: wait new intent
 * 1: wait for comfirmation
 * 2: wait for event
 * 3: wait for time
 * 
 * Transform:
 * 0 -> 1, when we find time and event, ask confirmation
 * 0 -> 2, when time or event not found, ask event
 * 2 -> 3, always, ask time
 * 3 -> 1, always, ask confirmation
 * 1 -> 0, when answer is yes or no
 * 1 -> 1, when cannot deciding answer, ask confirmation again
 */
var common = require('../config/common');
var SqlUtil = require('../SqlUtil');
module.exports = (bot, text) => {
  let s1 = bot.getSessionAttribute('s1', 0);
  console.log('s1: ' + s1);
  if (s1 == 0) {  // wait new intent
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
  } else if (s1 == 1) {   // wait for comfirm
      if (bot.matchYes(text)) {  // answer is yes
          let formatTime = bot.getSessionAttribute('formatTime');
          let event = bot.getSessionAttribute('event');
          let sqlUtil = new SqlUtil();
          // write db
          sqlUtil.insert(formatTime, '', event, '', 1, '');
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
  } else if (s1 == 3) {   // wait for time
      let time = text;
      let formatTime = bot.formatTime(text);
      bot.setSessionAttribute('time', time);
      bot.setSessionAttribute('formatTime', formatTime);
      let event = bot.getSessionAttribute('event');
      bot.setSessionAttribute('s1', 1);
      bot.waitAnswer();
      return bot.makeTextCard('好的，您是要记录' + time + event + '吗？');
  }
};
