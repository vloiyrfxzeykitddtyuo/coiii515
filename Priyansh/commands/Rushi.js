module.exports.config = {
    name: "autoJoan",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد على كلمة جوان",
    commandCategory: "تلقائي",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = function ({ api, event }) {
    const { body, threadID } = event;
    if (body && (body.toLowerCase() === "جوان" || body.toLowerCase() === "ءجوان")) {
        api.sendMessage({
            body: "شنو تريد منها 👈🏻👉🏻🔪",
            attachment: "https://up6.cc/2025/01/173807054441831.jpg"
        }, threadID);
    }
};

module.exports.run = function({ api, event }) {
    api.sendMessage("✅ تم تفعيل الرد التلقائي", event.threadID);
};
