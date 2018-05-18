var BaseBot = require('bot-sdk');
let handlers = require('./dispatch').dispatcher
var curSession = require('./models/SessionShared').curSession


class LoveYouApp extends BaseBot{

    constructor (postData) {
        super(postData);
        this.addIntentHandler('ai.dueros.common.default_intent', dispatcher);
    }


} // LoveYouApp

module.exports = LoveYouApp;