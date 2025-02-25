

module.exports.config = {
name: "حماية",
version: "1.0.0",
hasPermssion: 0,
credits: "احمد عجينة",
description: "حماية المجموعة من الكلمات السيئة",
commandCategory: "أدمن",
usages: "حماية",
cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
const badWords = ["كلمة سيئة 1", "كلمة سيئة 2", "كلمة سيئة 3"];

const message = event.body.toLowerCase();
for (const word of badWords) {
if (message.includes(word.toLowerCase())) {
const warningMessage = "تم اكتشاف كلمة سيئة في الرسالة!";
return api.sendMessage(warningMessage, event.threadID, event.messageID);
}
}
if (event.body.includes("@")) {
const warningMessage = "ممنوع التبوع!";
return api.sendMessage(warningMessage, event.threadID, event.messageID);
}
if (event.logMessageType === "log:member:rename") {
const warningMessage = "تم تغيير الكنية!";
return api.sendMessage(warningMessage, event.threadID, event.messageID);
}
};
