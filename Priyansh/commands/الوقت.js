module.exports.config = {
    name: "اسم_التغيير",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "إشعار بتغيير اسم المستخدم أو اسم صديق",
    commandCategory: "إشعارات",
    usages: "اسم_التغيير",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const { threadID, senderID, logMessageType, logMessageData } = event;

    // تحقق من نوع الرسالة (تغيير الاسم)
    if (logMessageType === "log:thread-member-nickname") {
        const { participantFbId, nickname } = logMessageData;

        // إذا كان هناك تغيير في الاسم
        if (participantFbId && nickname) {
            const message = `💬 تم تغيير اسم المستخدم إلى: ${nickname} من قبل العضو: ${senderID}`;
            return api.sendMessage(message, threadID);
        }
    }
};
