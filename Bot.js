var BaseBot = require('bot-sdk');

class Bot extends BaseBot{
    constructor (postData) {
        super(postData);
        
        this.addIntentHandler('LaunchRequest', ()=>{
            return {
                "outputSpeech" : "欢迎使用有爱"
            };
        });

        this.addIntentHandler('record', ()=>{
            date = this.getSlot('sys.date');
        
            if (!action) {
                card = new Bot.Card.TextCard('你要做什么');
                return {
                    card: card,
                    outputSpeech: '你要做什么'
                };
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

