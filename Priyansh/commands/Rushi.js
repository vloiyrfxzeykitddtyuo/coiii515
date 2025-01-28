module.exports.config = {
    name: "autoReply",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Automatic reply for 'ءجوان' or 'جوان'",
    commandCategory: "system",
    usages: "",
    cooldowns: 1,
};

module.exports.languages = {
    "en": {
        "replyMessage": "شنو تريد منها 👈🏻👉🏻🔪",
        "emoji": "🐼",
    }
};

module.exports.handleEvent = function ({ api, event, getText }) {
    const { threadID, messageID, body } = event;

    // التحقق من الرسالة
    if (body && (body.includes("ءجوان") || body.includes("جوان"))) {
        // إرسال الإيموجي أولاً
        api.sendMessage(getText("emoji"), threadID, (error, info) => {
            // إرسال الرد وكلمة "شنو تريد منها" مع الصورة
            const imageUrl = "https://up6.cc/2025/01/173807054441831.jpg";
            api.sendMessage(
                {
                    body: getText("replyMessage"),
                    attachment: imageUrl
                },
                threadID,
                messageID
            );
        });
    }
};

module.exports.run = function({ api, event }) {
    // ليس هناك أي تنفيذ خاص هنا، الكود يتفاعل تلقائياً
};
