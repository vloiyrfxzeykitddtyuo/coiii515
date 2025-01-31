const fs = require("fs");
const { join } = require("path");

module.exports.config = {
  name: "كنية",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "تغيير كنية المستخدم",
  commandCategory: "🎮 الألعاب 🎮",
  cooldowns: 5,
};

module.exports.run = async function ({ args, api, event, Currencies }) {
  const pathData = join(__dirname, 'banking', 'banking.json');
  const userData = JSON.parse(fs.readFileSync(pathData, 'utf8'));

  const targetID = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;
  const newNickname = args.join(" ");

  // إيجاد المستخدم في البيانات
  const user = userData.find(user => user.senderID === targetID);
  if (!user) {
    return api.sendMessage("لا يمكن العثور على المستخدم في البيانات", event.threadID, event.messageID);
  }

  // تحديث الكنية الجديدة
  const oldNickname = user.nickname;
  user.nickname = newNickname;
  fs.writeFileSync(pathData, JSON.stringify(userData, null, 2));

  // إرسال رسالة في المجموعة
  const message = `🔰 تم تغيير كنية المستخدم:\n\n👤 اسم المستخدم: ${event.userName}\n📋 الكنية القديمة: ${oldNickname}\n📌 الكنية الجديدة: ${newNickname}\n⏱️ الوقت: ${new Date().toLocaleString()}`;
  api.sendMessage(message, event.threadID);
};
