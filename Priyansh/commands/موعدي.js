module.exports.config = {
    name: "موعدي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "توقع المواعيد المستقبلية",
    commandCategory: "ترفية",
    usages: "موعدي",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var ZiaRein = [
        "https://up6.cc/2025/02/173841733904151.jpg",
        "https://up6.cc/2025/02/173841733904151.jpg",
        "https://up6.cc/2025/02/173841733904151.jpg",
        "https://up6.cc/2025/02/173841733904151.jpg",
        "https://up6.cc/2025/02/173841733904151.jpg"
    ];

    var predictions = [
        "🎭 موعد شهرتك القادمة ستكون في عام 2025",
        "💔 للأسف موعد طلاقك سيكون في شهر 6 عام 2026",
        "💸 موعد إفلاسك سيكون في شهر 3 عام 2027",
        "🏆 موعد نجاحك الكبير سيكون في شهر 8 عام 2024",
        "💑 موعد زواجك سيكون في شهر 12 عام 2025",
        "🎓 موعد تخرجك سيكون في شهر 7 عام 2024",
        "✈️ موعد سفرك الكبير سيكون في شهر 4 عام 2026",
        "🏠 موعد شراء منزلك الجديد سيكون في شهر 9 عام 2027",
        "💰 موعد ثرائك الفاحش سيكون في شهر 11 عام 2028",
        "🚗 موعد شراء سيارتك الفارهة سيكون في شهر 5 عام 2025",
        "👶 موعد إنجاب طفلك الأول سيكون في شهر 2 عام 2026",
        "💼 موعد وظيفتك الجديدة سيكون في شهر 1 عام 2024",
        "🌍 موعد هجرتك سيكون في شهر 10 عام 2025",
        "❤️ موعد لقاء شريك حياتك سيكون في شهر 8 عام 2024",
        "📱 موعد شهرتك على السوشيال ميديا سيكون في شهر 3 عام 2025",
        "🎪 موعد تحقيق حلمك سيكون في شهر 7 عام 2026",
        "🏢 موعد تأسيس شركتك الخاصة سيكون في شهر 4 عام 2027",
        "💉 موعد شفائك التام سيكون في شهر 12 عام 2024",
        "🎨 موعد نجاحك الفني سيكون في شهر 6 عام 2025",
        "📚 موعد تأليف كتابك الأول سيكون في شهر 9 عام 2026",
        "🎮 موعد شهرتك في عالم الألعاب سيكون في شهر 5 عام 2024",
        "🎭 موعد ظهورك التلفزيوني الأول سيكون في شهر 2 عام 2025",
        "💪 موعد تحقيق هدفك الرياضي سيكون في شهر 8 عام 2025",
        "🎵 موعد نجاحك الموسيقي سيكون في شهر 11 عام 2026",
        "🌟 موعد تغير حياتك للأفضل سيكون في شهر 1 عام 2025"
    ];

    var randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
    
    var ZiaRein2 = () => api.sendMessage({
        body: randomPrediction,
        attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg")
    }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);
    
    return request(encodeURI(ZiaRein[Math.floor(Math.random() * ZiaRein.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};

