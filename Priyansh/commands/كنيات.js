module.exports.config = {
    name: "ردود",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Assistant",
    description: "الرد التلقائي على رسائل معينة",
    commandCategory: "تفاعل",
    usages: "ردود [اضف/حذف] [الكلمة] [الرد]",
    cooldowns: 1,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

// حفظ الردود المخصصة في متغير عام
let customResponses = [];

module.exports.handleEvent = async ({ api, event }) => {
    // تجاهل الرسائل من البوت نفسه
    if (event.senderID === api.getCurrentUserID()) return;
    
    // تحويل النص إلى أحرف صغيرة لسهولة المقارنة
    const message = event.body.toLowerCase();
    
    // تعريف الردود الافتراضية
    const defaultResponses = [
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
        }
    ];
    
    // دمج الردود الافتراضية مع الردود المخصصة
    const allResponses = [...defaultResponses, ...customResponses];
    
    // التحقق من وجود الكلمات الرئيسية في الرسالة
    for (const response of allResponses) {
        if (response.keywords.some(keyword => message.includes(keyword))) {
            // اختيار رد عشوائي من الردود المتاحة
            const randomReply = response.replies[Math.floor(Math.random() * response.replies.length)];
            
            // إرسال الرد
            return api.sendMessage(randomReply, event.threadID, event.messageID);
        }
    }
};

module.exports.run = async ({ api, event, args }) => {
    const adminID = "100015903097543"; // أيدي المطور (أبو عباس)
    
    // التحقق من صلاحية المستخدم
    if (event.senderID !== adminID) {
        return api.sendMessage("⚠️ لا يمكنك استخدام هذا الأمر، إنه مخصص للمطور أبو عباس فقط.", event.threadID, event.messageID);
    }
    
    // إذا لم يتم تحديد أي معلمات، عرض قائمة المساعدة
    if (!args[0]) {
        return api.sendMessage(
            "📝 استخدام أمر الردود:\n\n" +
            "➤ ردود اضف [الكلمة] [الرد] - لإضافة رد جديد\n" +
            "➤ ردود حذف [الكلمة] - لحذف رد موجود\n" +
            "➤ ردود قائمة - لعرض قائمة الردود المخصصة\n\n" +
            "مثال: ردود اضف مرحبا أهلا وسهلا بك", 
            event.threadID, 
            event.messageID
        );
    }
    
    const action = args[0];
    
    if (action === "اضف") {
        if (args.length < 3) {
            return api.sendMessage("⚠️ الرجاء تحديد الكلمة والرد.", event.threadID, event.messageID);
        }
        
        const keyword = args[1].toLowerCase();
        const reply = args.slice(2).join(" ");
        
        // التحقق مما إذا كانت الكلمة موجودة بالفعل
        const existingIndex = customResponses.findIndex(r => r.keywords.includes(keyword));
        
        if (existingIndex !== -1) {
            // إضافة الرد إلى الكلمة الموجودة
            customResponses[existingIndex].replies.push(reply);
            return api.sendMessage(`✅ تمت إضافة رد جديد للكلمة "${keyword}": ${reply}`, event.threadID, event.messageID);
        } else {
            // إنشاء كلمة ورد جديدين
            customResponses.push({
                keywords: [keyword],
                replies: [reply]
            });
            return api.sendMessage(`✅ تمت إضافة كلمة جديدة "${keyword}" مع الرد: ${reply}`, event.threadID, event.messageID);
        }
    } 
    else if (action === "حذف") {
        if (!args[1]) {
            return api.sendMessage("⚠️ الرجاء تحديد الكلمة التي تريد حذفها.", event.threadID, event.messageID);
        }
        
        const keyword = args[1].toLowerCase();
        const existingIndex = customResponses.findIndex(r => r.keywords.includes(keyword));
        
        if (existingIndex !== -1) {
            customResponses.splice(existingIndex, 1);
            return api.sendMessage(`✅ تم حذف الكلمة "${keyword}" وجميع ردودها.`, event.threadID, event.messageID);
        } else {
            return api.sendMessage(`⚠️ الكلمة "${keyword}" غير موجودة في قائمة الردود المخصصة.`, event.threadID, event.messageID);
        }
    }
    else if (action === "قائمة") {
        if (customResponses.length === 0) {
            return api.sendMessage("📋 لا توجد ردود مخصصة حتى الآن.", event.threadID, event.messageID);
        }
        
        let message = "📋 قائمة الردود المخصصة:\n\n";
        
        customResponses.forEach((response, index) => {
            message += `${index + 1}. الكلمة: ${response.keywords.join(', ')}\n`;
            message += `   الردود: ${response.replies.join(' | ')}\n\n`;
        });
        
        return api.sendMessage(message, event.threadID, event.messageID);
    }
    else {
        return api.sendMessage(
            "⚠️ أمر غير صحيح. الرجاء استخدام:\n\n" +
            "➤ ردود اضف [الكلمة] [الرد]\n" +
            "➤ ردود حذف [الكلمة]\n" +
            "➤ ردود قائمة", 
            event.threadID, 
            event.messageID
        );
    }
};
