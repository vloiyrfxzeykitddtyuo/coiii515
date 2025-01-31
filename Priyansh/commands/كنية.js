module.exports.config = {
    name: "nickname_monitor",
    eventType: ["log:user-nickname"],
    version: "1.0.0",
    credits: "ǺᎩᎧᏬᏰ",
    description: "مراقبة تغييرات الكنية في المجموعة",
    hasPermssion: 0,
};

module.exports.run = async function({ api, event, Users }) {
    const { logMessageType, logMessageData, timestamp } = event;
    
    // تحويل الطابع الزمني إلى تاريخ ووقت مقروء
    const date = new Date(timestamp);
    const dateFormat = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const timeFormat = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    // الحصول على معلومات المستخدمين
    const participant = await Users.getNameUser(logMessageData.participant_id);
    const target = await Users.getNameUser(logMessageData.target_id);
    
    let msg = "";

    // إذا كان الشخص غير كنيته الخاصة
    if (logMessageData.participant_id === logMessageData.target_id) {
        msg = `👤 ${participant} قام بتغيير كنيته\n`
            + `📝 الكنية الجديدة: ${logMessageData.nickname || "إزالة الكنية"}\n`
            + `📜 الكنية القديمة: ${logMessageData.previous_nickname || "لم تكن هناك كنية"}\n`
            + `📅 التاريخ: ${dateFormat}\n`
            + `⏰ الوقت: ${timeFormat}`;
    }
    // إذا قام شخص بتغيير كنية شخص آخر
    else {
        msg = `👤 ${participant} قام بتغيير كنية ${target}\n`
            + `📝 الكنية الجديدة: ${logMessageData.nickname || "إزالة الكنية"}\n`
            + `📜 الكنية القديمة: ${logMessageData.previous_nickname || "لم تكن هناك كنية"}\n`
            + `📅 التاريخ: ${dateFormat}\n`
            + `⏰ الوقت: ${timeFormat}`;
    }

    // إرسال الإشعار في نفس المجموعة
    api.sendMessage(msg, event.threadID);
};
