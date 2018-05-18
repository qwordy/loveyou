// 注册意图Handler
// ./handlers文件夹下包含处理函数
require('hashmap');
require('./Bot');
require('./config/Common');
require('./models/State');
var reserveRequestHandler = require('./modules/reserveRequestHandler');
var recordImportantTimeHandler = require('./modules/recordImportantTimeHandler');
var askEventRequestHandler = require('./modules/askEventRequestHandler');
var Common = new Common_();
var HandlersMap = {};
var State = new State_();
class Dispatcher {
  constructor(bot) {
    this.bot = bot;
    HandlersMap[State.STATE_RESERVE_REMINDER] = reserveRequestHandler;
    HandlersMap[State.STATE_RECORD_IMPORTANT_TIME] = recordImportantTimeHandler;
    HandlersMap[State.STATE_ASK_EVENT] = askEventRequestHandler;
    HandlersMap[State.STATE_RECALL_EVENT], (a, b)=>{this.bot.makeTextcard('呵呵');};
    HandlersMap[State.STATE_RECORD_EVENT] = (a, b)=>{console.log("event created");};
  }

  //中控函数，负责解析意图, 并派发给对应的Handler
  parseIntent(input) {
    var state = this.bot.getSessionAttribute('state', -1);
    //初始状态
    if (state == -1) {
      //疑问句
      if (Common.isQuestion(input)) {
        if (Common.isRecent(input)) {
          HandlersMap.get(State.STATE_ASK_EVENT)(this.bot, input); //handle intent
        }else {
          HandlersMap.get(State.STATE_RECALL_EVENT)(this.bot, input); //handle intent
        }
      //陈述句
      }else {
        //记录重要事件
        if(Common.isRecording(input)) {
         var fun =  HandlersMap[State.STATE_RECORD_EVENT];
         console.log(typeof(fun));
         fun(this.bot, input);
        }else if(Common.isReserving(input)) {
          HandlersMap.get[State.STATE_RESERVE_REMINDER](this.bot, input);
        }else {
          HandlersMap.get(State.STATE_RECORD_EVENT)(this.bot, input);
        }//else {
          //TODO delegate to DuerOS
        //}
      }

    //已经开始了对话，继续之前的对话
    } else {
      //获得意图开始 数字位
       var intentId = this.bot.getSessionAttribute('state');
       HandlersMap.get(intentId)(this.bot, input);
    }

    //调用map中的handler 函数
  }

 //注册Intent Handler
  registerIntent(intentId, intentHandler) {
     HandlersMap[intentId] =  intentHandler;
  }

}

module.exports = Dispatcher;
