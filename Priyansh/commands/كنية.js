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
  // تجاهل أي أحداث غير تغيير الكنية
  if (event.type !== "change_thread_nickname") return;
  
  const { threadID, author, logMessageData } = event;
  
  try {
    const changedForUserID = logMessageData.participant_id;
    
    // الحصول على معلومات الشخص الذي قام بالتغيير
    const authorInfo = await api.getUserInfo(author);
    const authorName = authorInfo[author]?.name || "مستخدم غير معروف";
    
    // الحصول على معلومات الشخص الذي تم تغيير كنيته
    const changedForInfo = await api.getUserInfo(changedForUserID);
    const changedForName = changedForInfo[changedForUserID]?.name || "مستخدم غير معروف";
    
    // التاريخ والوقت
    const timeNow = moment().tz("Asia/Riyadh").format("YYYY-MM-DD HH:mm:ss");
    
    let message = "⚡ تنبيه تغيير الكنية ⚡\n\n";
    
    if (author === changedForUserID) {
      // إذا غير الشخص كنية نفسه
      message += `👤 قام ${authorName} بتغيير كنيته\n`;
    } else {
      // إذا قام شخص بتغيير كنية شخص آخر
      message += `👤 قام ${authorName} بتغيير كنية ${changedForName}\n`;
    }
    
    message += `🔄 الكنية القديمة: ${logMessageData.old_nickname || "لا توجد كنية"}\n`;
    message += `✨ الكنية الجديدة: ${logMessageData.new_nickname || "لا توجد كنية"}\n`;
    message += `\n⏰ التاريخ والوقت: ${timeNow}`;

    // إرسال الإشعار إلى المجموعة
    api.sendMessage(
      {
        body: message,
      },
      threadID
    );
  } catch (error) {
    console.error("خطأ في تسجيل تغيير الكنية:", error);
    
    // إرسال رسالة خطأ للمجموعة
    api.sendMessage(
      "⚠️ حدث خطأ أثناء محاولة تسجيل تغيير الكنية",
      threadID
    );
  }
};
