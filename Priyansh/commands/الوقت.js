module.exports.config = {
    name: "الوقت",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "عرض التاريخ والوقت",
    commandCategory: "معلومات",
    usages: "تاريخ_البوت",
    cooldowns: 5,
    dependencies: {
        "moment-hijri": "",
        "moment-timezone": ""
    }
};

module.exports.run = async({ api, event }) => {
    const moment = require('moment-timezone');
    const momentHijri = require('moment-hijri');
    
    // Set timezone to Iraq
    moment.tz.setDefault("Asia/Baghdad");
    
    // Get current time in Iraq
    const currentTime = moment().format('HH:mm:ss');
    
    // Get Hijri date
    const hijriDate = momentHijri().format('iYYYY/iM/iD');
    
    // Get Gregorian date
    const gregorianDate = moment().format('YYYY/MM/DD');
    
    // Get day of week in Arabic
    const weekDays = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayOfWeek = weekDays[moment().day()];
    
    // Construct the message
    const message = `🕒 الوقت الحالي: ${currentTime}\n` +
                   `📅 التاريخ الهجري: ${hijriDate}\n` +
                   `📆 التاريخ الميلادي: ${gregorianDate}\n` +
                   `📌 اليوم: ${dayOfWeek}`;
    
    return api.sendMessage(message, event.threadID, event.messageID);
};
