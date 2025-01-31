module.exports.config = {
  name: "antiUnsend",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Created by Claude",
  description: "مراقبة الرسائل المحذوفة",
  commandCategory: "النظام",
  usages: "",
  cooldowns: 0
};

// تخزين الرسائل مؤقتاً
const messageStorage = new Map();

module.exports.handleEvent = async function({ api, event }) {
  const { senderID, messageID, body, threadID } = event;
  
  // تخزين الرسالة عند إرسالها
  if (event.type === "message" || event.type === "message_reply") {
    const messageData = {
      body: body,
      senderID: senderID,
      time: new Date().toLocaleString('ar-SA', {
        timeZone: 'Asia/Riyadh',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })
    };

    // تخزين المرفقات إذا وجدت
    if (event.attachments && event.attachments.length > 0) {
      messageData.attachments = event.attachments;
    }

    messageStorage.set(messageID, messageData);

    // حذف الرسائل القديمة بعد ساعة للحفاظ على الذاكرة
    setTimeout(() => {
      messageStorage.delete(messageID);
    }, 3600000); // ساعة واحدة
  }

  // التعامل مع حذف الرسالة
  if (event.type === "message_unsend") {
    const unsendMessage = messageStorage.get(messageID);
    if (!unsendMessage) return;

    try {
      const userInfo = await api.getUserInfo(unsendMessage.senderID);
      const userName = userInfo[unsendMessage.senderID].name;

      let alertMsg = `⚠️ تنبيه حذف رسالة!\n\n`;
      alertMsg += `👤 المستخدم: ${userName}\n`;
      alertMsg += `⏰ وقت الحذف: ${new Date().toLocaleString('ar-SA', {
        timeZone: 'Asia/Riyadh',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })}\n`;
      alertMsg += `📝 محتوى الرسالة المحذوفة:\n${unsendMessage.body || "لا يوجد نص"}\n`;
      alertMsg += `\n⚠️ الرجاء عدم حذف الرسائل بدون أخذ سكرين شوت`;

      // إذا كانت الرسالة تحتوي على مرفقات
      if (unsendMessage.attachments) {
        alertMsg += `\n📎 الرسالة كانت تحتوي على مرفقات`;
      }

      // إرسال التنبيه كرد على الرسالة المحذوفة
      api.sendMessage({
        body: alertMsg,
        mentions: [{
          tag: userName,
          id: unsendMessage.senderID
        }]
      }, threadID);

    } catch (error) {
      console.error(`خطأ في مراقب الرسائل المحذوفة: ${error.message}`);
    }
  }
};

module.exports.run = async function({ api, event }) {
  // This run function can be empty as this is an event listener
};
