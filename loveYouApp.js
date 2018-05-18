var BaseBot = require('bot-sdk');
let handlers = require('./dispatch').handlers


class LoveYouApp extends BaseBot{

    /**
     * @param {*} handlers : Map(handler name, handler function object)
     */
    constructor (postData, handlers) {
        super(postData);
        this.addIntentHandlers(handlers);
    }

    addIntentHandlers(handlers) {
        for (let handler of handlers.entries()) {
            this.addIntentHandler(handler[0], handler[1]);
        }
    }

} // LoveYouApp

//let postData = 0;
//let app = new LoveYouApp(postData, handlers);


module.exports = LoveYouApp;