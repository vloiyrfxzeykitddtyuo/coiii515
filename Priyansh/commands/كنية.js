const fs = require("fs");
const { join } = require("path");

module.exports.config = {
  name: "nickname-change",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ǺᎩᎧᏬᏰ",
  description: "Logs when a user changes their nickname",
  commandCategory: "🎮 الألعاب 🎮",
  cooldowns: 0,
};

module.exports.onLoad = function () {
  if (!fs.existsSync(join(__dirname, "cache", "nickname-changes.json"))) {
    fs.writeFileSync(join(__dirname, "cache", "nickname-changes.json"), JSON.stringify({}));
  }
};

module.exports.run = async function ({ api, event }) {
  const nicknameChanges = JSON.parse(fs.readFileSync(join(__dirname, "cache", "nickname-changes.json"), "utf8"));
  const { threadID, senderID, nickname } = event;

  if (!nicknameChanges[threadID]) {
    nicknameChanges[threadID] = {};
  }

  if (nicknameChanges[threadID][senderID] !== nickname) {
    const oldNickname = nicknameChanges[threadID][senderID] || "لم يكن لديه كنية من قبل";
    nicknameChanges[threadID][senderID] = nickname;

    fs.writeFileSync(join(__dirname, "cache", "nickname-changes.json"), JSON.stringify(nicknameChanges, null, 2));

    const message = `🔖 تم تغيير الكنية:\n\n- الكنية القديمة: ${oldNickname}\n- الكنية الجديدة: ${nickname}\n- الوقت: ${new Date().toLocaleString()}`;
    api.sendMessage(message, threadID);
  }
};
