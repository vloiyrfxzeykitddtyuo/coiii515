
const fs = require('fs');
const axios = require('axios');

module.exports.config = {
  name: "تغيير_الاسم",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "احمد عجينة",
  description: "إشعار بتغيير اسم المستخدم",
  commandCategory: "إشعارات",
  usages: "تغيير_الاسم",
  cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
  if (event.logMessageType === "log:member:change_name") {
    const { threadID, logMessageData } = event;
    const { newName, oldName, changeNameUser } = logMessageData;
    const message = `تم تغيير اسم المستخدم من: ${oldName} إلى: ${newName} من قبل العضو: ${changeNameUser}`;
    return api.sendMessage(message, threadID);
  }
};
