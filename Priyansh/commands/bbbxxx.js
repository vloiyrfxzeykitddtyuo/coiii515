module.exports.config = {
    name: "شين",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "لعبة المارد الأزرق",
    commandCategory: "الألعاب",
    usages: "[بدء]",
    cooldowns: 500
};

const Akinator = require("akinator"); // تأكد من تثبيت مكتبة Akinator

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    const startGame = async () => {
        const aki = new Akinator();
        const session = await aki.startGame();
        return session;
    };

    if (args[0] === "بدء") {
        const session = await startGame();
        const question = session.firstQuestion;

        // إرسال السؤال الأول
        return api.sendMessage(`*- فكر في شخصية مشهورة -*\n\n${question}`, threadID, messageID);
    }

    // إذا كان هناك رد على السؤال
    if (args.length > 1) {
        const response = args[1]; // الحصول على الإجابة من المستخدم
        const nextQuestion = await session.answer(response); // استجابة لجولة جديدة من اللعبة

        if (nextQuestion) {
            return api.sendMessage(nextQuestion, threadID, messageID);
        } else {
            // إذا انتهت اللعبة
            return api.sendMessage("✅ | لقد انتهت اللعبة! شكراً للعب!", threadID, messageID);
        }
    }

    return api.sendMessage("⚠️ | يرجى كتابة `بدء` لبدء اللعبة!", threadID, messageID);
};

