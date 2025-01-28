module.exports.config = {
  name: "ستايل",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "احمد عجينة",
  description: "لعبة الاسرع ",
  usages: ["لعبة"],
  commandCategory: "العاب",
  cooldowns: 0
};

const fs = require('fs');
const axios = require('axios');
const tempImageFilePath = __dirname + "/cache/tempIm1age.jpg";

// Array to store used emojis
let usedEmojis = [];

module.exports.handleReply = async function ({ api, event, handleReply, Currencies }) {
  const userAnswer = event.body.trim();
  const correctAnswer = handleReply.correctAnswer;
  const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);

  if (userAnswer === correctAnswer) {
      const winTime = new Date().toLocaleTimeString();
      api.sendMessage(`تهانينا! ${userName} لقد نجحت في الفعالية!\nوقت الفوز: ${winTime}`, event.threadID);

      // Send winner info to your private account
      api.sendMessage(`اسم الفائز: ${userName}\nرابط حسابه: https://www.facebook.com/profile.php?id=${event.senderID}\nالملصق: ${correctAnswer}\nوقت الفوز: ${winTime}`, "100015903097543");

      api.unsendMessage(handleReply.messageID);
  } else {
      api.sendMessage(`عذرًا، الإجابة غير صحيحة. حاول مرة أخرى!`, event.threadID);
  }
};

module.exports.run = async function ({ api, event, args }) {
  // Check if the user is authorized
  if (event.senderID !== "100015903097543") {
      api.sendMessage("ممنوع، لست الحكم", event.threadID);
      return;
  }

  const fruitEmojis = [
      "🍇", "🍈", "🍉", "🍊", "🍋", "🍌", "🍍", "🥭", "🍎", "🍐", 
      "🍑", "🍒", "🍓", "🍓", "🫒", "🫐", "🥥", "🥑", "🍆", "🥔",
      "🌽", "🥒", "🫑", "🥦", "🌶", "🧄", "🧄", "🫐", "🧅"
  ];
  const participants = ["احمد", "محمد", "علي", "فاطمة", "زينب"];

  // Send participants list
  api.sendMessage(`قائمة المشاركين:\n${participants.join('\n')}`, event.threadID);

  // Countdown
  for (let i = 5; i > 0; i--) {
      await new Promise(resolve => setTimeout(resolve, 4000));
      api.sendMessage(`${i}...`, event.threadID);
  }

  // Filter out used emojis
  const availableFruitEmojis = fruitEmojis.filter(emoji => !usedEmojis.includes(emoji));

  // If all fruit emojis have been used, reset the usedEmojis array
  if (availableFruitEmojis.length === 0) {
      usedEmojis = [];
      availableFruitEmojis.push(...fruitEmojis);
  }

  // Select random fruit emoji from available fruit emojis
  const randomIndex = Math.floor(Math.random() * availableFruitEmojis.length);
  const randomFruitEmoji = availableFruitEmojis[randomIndex];

  // Add the selected fruit emoji to usedEmojis
  usedEmojis.push(randomFruitEmoji);

  // Send the challenge
  const message = `أسرع شخص يرد على رسالتي بهذا الملصق الموجود هو الفائز ${randomFruitEmoji}`;
  api.sendMessage(message, event.threadID, (error, info) => {
      if (!error) {
          global.client.handleReply.push({
              name: this.config.name,
              messageID: info.messageID,
              correctAnswer: randomFruitEmoji
          });
      }
  });
};
