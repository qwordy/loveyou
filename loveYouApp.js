let BaseBot = require('bot-sdk');
let dispatcher = require('./dispatch').dispatcher
let launcher = require('./modules/launchRequestHandler')

class LoveYouApp extends BaseBot{

    constructor (postData) {
        super(postData);
        this.addLaunchHandler(launcher);
        this.addIntentHandler('ai.dueros.common.default_intent', dispatcher);
    }

} // LoveYouApp

module.exports = LoveYouApp;