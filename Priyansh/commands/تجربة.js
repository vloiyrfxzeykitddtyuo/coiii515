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
    // Weighted rewards array with duplicates to adjust probabilities
    const rewards = [
        // 0 stars (30% chance)
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        
        // 10 stars (30% chance)
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        
        // 50 stars (30% chance)
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        
        // 100 stars (7% chance)
        { stars: 100, image: "https://up6.cc/2025/02/173860217509681.jpg" },
        
        // 500 stars (3% chance)
        { stars: 500, image: "https://up6.cc/2025/02/173860238892191.jpg" }
    ];

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];

    const imgResponse = await axios.get(randomReward.image, {responseType: 'arraybuffer'});
    fs.writeFileSync(__dirname + "/cache/roulette.jpg", Buffer.from(imgResponse.data));

    let message;
    if (randomReward.stars >= 100) {
        message = `🎰 روليت النجوم 🎰\n🎊 يا بختك! ربحت ${randomReward.stars} نجمة! 🎊`;
    } else {
        message = `🎰 روليت النجوم 🎰\nربحت ${randomReward.stars} نجمة! ⭐`;
    }

    const msg = {
        body: message,
        attachment: fs.createReadStream(__dirname + "/cache/roulette.jpg")
    }

    api.sendMessage(msg, event.threadID, () => {
        fs.unlinkSync(__dirname + "/cache/roulette.jpg");
    });
}
