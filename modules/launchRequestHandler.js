

function handleLaunchRequest () {
    console.log('LaunchRequest');

    let card = new global.Bot.Card.ImageCard();
    card.addItem('https://upload.wikimedia.org/wikipedia/commons/3/33/-LOVE-love-36983825-1680-1050.jpg');
    global.app.setSessionAttribute('s1', 0);
    global.app.waitAnswer();
    return {
        card: card,
        outputSpeech: '欢迎使用有爱'
    };
    
}

module.exports = handleLaunchRequest;