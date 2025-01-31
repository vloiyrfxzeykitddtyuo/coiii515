const moment = require("moment-timezone");

module.exports.config = {
  name: "nicklogger",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by: ǺᎩᎧᏬᏰ",
  description: "تسجيل تغييرات الكنية في المجموعة",
  commandCategory: "المجموعة",
  usages: "",
  cooldowns: 2,
};

module.exports.run = async ({ api, event }) => {
  // This part is empty because this is an event listener, not a command
};

module.exports.handleEvent = async ({ api, event }) => {
  if (event.type !== "change_thread_nickname") return;
  
  const { threadID, author, participantIDs, logMessageData } = event;
  
  try {
    // الحصول على معلومات المستخدم الذي قام بالتغيير
    const authorInfo = await api.getUserInfo(author);
    const authorName = authorInfo[author]?.name || "مستخدم غير معروف";
    
    // الحصول على معلومات المستخدم الذي تم تغيير كنيته
    const changedForUserID = logMessageData.participant_id;
    const changedForInfo = await api.getUserInfo(changedForUserID);
    const changedForName = changedForInfo[changedForUserID]?.name || "مستخدم غير معروف";
    
    // التاريخ والوقت
    const timeNow = moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    
    let message = "⚡ تنبيه تغيير الكنية ⚡\n\n";
    message += `👤 قام: ${authorName}\n`;
    message += `📝 بتغيير كنية: ${changedForName}\n`;
    message += `🔄 من: ${logMessageData.old_nickname || "لا توجد كنية"}\n`;
    message += `✨ إلى: ${logMessageData.new_nickname || "لا توجد كنية"}\n`;
    message += `\n⏰ ${timeNow}`;

    // إرسال الإشعار إلى المجموعة
    api.sendMessage(
      {
        body: message,
      },
      threadID
    );
  } catch (error) {
    console.error("خطأ في تسجيل تغيير الكنية:", error);
  }
};
