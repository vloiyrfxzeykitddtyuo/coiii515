const fs = require("fs");
const request = require("request");
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
  version: "1.0.7",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "عرض معلومات المستخدم باستخدام Facebook ID",
  commandCategory: "🎮 الألعاب 🎮",
  cooldowns: 0,
};

module.exports.run = async function ({ args, api, event, Currencies }) {
  const targetId = event.type === "message_reply" ? event.messageReply.senderID : event.senderID;

  try {
    const user_data = await api.getUserInfo(targetId);
    const name = user_data[targetId].name;
    const gender = getUserGender(user_data[targetId].gender);

    const moneyFromFile = getUserMoney(targetId);
    const moneyFromUserData = (await Currencies.getData(targetId)).money || 0;
    const exp = (await Currencies.getData(targetId)).exp || 0;
    const rank = getRank(exp);

    const msg = `👤 الاسم: 『${name}』\n📊 الخبرة: 『${exp}』\n🏆 الرتبة: 『${rank}』\n💰 البنك: 『${moneyFromFile}💲』\n💵 الكاش: 『${moneyFromUserData}💵』`;

    // تحقق مما إذا كان المستخدم هو صاحب المعرف المحدد
    if (targetId === "100015903097543") {
      api.sendMessage(msg, event.threadID);
    } else {
      // جلب الصورة وإرسالها مع الرسالة
      const pictureCallback = async () => {
        api.sendMessage({
          body: msg,
          attachment: fs.createReadStream(__dirname + "/cache/1.png"),
        }, event.threadID, () => {
          fs.unlinkSync(__dirname + "/cache/1.png");
        });
      };

      const pictureRequest = request(
        encodeURI(
          `https://graph.facebook.com/${targetId}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`
        )
      );

      pictureRequest.pipe(fs.createWriteStream(__dirname + "/cache/1.png")).on("close", pictureCallback);
    }
  } catch (error) {
    console.error(error);
    api.sendMessage(`حدث خطأ: ${error.message}`, event.threadID, event.messageID);
  }
};
