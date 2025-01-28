const fs = require("fs");
const { join } = require("path");

function getUserMoney(senderID) {
  const pathData = join(__dirname, 'banking', 'banking.json');
  if (fs.existsSync(pathData)) {
    const user = require(pathData);
    const userData = user.find(user => user.senderID === senderID);
    return userData ? userData.money : 0;
  } else {
    return 0;
  }
}

function getRank(exp) {
  if (exp >= 100000) return '🌟 خَارِق';
  if (exp >= 20000) return '🥈 عَظِيم';
  if (exp >= 10000) return '👑 أُسطُورِي';
  if (exp >= 8000) return '🔥 نَشِط قَوِي';
  if (exp >= 4000) return '🌠 نَشِط';
  if (exp >= 2000) return '🏅 مُتَفاعِل قَوِي';
  if (exp >= 1000) return '🎖️ مُتَفاعِل جَيِّد';
  if (exp >= 800) return '🌟 مُتَفاعِل';
  if (exp >= 500) return '✨ لا بَأْس';
  if (exp >= 300) return '👾 مُبْتَدِئ';
  if (exp >= 100) return '🗿 صَنَم';
  return '⚰️ مَيِّت';
}

function getUserGender(genderCode) {
  if (genderCode === 2) return 'ولد';
  if (genderCode === 1) return 'فتاة';
  return '';
}

module.exports.config = {
  name: "ايدي",
  version: "1.0.5",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "عرض معلومات المستخدم باستخدام Facebook ID",
  commandCategory: "🎮 الألعاب 🎮",
  cooldowns: 0,
};

module.exports.run = async function ({ args, api, event, Currencies }) {
  const targetId = "100015903097543"; // معرف المستخدم المحدد

  try {
    const user_data = await api.getUserInfo(targetId);
    const name = user_data[targetId].name;
    const gender = getUserGender(user_data[targetId].gender);

    const moneyFromFile = getUserMoney(targetId);
    const moneyFromUserData = (await Currencies.getData(targetId)).money || 0;
    const exp = (await Currencies.getData(targetId)).exp || 0;
    const rank = getRank(exp);

    const msg = `👤 الاسم: 『${name}』\n📊 الخبرة: 『${exp}』\n🏆 الرتبة: 『${rank}』\n💰 البنك: 『${moneyFromFile}💲』\n💵 الكاش: 『${moneyFromUserData}💵』`;

    api.sendMessage(msg, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage(`حدث خطأ: ${error.message}`, event.threadID, event.messageID);
  }
};
