module.exports.config = {
    name: "autoJoan",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد على كلمة جوان",
    commandCategory: "تلقائي",
    usages: "",
    cooldowns: 0
};

module.exports.handleEvent = function ({ api, event }) {
    if (event.body == "جوان" || event.body == "ءجوان") {
        return api.sendMessage({
            body: "شنو تريد منها 👈🏻👉🏻🔪",
            attachment: "https://up6.cc/2025/01/173807054441831.jpg"
        }, event.threadID);
    }
}

module.exports.run = function({ api, event }) {
    api.sendMessage("✅ تم تفعيل الرد التلقائي", event.threadID);
}
