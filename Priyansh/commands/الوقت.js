module.exports.config = {
    name: "اسم_التغيير",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "إشعار بتغيير اسم المستخدم",
    commandCategory: "إشعارات",
    usages: "اسم_التغيير",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const { threadID, senderID } = event;

    // الحصول على معلومات المستخدم
    const userInfo = await api.getUserInfo(senderID);
    const newName = userInfo[senderID].name;

    // بناء الرسالة
    const message = `💬 تم تغيير اسم المستخدم إلى: ${newName} من قبل العضو: ${senderID}`;

    // إرسال الرسالة إلى المجموعة
    return api.sendMessage(message, threadID);
};
