module.exports.config = {
    name: "الوقت",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "عرض التاريخ والوقت",
    commandCategory: "معلومات",
    usages: "تاريخ_البوت",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    // دالة لتحويل التاريخ الميلادي إلى هجري
    function gregorianToHijri(date) {
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // معامل التحويل التقريبي
        const hijriYear = Math.floor((year - 622) * (33/32));
        const hijriMonth = month;
        const hijriDay = day;

        return `${hijriDay}/${hijriMonth}/${hijriYear}`;
    }

    // الحصول على الوقت الحالي بتوقيت العراق
    const iraqTimeZone = 'Asia/Baghdad';
    const now = new Date().toLocaleString('ar-IQ', { timeZone: iraqTimeZone });
    
    // الحصول على اليوم
    const daysInArabic = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
    const dayOfWeek = daysInArabic[new Date().getDay()];
    
    // الحصول على التاريخ الهجري
    const hijriDate = gregorianToHijri(new Date());
    
    // تنسيق الرسالة
    const message = `🕒 الوقت الحالي (بتوقيت العراق): ${now}\n` +
                   `📅 اليوم: ${dayOfWeek}\n` +
                   `🌙 التاريخ الهجري: ${hijriDate}\n` +
                   `📆 السنة الميلادية: ${new Date().getFullYear()}`;

    // إرسال الرسالة
    return api.sendMessage(message, event.threadID, event.messageID);
};
