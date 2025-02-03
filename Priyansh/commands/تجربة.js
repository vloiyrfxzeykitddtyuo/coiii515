let userStars = 0; // متغير لتخزين عدد النجوم

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

    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];

    // إضافة النجوم الفائزة إلى المتغير
    userStars += randomReward.stars;

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
    };

    api.sendMessage(msg, event.threadID, () => {
        fs.unlinkSync(__dirname + "/cache/roulette.jpg");
    });
};

// وظيفة "نجومي" لعرض عدد النجوم
module.exports.showStars = async ({ api, event }) => {
    const userName = event.senderID; // يمكنك استبدال هذا برمز لجلب اسم المستخدم من فيسبوك إذا كان متاحًا

    const message = `🎉 مرحبًا ${userName} 🎉\nلديك ${userStars} نجوم! ⭐`;

    api.sendMessage(message, event.threadID);
};

// إضافة الأمر الجديد "نجومي"
module.exports.config.commands = {
    "نجومي": module.exports.showStars
};
