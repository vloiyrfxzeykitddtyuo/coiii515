module.exports.config = {
    name: "autoReact",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "التفاعل التلقائي باضحكني على الرسائل",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 0,
    dependencies: ""
};

module.exports.handleEvent = async function({ api, event }) {
    // تجاهل رسائل البوت نفسه
    if (event.senderID === api.getCurrentUserID()) return;
    
    // تجاهل الرسائل من المجموعات غير المرغوب فيها (اختياري)
    // const allowedThreads = ["threadID1", "threadID2"];
    // if (!allowedThreads.includes(event.threadID)) return;

    try {
        // إضافة التفاعل على كل رسالة
        api.setMessageReaction("😹", event.messageID, (err) => {
            if (err) {
                console.error("خطأ في إضافة التفاعل:", err);
            }
        }, true);
    } catch (error) {
        console.error("خطأ غير متوقع:", error);
    }
};

module.exports.run = async function({ api, event }) {
    // يمكنك إضافة رسالة تأكيد عند تفعيل الميزة
    api.sendMessage("✅ تم تفعيل التفاعل التلقائي", event.threadID);
};
