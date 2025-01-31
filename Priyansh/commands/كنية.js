module.exports.config = {
  name: "رصيدي",
  version: "1.0.0",
  permission: 0,
  credits: "Assistant",
  prefix: true,
  description: "عرض الرصيد",
  category: "المال",
  cooldowns: 5
};

module.exports.run = async function({ event, api, Currencies, Users }) {
  const { threadID, messageID, senderID, mentions } = event;

  try {
    // تحديد معرف المستخدم الهدف
    const targetId = Object.keys(mentions).length > 0 ? Object.keys(mentions)[0] : senderID;

    // جلب معلومات المستخدم
    const userData = await api.getUserInfo(targetId);
    const userName = userData[targetId] ? userData[targetId].name : "غير معروف";
    
    // جلب الرصيد للمستخدم الهدف
    const userMoneyData = await Currencies.getData(targetId);
    const userMoney = userMoneyData.money || 0;

    // بناء الرسالة
    const msg = `=== [ معلومات الرصيد ] ===\n━━━━━━━━━━━━━━━━━━\n[ 👤 ]➜ الاسم: ${userName}\n[ 💰 ]➜ الرصيد: ${userMoney} دولار\n━━━━━━━━━━━━━━━━━━`;

    // إرسال الرسالة
    api.sendMessage(msg, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage(`حدث خطأ: ${error.message}`, threadID, messageID);
  }
};
