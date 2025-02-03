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

const developerId = "100015903097543"; // رقم حسابك
const developerName = "ﺳﹷﹻواٰﭑد ﹷﹻ"; // اسم المطور

module.exports.run = async ({ api, event, args }) => {
    const message = args.join(" ");

    if (!message) {
        return api.sendMessage("الرجاء إدخال رسالة للإرسال.", event.threadID, event.messageID);
    }

    // إرسال الرسالة إلى جميع المجموعات التي ينتمي إليها البوت
    api.getThreadList(100, null, ["INBOX"], (err, groups) => {
        if (err) return console.error(err);
        
        groups.forEach(group => {
            const threadID = group.threadID;
            const notificationMessage = `رسالة من المطور: ${developerName}\n\n${message}\n\nيمكنك الرد على المطور.`; 
            api.sendMessage(notificationMessage, threadID, (err, info) => {
                if (err) return console.error(err);
                // حفظ معرف الرسالة لإعادة توجيه الردود
                const messageID = info.messageID;
                api.listen((event) => {
                    if (event.type === 'message_reply' && event.messageReply.senderID !== developerId) {
                        const replyMessage = `رد من ${event.senderID}: ${event.body}`;
                        api.sendMessage(replyMessage, developerId);
                    }
                });
            });
        });

        return api.sendMessage("تم إرسال الإشعار إلى جميع المجموعات.", event.threadID, event.messageID);
    });
};
