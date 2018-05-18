/**
唯一标识意图
1xx 录入重要时间     e.g.记住520是我们在一起的日子
2xx 预约提醒        e.g. 预约明天买花
3xx 记录事件        e.g. 告诉今天去了泰山，感觉很好玩
4xx 询问重要事件    e.g. 最近有什么重要日子？
5xx 询问去年今天    e.g. 去年我们做了什么？

session['state'] = [0, 5]
session[0] = State.S1_INIT

**/
require('hashmap');
class State {
  this.STATE_INIT = 0;
  this.STATE_RECORD_IMPORTANT_TIME = 1;
  this.STATE_RESERVE_REMINDER = 2;
  this.STATE_RECORD_EVENT = 3;
  this.STATE_ASK_EVENT = 4;
  this.STATE_RECALL_EVENT = 5;
  //意图1
  this.S1_INIT = 101;
  this.S1_GET_TIME_OR_EVENT = 102;
  this.S1_ASK_TIME = 123;
  this.S1_ASK_CONFIRM = 110;
  this.S1_ASK_RECONFIRM = 111;

  //意图2
  this.S2_INIT = 201;

}
module.exports = State;
