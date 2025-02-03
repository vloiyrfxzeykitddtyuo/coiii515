const { DateTime } = require('luxon');

module.exports.config = {
    name: "تاريخ",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "يعرض التاريخ والوقت الحالي بتوقيت العراق",
    commandCategory: "ترفية",
    usages: "تاريخ",
    cooldowns: 5,
    dependencies: {
        "luxon": ""
    }
};

module.exports.run = async({ api, event }) => {
    const iraqTime = DateTime.now().setZone('Asia/Baghdad');
    const gregorianDate = iraqTime.toFormat('yyyy-MM-dd HH:mm:ss'); // التاريخ الميلادي
    const hijriDate = iraqTime.toFormat('HH:mm:ss dd/MM/yyyy'); // التاريخ الهجري (سوف تحتاج إلى مكتبة إضافية لتحويله بدقة)
    const weekDay = iraqTime.weekdayLong; // يوم الأسبوع

    const responseMessage = `
    الوقت الحالي في العراق:
    - التاريخ الميلادي: ${gregorianDate}
    - التاريخ الهجري: ${hijriDate}
    - يوم الأسبوع: ${weekDay}
    `;

    return api.sendMessage(responseMessage, event.threadID, event.messageID);
};
