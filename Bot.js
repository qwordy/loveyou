var BaseBot = require('bot-sdk');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);

        this.addIntentHandler('LaunchRequest', ()=>{
            return {
                outputSpeech: '欢迎使用有爱'
            };
        });

        this.addIntentHandler('ai.dueros.common.default_intent', ()=>{
            //console.log(postData);
            let text = postData['request']['query']['original']
            let card = new Bot.Card.TextCard(text);
            var pos;
            if (this.matchRecord(text)) {
                console.log('matchRecord');
            } else if ((pos = this.matchReserve(text)) >= 0) {
                console.log("matchReserve@"+pos);
                var pos2 = text.indexOf('去');
                if (pos2 > 0) {
                    console.log('时间：'+text.substring(pos+2, pos2));
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

    matchRecord(text) {
        let dict = ['帮我记下', '记一下', '记得', '要提醒我', '记下', '添加提醒', '帮我记录', '记住', '记录'];
        for (var i = 0; i < dict.length; ++i) {
            if (text.indexOf(dict[i]) > -1) {
                return true;
            }
        }
        return false;
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
}

module.exports = Bot;
