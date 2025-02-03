module.exports.config = {
    name: "اشعار",
    version: "1.0.0",
    hasPermssion: 2, // تأكد من أن لديك التصريح المناسب لإرسال الرسائل
    credits: "احمد عجينة",
    description: "إرسال إشعار إلى جميع المجموعات",
    commandCategory: "إدارة",
    usages: "اشعار [رسالتك]",
    cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
    const message = args.join(" ");
    const senderId = "100015903097543"; // رقم حسابك
    const developerName = "اسم حسابك"; // استبدل بـ اسمك

    if (!message) {
        return api.sendMessage("الرجاء إدخال رسالة للإرسال.", event.threadID, event.messageID);
    }

    // إرسال الرسالة إلى جميع المجموعات التي ينتمي إليها البوت
    api.getThreadList(100, null, ["INBOX"], (err, groups) => {
        if (err) return console.error(err);
        
        groups.forEach(group => {
            const threadID = group.threadID;
            const notificationMessage = `رسالة من المطور: ${developerName}\n\n${message}`;
            api.sendMessage(notificationMessage, threadID);
        });

        return api.sendMessage("تم إرسال الإشعار إلى جميع المجموعات.", event.threadID, event.messageID);
    });
};
