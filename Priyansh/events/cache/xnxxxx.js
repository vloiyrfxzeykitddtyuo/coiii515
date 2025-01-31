module.exports.config = {
  name: "nicknameLogger",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Created by Claude",
  description: "مراقبة تغييرات الكنية في المجموعة",
  commandCategory: "النظام",
  usages: "",
  cooldowns: 0,
};

module.exports.run = async function({ api, event }) {
  // This run function can be empty as this is an event listener
};

module.exports.handleEvent = async function({ api, event }) {
  // التحقق من نوع الحدث وأنه في المجموعة المستهدفة
  if (event.type !== "change_thread_nickname" || event.threadID !== "8913373918700484") return;

  const timestamp = new Date();
  const timeStr = timestamp.toLocaleString('ar-SA', { 
    timeZone: 'Asia/Riyadh',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });

  try {
    // جلب معلومات المستخدم الذي قام بالتغيير
    const userInfo = await api.getUserInfo(event.author);
    const authorName = userInfo[event.author].name;

    // جلب معلومات المستخدم الذي تم تغيير كنيته
    const participantInfo = await api.getUserInfo(event.participant);
    const participantName = participantInfo[event.participant].name;

    let message = `🔔 تنبيه تغيير الكنية:\n\n`;
    message += `👤 قام: ${authorName}\n`;
    message += `👥 بتغيير كنية: ${participantName}\n`;
    message += `📝 الكنية القديمة: ${event.oldNickname || "لا توجد كنية"}\n`;
    message += `📝 الكنية الجديدة: ${event.newNickname || "تم إزالة الكنية"}\n`;
    message += `⏰ التاريخ والوقت: ${timeStr}`;

    // إرسال رسالة في نفس المجموعة
    await api.sendMessage(message, event.threadID);

  } catch (error) {
    console.error(`خطأ في مراقب الكنية: ${error.message}`);
  }
};

