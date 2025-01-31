
module.exports.config = {
  name: "تغيير الكنية",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by: ǺᎩᎧᏬᏰ",
  description: "إشعار عند تغيير الكنية في المجموعة",
  commandCategory: "📣 الإشعارات 📣",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const { threadID, senderID, message } = event;

  // التأكد من وجود تغيير في الكنية
  if (event.logMessageType === "change_thread_nickname") {
    const oldNickname = event.logMessageData.oldNickname || "غير معروف";
    const newNickname = event.logMessageData.newNickname || "غير معروف";
    const timestamp = new Date(event.timestamp).toLocaleString("ar-EG", {
      timeZone: "Asia/Baghdad",
    });

    const notificationMessage = `
📝 **تغيير كنية**
👤 العضو: ${senderID}
🔄 الكنية القديمة: ${oldNickname}
🔄 الكنية الجديدة: ${newNickname}
📅 التاريخ والوقت: ${timestamp}
`;

    // إرسال الإشعار إلى المجموعة
    api.sendMessage(notificationMessage, threadID);
  }
};
