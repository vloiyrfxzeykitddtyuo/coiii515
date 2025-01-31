module.exports.config = {
    name: "nickname_monitor",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ǺᎩᎧᏬᏰ",
    description: "مراقبة تغييرات الكنية في المجموعة",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 0
};

module.exports.run = async({ event, api }) => {
    // This run function can be empty as this is an event listener
};

module.exports.handleEvent = async({ event, api }) => {
    const { logMessageType, logMessageData, timestamp, threadID } = event;

    // التحقق من أن الحدث هو تغيير كنية
    if (logMessageType === "log:nickname") {
        const date = new Date(timestamp * 1000);
        const formatter = new Intl.DateTimeFormat('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });

        const formattedDate = formatter.format(date);
        
        // جلب معلومات المستخدم الذي قام بالتغيير
        const changerInfo = await api.getUserInfo(logMessageData.author);
        const changerName = changerInfo[logMessageData.author].name;

        // جلب معلومات المستخدم الذي تم تغيير كنيته
        const targetInfo = await api.getUserInfo(logMessageData.participant);
        const targetName = targetInfo[logMessageData.participant].name;

        let msg = "⚠️ تنبيه تغيير الكنية ⚠️\n\n";
        msg += `👤 قام: ${changerName}\n`;
        msg += `📝 بتغيير كنية: ${targetName}\n`;
        msg += `📌 الكنية الجديدة: ${logMessageData.nickname || "إزالة الكنية"}\n`;
        msg += `🕐 التاريخ والوقت: ${formattedDate}`;

        // إرسال رسالة الإشعار
        api.sendMessage(msg, threadID);
    }
};

module.exports.handleReply = async({ api, event, handleReply }) => {
    // This handleReply function can be empty as we're not handling replies
};

module.exports.handleReaction = async({ api, event, handleReaction }) => {
    // This handleReaction function can be empty as we're not handling reactions
};
