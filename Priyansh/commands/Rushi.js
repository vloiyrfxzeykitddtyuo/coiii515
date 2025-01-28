module.exports.config = {
    name: "jwan",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد التلقائي على ذكر اسم جوان",
    commandCategory: "الردود التلقائية",
    usages: "",
    cooldowns: 0,
    dependencies: ""
};

module.exports.handleEvent = async function({ api, event }) {
    // تجاهل رسائل البوت نفسه
    if (event.senderID === api.getCurrentUserID()) return;
    
    // الكلمات التي سيتم الرد عليها
    const triggers = ["جوان", "ءجوان"];
    
    // تحويل الرسالة إلى نص صغير للمقارنة
    const message = event.body.toLowerCase();
    
    // التحقق من وجود الكلمات في الرسالة
    if (triggers.some(trigger => message.includes(trigger))) {
        // الرد مع الصورة
        api.sendMessage({
            body: "شنو تريد منها 👈🏻👉🏻🔪",
            attachment: await global.utils.getStreamFromURL("https://up6.cc/2025/01/173807054441831.jpg")
        }, event.threadID, event.messageID);
    }
};

module.exports.run = async function({ api, event }) {
    // يمكنك إضافة رسالة تأكيد عند تفعيل الميزة
    api.sendMessage("✅ تم تفعيل الرد التلقائي على ذكر اسم جوان", event.threadID);
};
