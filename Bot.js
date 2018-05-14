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
            console.log(postData);
            //return {
              //  outputSpeech: '缺省意图'
            //}
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
            let card = new Bot.Card.TextCard('好的记下了呢');
            return {
                card: card,
                outputSpeech: '好的'
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
}

module.exports = Bot;

