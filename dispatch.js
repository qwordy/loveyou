// 负责主函数与各个子技能之间的分发

// 加载所有的意图处理模块
var handlers = new Map();
//handlers.set('LaunchRequest', require('./modules/launchRequestHandler'));
handlers.set('DefaultRequest', require('./modules/defaultRequestHandler'));
// ... add handlers
var handlersProxy = new Proxy(handlers, {
    get: function(target, key) {
        return target.has(key) ? target.get(key) : target.get('DefaultRequest');
    },
});


// 意图处理分发函数
function dispatcher(input) {
    let intentName = parseIntent(input);

    let handler = handlersProxy[intentName];
    handler();
}


// 分析意图，返回
function parseIntent(input) {
    // TODO
    return intentName;
}
///---------------------------
///---------------------------


module.exports.dispatcher = dispatcher;