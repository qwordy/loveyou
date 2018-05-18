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

module.exports = (bot, input) => {
  let s1 = bot.getSessionAttribute('s1', 0);
  console.log('s1: ' + s1);
  if (s1 == 0) {  // wait new intent
      if (this.matchRecord(text)) {
          let timeResult = this.matchTime(text);
          let pos = timeResult[0];
          let time = timeResult[1];
          let event = text.substr(pos + time.length);
          if (time == '' || event == '') {    // incomplete info
              this.setSessionAttribute('s1', 2);
              this.waitAnswer();
              return this.makeTextCard('请问您要记录的事件是？');
          } else {    // enough info
              let formatedTime = this.formatTime(time);
              this.setSessionAttribute('s1', 1);
              this.setSessionAttribute('time', time);
              this.setSessionAttribute('formatTime', formatedTime);
              this.setSessionAttribute('event', event);
              this.waitAnswer();
              return this.makeTextCard('好的，您是要记录' + time + event + '吗？');
          }
      }
  } else if (s1 == 1) {   // wait for comfirm
      if (this.matchYes(text)) {  // answer is yes
          let formatTime = this.getSessionAttribute('formatTime');
          let event = this.getSessionAttribute('event');
          // todo: write db
          this.endSession();
          return this.makeTextCard('好的，已记录');
      } else if (this.matchNo(text)) {    // answer is no
          this.endSession();
          return this.makeTextCard('好的，不记录了');
      } else {    // answer not clear
          let time = this.getSessionAttribute('time');
          let formatTime = this.getSessionAttribute('formatTime');
          let event = this.getSessionAttribute('event');
          this.waitAnswer();
          return this.makeTextCard('什么，您是要记录' + time + event + '吗？');
      }
  } else if (s1 == 2) {   // wait for event
      let event = text;
      this.setSessionAttribute('event', event);
      this.setSessionAttribute('s1', 3);
      this.waitAnswer();
      return this.makeTextCard('请问时间是？');
  } else if (s1 == 3) {   // wait for time
      let time = text;
      let formatTime = this.formatTime(text);
      this.setSessionAttribute('time', time);
      this.setSessionAttribute('formatTime', formatTime);
      let event = this.getSessionAttribute('event');
      this.setSessionAttribute('s1', 1);
      this.waitAnswer();
      return this.makeTextCard('好的，您是要记录' + time + event + '吗？');
  }
};
