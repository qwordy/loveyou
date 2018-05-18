var BaseBot = require('bot-sdk');
let handlers = require('./dispatch').dispatcher


class LoveYouApp extends BaseBot{

    /**
     * @param {*} handlers : Map(handler name, handler function object)
     */
    constructor (postData, handlers) {
        super(postData);
        this.addIntentHandler('ai.dueros.common.default_intent', dispatcher);
    }


} // LoveYouApp

//let postData = 0;
//let app = new LoveYouApp(postData, handlers);


module.exports = LoveYouApp;