module.exports.config = {
    name: "ردود",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد التلقائي على رسائل معينة",
    commandCategory: "تفاعل",
    usages: "ردود",
    cooldowns: 1,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.handleEvent = async ({ api, event }) => {
    // تجاهل الرسائل من البوت نفسه
    if (event.senderID === api.getCurrentUserID()) return;
    
    // تحويل النص إلى أحرف صغيرة لسهولة المقارنة
    const message = event.body.toLowerCase();
    
    // تعريف الردود
    const responses = [
        {
            keywords: ["سلام عليكم", "السلام عليكم", "سلام", "السلام"],
            replies: [
                "وعليكم السلام ورحمة الله وبركاته 🌹",
                "وعليكم السلام 💐",
                "أهلاً وسهلاً، وعليكم السلام ✨"
            ]
        },
        {
            keywords: ["صباح الخير", "صباح النور", "صباحو", "صباح"],
            replies: [
                "صباح الورد والياسمين 🌸",
                "صباح النور والسرور ☀️",
                "صباحك سعيد وجميل 🌞"
            ]
        },
        {
            keywords: ["هههه", "ههه", "هه", "😂", "🤣"],
            replies: [
                "دوم الضحكة يارب 😊",
                "يا حلو ضحكتك 😄",
                "الله يسعدك ويبسطك دائماً 😁"
            ]
        },
        {
            keywords: ["شكرا", "شكراً", "تسلم", "مشكور", "يعطيك العافية"],
            replies: [
                "العفو، حاضر دائماً لخدمتك ❤️",
                "لا شكر على واجب 🌺",
                "الله يعافيك، أسعدني التفاعل معك ✨"
            ]
        },
        {
            keywords: ["تصبح على خير", "تصبحون على خير", "ليلة سعيدة"],
            replies: [
                "وأنت من أهل الخير 🌙",
                "أحلام سعيدة 💫",
                "ليلة هادئة وسعيدة لك 🌠"
            ]
        },
        {
            keywords: ["كيفك", "شلونك", "كيف الحال", "عامل ايه"],
            replies: [
                "بخير الحمد لله، وأنت؟ 😊",
                "تمام وبخير، وأنت كيفك؟ 🌹",
                "الحمد لله، أسعدني سؤالك عني ✨"
            ]
        },
        {
            keywords: ["اهلا", "هلا", "مرحبا", "مرحباً", "هلو"],
            replies: [
                "أهلاً وسهلاً بك 🌹",
                "هلا والله، نورتنا 💐",
                "مرحباً بك، سعيد بوجودك معنا ✨"
            ]
        },
        {
            keywords: ["علي"],
            replies: [
                "شنو تريد من عنده؟"
            ]
        },
        {
            keywords: ["عبدو"],
            replies: [
                "مشغول الولد."
            ]
        },
        {
            keywords: ["عباس"],
            replies: [
                "مشغول خلي رسالتك خاص بحسابو."
            ]
        },
        {
            keywords: ["دلال"],
            replies: [
                "همم 🙄👀"
            ]
        }
    ];
    
    // التحقق من وجود الكلمات الرئيسية في الرسالة
    for (const response of responses) {
        if (response.keywords.some(keyword => message.includes(keyword))) {
            // اختيار رد عشوائي من الردود المتاحة
            const randomReply = response.replies[Math.floor(Math.random() * response.replies.length)];
            
            // إرسال الرد
            return api.sendMessage(randomReply, event.threadID, event.messageID);
        }
    }
};

module.exports.run = async ({ api, event }) => {
    return api.sendMessage(
        "تم تفعيل نظام الردود التلقائية\n" +
        "البوت سيرد تلقائياً على:\n" +
        "- السلام عليكم\n" +
        "- صباح الخير\n" +
        "- ههههه (الضحك)\n" +
        "- شكراً / تسلم\n" +
        "- تصبح على خير\n" +
        "- كيفك / شلونك\n" +
        "- هلا / مرحباً\n" +
        "- علي\n" +
        "- عبدو\n" +
        "- عباس\n" +
        "- دلال", 
        event.threadID, 
        event.messageID
    );
};
