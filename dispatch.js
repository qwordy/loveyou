// 负责主函数与各个子技能之间的分发

// 加载所有的意图处理模块
var handlers = new Map();
handlers.set('LaunchRequest', require('./modules/launchRequestHandler'));
// ... add handlers

// 意图处理分发函数
function dispatcher(input) {
    
}

// 分析意图，返回
function parseIntent() {
    // TODO
    return intentName;
}


module.exports.dispatcher = dispatcher;