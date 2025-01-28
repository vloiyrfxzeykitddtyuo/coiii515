module.exports.config = {
    name: "المارد الأزرق",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "لعبة المارد الأزرق",
    commandCategory: "الألعاب",
    usages: "[بدء]",
    cooldowns: 500
};

const usersDemon = {};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;

    // بدء اللعبة
    if (args[0] === "بدء") {
        if (usersDemon[senderID]) {
            return api.sendMessage("⚠️ | أنت بالفعل في لعبة!", threadID, messageID);
        }

        usersDemon[senderID] = {
            questionIndex: 0,
            questions: [
                "هل الشخصية أنثى؟",
                "هل الشخصية مشهورة؟",
                "هل الشخصية حقيقية؟",
                "هل الشخصية رياضية؟",
                "هل الشخصية من أفلام؟"
            ],
            answers: []
        };

        return api.sendMessage(usersDemon[senderID].questions[usersDemon[senderID].questionIndex], threadID, messageID);
    }

    // معالجة الإجابات
    if (usersDemon[senderID]) {
        const userSession = usersDemon[senderID];

        userSession.answers.push(args.join(" "));

        userSession.questionIndex++;

        if (userSession.questionIndex < userSession.questions.length) {
            return api.sendMessage(userSession.questions[userSession.questionIndex], threadID, messageID);
        } else {
            // إنهاء اللعبة
            const finalMessage = `✅ | انتهت اللعبة! إجاباتك كانت: ${userSession.answers.join(", ")}`;
            delete usersDemon[senderID];
            return api.sendMessage(finalMessage, threadID, messageID);
        }
    }

    return api.sendMessage("⚠️ | يرجى كتابة `بدء` لبدء اللعبة!", threadID, messageID);
};
