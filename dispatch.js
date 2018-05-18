// 负责主函数与各个子技能之间的分发

var handlers = new Map();

let launch = require('./modules/launchRequestHandler')
handlers.set('LaunchRequest', launch);


module.exports.handlers = handlers;