module.exports.config = {
    name: "حماية",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "مراقبة تغيير الأسماء والكلمات السيئة",
    commandCategory: "معلومات",
    usages: "حماية",
    cooldowns: 5
};

const badWords = ["كلمة1", "كلمة2", "كلمة3"]; // أضف الكلمات السيئة هنا

module.exports.run = async ({ api, event }) => {
    // دالة للتحقق من الكلمات السيئة
    function containsBadWords(message) {
        return badWords.some(word => message.includes(word));
    }

    // مراقبة تغيير الاسم
    api.getThreadInfo(event.threadID, (err, threadInfo) => {
        if (err) return console.error(err);

        const members = threadInfo.participantIDs;

        // تحقق من الأعضاء في المجموعة
        members.forEach(memberID => {
            api.getUserInfo(memberID, (err, userInfo) => {
                if (err) return console.error(err);

                const userName = userInfo[memberID].name;

                // تحقق من تغيير الاسم
                if (event.logMessageType === "log:subscribe" && event.logMessageData && event.logMessageData["name"] !== userName) {
                    const message = `⚠️ تم تغيير اسم أحد الأعضاء: ${userName} إلى ${event.logMessageData.name}`;
                    return api.sendMessage(message, event.threadID);
                }
            });
        });
    });

    // تحقق من وجود كلمات سيئة في الرسالة
    if (containsBadWords(event.body)) {
        return api.sendMessage("🚫 تحتوي رسالتك على كلمات غير لائقة.", event.threadID);
    }
};
