module.exports.config = {
    name: "روليت",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "لعبة روليت للحصول على نجوم عشوائية",
    commandCategory: "ترفيه",
    usages: "روليت",
    cooldowns: 5
};

const starValues = [0, 10, 50, 500];

module.exports.run = async ({ api, event }) => {
    const randomIndex = Math.floor(Math.random() * starValues.length);
    const starsWon = starValues[randomIndex];

    const responseMessage = `🎉 لقد حصلت على ${starsWon} نجمة! 🎉`;

    return api.sendMessage(responseMessage, event.threadID, event.messageID);
};
