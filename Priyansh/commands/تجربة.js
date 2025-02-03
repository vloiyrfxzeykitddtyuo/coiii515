module.exports.config = {
    name: "روليت",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "لعبة روليت للحصول على نجوم عشوائية مع صورة",
    commandCategory: "ترفيه",
    usages: "روليت",
    cooldowns: 5
};

const starValues = [0, 10, 50, 100, 500];
const starImages = {
    0: "https://up6.cc/2025/02/173860263417251.jpg",
    10: "https://up6.cc/2025/02/173860252686541.jpg",
    50: "https://up6.cc/2025/02/173860227037931.jpg",
    100: "https://up6.cc/2025/02/173860238892191.jpg",
    500: "https://up6.cc/2025/02/173860217509681.jpg"
};

module.exports.run = async ({ api, event }) => {
    const randomIndex = Math.floor(Math.random() * starValues.length);
    const starsWon = starValues[randomIndex];
    const rouletteImage = starImages[starsWon];

    const responseMessage = `🎉 لقد حصلت على ${starsWon} نجمة! 🎉`;

    // إرسال الرسالة مع الصورة
    return api.sendMessage(
        {
            body: responseMessage,
            attachment: await api.getFile(rouletteImage)
        },
        event.threadID,
        event.messageID
    );
};
