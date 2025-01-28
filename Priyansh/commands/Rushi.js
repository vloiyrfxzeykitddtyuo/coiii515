module.exports.config = {
    name: "auto_joan",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد التلقائي على كلمة جوان",
    commandCategory: "التلقائي",
    usages: "",
    cooldowns: 0,
    dependencies: {}
};

module.exports.handleEvent = async function({ api, event }) {
    const message = event.body;
    if (!message) return;

    // التحقق من أن الرسالة تحتوي فقط على "جوان" أو "ءجوان"
    if (message === "جوان" || message === "ءجوان") {
        const response = {
            body: "شنو تريد منها 👈🏻👉🏻🔪",
            attachment: await global.utils.getStreamFromURL("https://up6.cc/2025/01/173807054441831.jpg")
        };

        api.sendMessage(response, event.threadID, event.messageID);
    }
};

module.exports.run = async function({ api, event }) {
    api.sendMessage("✅ تم تفعيل الرد التلقائي على كلمة جوان", event.threadID);
};
