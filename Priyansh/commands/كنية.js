module.exports.config = {
    name: "لوكس",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ǺᎩᎧᏬᏰ",
    description: "عرض معرف المجموعة الحالية",
    commandCategory: "💎 المعلومات 💎",
    usages: "ايدي",
    cooldowns: 5,
    aliases: ["ايدي المجموعة", "معرف المجموعة", "ايدي_مجموعة"]
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID } = event;
    
    try {
        // جلب معلومات المجموعة
        const threadInfo = await api.getThreadInfo(threadID);
        const threadName = threadInfo.threadName || "مجموعة بدون اسم";
        const memberCount = threadInfo.participantIDs.length;

        // تنسيق الرسالة
        let msg = "━━━━━━━━━━━━━\n";
        msg += "🌟 معلومات المجموعة 🌟\n\n";
        msg += `👥 اسم المجموعة: ${threadName}\n`;
        msg += `📑 معرف المجموعة: ${threadID}\n`;
        msg += `👤 عدد الأعضاء: ${memberCount}\n`;
        msg += "━━━━━━━━━━━━━";

        // إرسال المعلومات
        return api.sendMessage(msg, threadID, messageID);
    } catch (error) {
        return api.sendMessage("❌ حدث خطأ أثناء جلب معلومات المجموعة.", threadID, messageID);
    }
};

module.exports.handleEvent = async function({ api, event }) {
    const { body, threadID, messageID } = event;
    
    // التحقق من أن الرسالة هي "ايدي" فقط
    if (body && body.toLowerCase() === "ايدي") {
        try {
            const threadInfo = await api.getThreadInfo(threadID);
            const threadName = threadInfo.threadName || "مجموعة بدون اسم";
            const memberCount = threadInfo.participantIDs.length;

            let msg = "━━━━━━━━━━━━━\n";
            msg += "🌟 معلومات المجموعة 🌟\n\n";
            msg += `👥 اسم المجموعة: ${threadName}\n`;
            msg += `📑 معرف المجموعة: ${threadID}\n`;
            msg += `👤 عدد الأعضاء: ${memberCount}\n`;
            msg += "━━━━━━━━━━━━━";

            return api.sendMessage(msg, threadID, messageID);
        } catch (error) {
            return api.sendMessage("❌ حدث خطأ أثناء جلب معلومات المجموعة.", threadID, messageID);
        }
    }
};
