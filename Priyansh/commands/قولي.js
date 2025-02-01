module.exports.config = {
    name: "قولي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "تكرار الكلام مع إيموجي",
    commandCategory: "ترفية",
    usages: "قولي [الكلام]",
    cooldowns: 10,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args }) => {
    const emojis = [
        "😊", "😂", "🥰", "😍", "😎", "🤩", "😇", "😌", "😋", "🤪",
        "💫", "⭐️", "🌟", "✨", "💥", "💫", "🌙", "☀️", "⚡️", "🌈",
        "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💕",
        "🎯", "🎮", "🎲", "🎭", "🎨", "🎰", "🚀", "✈️", "🌍", "🌺",
        "🌸", "🌼", "🌹", "🌷", "🍀", "🌴", "🌳", "🌲", "🎋", "🍃",
        "🦋", "🐝", "🐞", "🐠", "🦄", "🦁", "🐯", "🐶", "🐱", "🐼",
        "🎵", "🎶", "🎸", "🎹", "🎧", "🎤", "🎪", "🎯", "🎳", "🎮",
        "👑", "💎", "💍", "⚜️", "🔮", "🎭", "🎪", "🎨", "🎰", "🚀",
        "🌙", "⭐️", "☀️", "🌈", "☁️", "⛅️", "🌤", "⛈", "🌪", "🌍",
        "🍦", "🍰", "🧁", "🍪", "🍫", "🍭", "🍡", "🍩", "🍹", "🧃"
    ];

    if (args.length === 0) {
        return api.sendMessage("الرجاء كتابة شيء بعد كلمة 'قولي'", event.threadID, event.messageID);
    }

    const userMessage = args.join(" ");
    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    const response = `${userMessage} ${randomEmoji}`;

    return api.sendMessage(response, event.threadID, event.messageID);
};

