// 注册意图Handler
// ./handlers文件夹下包含处理函数
require('hashmap');
require('Bot');
require('./config/Common');
require('./models/State');
class Dispatcher {
  constructor(Bot bot) {
    this.handlerMap  = new HashMap();
    this.common = new Common();
    this.state = new State();
    this.bot = bot;
  }

  //中控函数，负责解析意图
  this.parseIntent(input) {
    var state = this.bot.getSessionAttribute('state', -1);
    //初始状态
    if (state == -1) {
      //疑问句
      if (this.common.isQuestion(input)) {
        if (this.common.isRecent(input)) {
          this.handlerMap.get(this.state.STATE_ASK_EVENT)(this.bot, input); //handle intent
        }else {
          this.handlerMap.get(this.state.STATE_RECALL_EVENT)(this.bot, input); //handle intent
        }
      //陈述句
      }else {
        

      }

    }

    //调用map中的handler 函数
  }


}

module.exports = Dispatcher;
