module.exports.config = {
  name: "لورد",
  version: "1.0.0",
  permission: 0,
  credits: "Assistant",
  prefix: true,
  description: "عرض الرصيد",
  category: "المال",
  cooldowns: 5
};

module.exports.run = async function({ event, api, args, Currencies, Users }) {
  const { threadID, messageID, senderID, mentions } = event;

  try {
    let targetId = senderID;

    if (Object.keys(mentions).length > 0) {
      targetId = Object.keys(mentions)[0]; // إذا كان هناك شخص مذكور
    }

    const userData = await api.getUserInfo(targetId);
    const userName = userData[targetId].name;
    const userMoney = (await Currencies.getData(targetId)).money || 0;

    const msg = `=== [ معلومات الرصيد ] ===\n━━━━━━━━━━━━━━━━━━\n[ 👤 ]➜ الاسم: ${userName}\n[ 💰 ]➜ الرصيد: ${userMoney} دولار\n━━━━━━━━━━━━━━━━━━`;

    api.sendMessage(msg, threadID, messageID);
  } catch (error) {
    console.error(error);
    api.sendMessage(`حدث خطأ: ${error.message}`, threadID, messageID);
  }
};
