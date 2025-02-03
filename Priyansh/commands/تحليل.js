module.exports.config = {
    name: "تحليل",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "تحليل الشخصية",
    commandCategory: "ترفية",
    usages: "تحليل",
    cooldowns: 5,
};

module.exports.run = async ({ api, event }) => {
    // مصفوفات للتحليلات العشوائية
    const personalities = ["محبوب", "مكروه", "غامض", "مخيف", "ودود", "متقلب المزاج", "مرح", "جدي"];
    const reasons = [
        "لأنك صادق مع نفسك والآخرين",
        "بسبب غموضك الزائد",
        "لأنك تساعد الآخرين دائماً",
        "بسبب تصرفاتك الغريبة",
        "لأنك تفكر كثيراً قبل الكلام",
        "لأن لديك شخصية قوية",
        "بسبب طيبة قلبك",
        "لأنك تخفي مشاعرك الحقيقية"
    ];
    const motivations = [
        "تسعى دائماً للنجاح",
        "تبحث عن السعادة الحقيقية",
        "تريد مساعدة الآخرين",
        "تحاول إثبات نفسك",
        "تبحث عن المعرفة",
        "تريد تحقيق أحلامك",
        "تسعى للتطور الذاتي"
    ];

    // اختيار عناصر عشوائية
    const personality = personalities[Math.floor(Math.random() * personalities.length)];
    const reason = reasons[Math.floor(Math.random() * reasons.length)];
    const motivation = motivations[Math.floor(Math.random() * motivations.length)];
    const lovers = Math.floor(Math.random() * 100);
    const haters = Math.floor(Math.random() * 50);

    // إرسال رسالة "جاري التحليل"
    api.sendMessage("🔍 | جاري تحليل شخصيتك، انتظر قليلاً...", event.threadID);

    // انتظار 3 ثواني
    await new Promise(resolve => setTimeout(resolve, 3000));

    // إرسال التحليل
    const analysis = `📊 نتائج تحليل شخصيتك:
━━━━━━━━━━━━
👤 | نوع شخصيتك: ${personality}
🎯 | السبب: ${reason}
⭐ | دوافعك في الحياة: ${motivation}
❤️ | عدد المعجبين بك: ${lovers} شخص
💔 | عدد الكارهين: ${haters} شخص
━━━━━━━━━━━━
تذكر: هذا تحليل عشوائي للترفيه فقط! 🎮`;

    api.sendMessage(analysis, event.threadID);
};
