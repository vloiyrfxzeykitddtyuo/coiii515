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

module.exports.run = async function({ event, api, args, client, Currencies, Users, utils, __GLOBAL }) {
  const { threadID, messageID, senderID, mentions } = event;

  if (Object.keys(mentions).length == 0) {
      // عرض رصيد المستخدم نفسه
      const userMoney = (await Currencies.getData(senderID)).money;
      const userName = (await Users.getData(senderID)).name;
      return api.sendMessage(
          `=== [ معلومات الرصيد ] ===\n━━━━━━━━━━━━━━━━━━\n[ 👤 ]➜ الاسم: ${userName}\n[ 💰 ]➜ الرصيد: ${userMoney} دولار\n━━━━━━━━━━━━━━━━━━`, 
          threadID, messageID
      );
  } else {
      // عرض رصيد الشخص المذكور
      const mention = Object.keys(mentions)[0];
      const targetMoney = (await Currencies.getData(mention)).money;
      const targetName = (await Users.getData(mention)).name;
      const userMoney = (await Currencies.getData(senderID)).money;
      const userName = (await Users.getData(senderID)).name;

      return api.sendMessage(
          `=== [ معلومات الرصيد ] ===\n━━━━━━━━━━━━━━━━━━\n[ 👤 ]➜ رصيدك انت: ${userName}\n[ 💰 ]➜ رصيدك: ${userMoney} دولار\n\n[ 👥 ]➜ رصيد: ${targetName}\n[ 💰 ]➜ رصيده: ${targetMoney} دولار\n━━━━━━━━━━━━━━━━━━`,
          threadID, messageID
      );
  }
}
