module.exports.config = {
    name: "ابتايم",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عباس البغدادي",
    description: "عرض معلومات وقت تشغيل البوت",
    commandCategory: "نظام",
    usages: "ابتايم",
    cooldowns: 5,
    dependencies: {
        "os": "",
        "moment-timezone": ""
    }
};

module.exports.run = async({ api, event }) => {
    const os = global.nodemodule["os"];
    const moment = global.nodemodule["moment-timezone"];
    
    // حساب وقت التشغيل
    const uptime = process.uptime();
    const seconds = Math.floor(uptime % 60);
    const minutes = Math.floor((uptime / 60) % 60);
    const hours = Math.floor((uptime / (60 * 60)) % 24);
    const days = Math.floor(uptime / (60 * 60 * 24));
    
    // إنشاء نص وقت التشغيل
    let uptimeString = "";
    if (days > 0) uptimeString += `${days} يوم `;
    if (hours > 0) uptimeString += `${hours} ساعة `;
    if (minutes > 0) uptimeString += `${minutes} دقيقة `;
    uptimeString += `${seconds} ثانية`;
    
    // إنشاء الرسالة
    const message = `⚙️ معلومات وقت تشغيل البوت ⚙️\n\n` +
                    `⏱️ وقت التشغيل: ${uptimeString}\n\n` +
                    `👨‍💻 المطور: عباس البغدادي\n\n` +
                    `🔰 البوت مخصص لفريق SCP تحت إشراف:\n` +
                    `『SUP0340001』يوجين〖 قائد الفريق〗\n` +
                    `علي 〖 نائب الفريق〗『 SUP0340002 』`;
    
    return api.sendMessage(message, event.threadID, event.messageID);
};
