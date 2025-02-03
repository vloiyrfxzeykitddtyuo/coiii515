module.exports.config = {
    name: "نصيحة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "نصائح تلقائية متجددة",
    commandCategory: "حكم ونصائح",
    usages: "نصيحة",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    // مصفوفات الكلمات لتكوين النصائح
    const beginnings = [
        "احرص على",
        "تذكر دائماً",
        "من المهم",
        "لا تنسَ",
        "عليك أن",
        "اجعل",
        "حاول",
        "ينبغي",
        "من الحكمة",
        "تعلم كيف"
    ];

    const actions = [
        "الاستماع",
        "التفكير",
        "العمل",
        "المثابرة",
        "الصبر",
        "التأمل",
        "المحافظة على",
        "تطوير",
        "تحسين",
        "بناء"
    ];

    const objects = [
        "نفسك",
        "علاقاتك مع الآخرين",
        "صحتك",
        "عقلك",
        "مستقبلك",
        "أهدافك",
        "وقتك",
        "مهاراتك",
        "معرفتك",
        "قدراتك"
    ];

    const reasons = [
        "فهذا يقودك إلى النجاح",
        "لأن هذا مفتاح السعادة",
        "فهذا يجلب الراحة النفسية",
        "لتحقيق أحلامك",
        "لتكون أفضل",
        "فهذا يساعدك على التقدم",
        "لتعيش حياة متوازنة",
        "فهذا يفتح لك آفاقاً جديدة",
        "لتصل إلى أهدافك",
        "فهذا يجعل حياتك أفضل"
    ];

    const additions = [
        "ولا تستعجل النتائج",
        "واستمر في المحاولة",
        "وكن صبوراً",
        "ولا تستسلم أبداً",
        "وثق بنفسك",
        "واعمل بجد",
        "وابتسم دائماً",
        "وكن متفائلاً",
        "واستمتع بالرحلة",
        "وتذكر أن كل شيء ممكن"
    ];

    // دالة لاختيار عنصر عشوائي من مصفوفة
    const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

    // توليد النصيحة
    const generateAdvice = () => {
        const beginning = getRandomElement(beginnings);
        const action = getRandomElement(actions);
        const object = getRandomElement(objects);
        const reason = getRandomElement(reasons);
        const addition = getRandomElement(additions);

        return `${beginning} ${action} ${object}، ${reason}، ${addition}.`;
    };

    // إضافة ايموجي عشوائي
    const emojis = ["💫", "✨", "🌟", "💭", "💝", "💖", "🌺", "🌸", "🍀", "🎯"];
    const randomEmoji = getRandomElement(emojis);

    // تكوين الرسالة النهائية
    const advice = `${randomEmoji} نصيحة اليوم:\n\n${generateAdvice()}`;

    // إرسال النصيحة
    return api.sendMessage(advice, event.threadID, event.messageID);
};
