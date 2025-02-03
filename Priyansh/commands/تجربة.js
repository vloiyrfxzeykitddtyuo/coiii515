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

const fs = global.nodemodule["fs-extra"];
const axios = global.nodemodule["axios"];
let userStars = {}; // Object to store user stars

module.exports.run = async ({ api, event }) => {
    const command = event.body.trim();
    
    // Weighted rewards array with duplicates to adjust probabilities
    const rewards = [
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 0, image: "https://up6.cc/2025/02/173860263417251.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 10, image: "https://up6.cc/2025/02/173860252686541.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 50, image: "https://up6.cc/2025/02/173860227037931.jpg" },
        { stars: 100, image: "https://up6.cc/2025/02/173860217509681.jpg" },
        { stars: 500, image: "https://up6.cc/2025/02/173860238892191.jpg" }
    ];

    if (command === "روليت") {
        const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

        const imgResponse = await axios.get(randomReward.image, { responseType: 'arraybuffer' });
        fs.writeFileSync(__dirname + "/cache/roulette.jpg", Buffer.from(imgResponse.data));

        userStars[event.senderID] = (userStars[event.senderID] || 0) + randomReward.stars;

        let message;
        if (randomReward.stars >= 100) {
            message = `🎰 روليت النجوم 🎰\n🎊 يا بختك! ربحت ${randomReward.stars} نجمة! 🎊`;
        } else {
            message = `🎰 روليت النجوم 🎰\nربحت ${randomReward.stars} نجمة! ⭐`;
        }

        const msg = {
            body: message,
            attachment: fs.createReadStream(__dirname + "/cache/roulette.jpg")
        };

        api.sendMessage(msg, event.threadID, () => {
            fs.unlinkSync(__dirname + "/cache/roulette.jpg");
        });
    } 
    else if (command === "روليت نجومي") {
        const stars = userStars[event.senderID] || 0;
        const message = `🎉 لديك ${stars} نجوم! 🎉`;
        api.sendMessage(message, event.threadID);
    }
};
