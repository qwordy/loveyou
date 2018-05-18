// 注册意图Handler
// ./handlers文件夹下包含处理函数
require('hashmap');
require('Bot');
require('./config/Common');
require('./models/State');
var Common = new Common();
var Map = new HashMap();
var State = new State();
class Dispatcher {
  constructor(Bot bot) {
    this.bot = bot;
  }

  //中控函数，负责解析意图, 并派发给对应的Handler
  this.parseIntent(input) {
    var state = this.bot.getSessionAttribute('state', -1);
    //初始状态
    if (state == -1) {
      //疑问句
      if (Common.isQuestion(input)) {
        if (Common.isRecent(input)) {
          Map.get(State.STATE_ASK_EVENT)(this.bot, input); //handle intent
        }else {
          Map.get(State.STATE_RECALL_EVENT)(this.bot, input); //handle intent
        }
      //陈述句
      }else {
        if(Common.isRecording(input)) {
          Map.get(State.STATE_RECORD_EVENT)(this.bot, input);
        }else if(Common.isReserving(input)) {
          Map.get(State.STATE_RESERVE_REMINDER)(this.bot, input);
        }else {
          Map.get(State.STATE_RECORD_EVENT)(this.bot, input);
        }else {
          //TODO delegate to DuerOS
        }
      }

    //已经开始了对话，继续之前的对话
    } else {
      //获得意图开始 数字位
       var intentId = this.bot.getSessionAttribute('state');
       Map.get(intentId)(this.bot, input);
    }

    //调用map中的handler 函数
  }

 //注册Intent Handler
  this.registerIntent(intentId, intentHandler) {
     Map.set(intentId, intentHandler);
  }


}

module.exports = Dispatcher;
