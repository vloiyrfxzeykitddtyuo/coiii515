module.exports.config = {
    name: "روليت",
    version: "1.0.0", 
    hasPermssion: 0,
    credits: "Modified by Claude",
    description: "لعبة روليت النجوم",
    commandCategory: "العاب",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const rewards = [
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 100, image: "https://up6.cc/2025/02/173860217509681.jpg" },
        { stars: 500, image: "https://up6.cc/2025/02/173860238892191.jpg" }
    ];

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];

    const imgResponse = await axios.get(randomReward.image, {responseType: 'arraybuffer'});
    fs.writeFileSync(__dirname + "/cache/roulette.jpg", Buffer.from(imgResponse.data));

    const msg = {
        body: `🎰 روليت النجوم 🎰\nمبروك! ربحت ${randomReward.stars} نجمة! ⭐`,
        attachment: fs.createReadStream(__dirname + "/cache/roulette.jpg")
    }

    api.sendMessage(msg, event.threadID, () => {
        fs.unlinkSync(__dirname + "/cache/roulette.jpg");
    });
}
