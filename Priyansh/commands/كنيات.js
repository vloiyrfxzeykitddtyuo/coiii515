module.exports.config = {
    name: "المغادرين",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Starks",
    description: "عرض قائمة المغادرين",
    commandCategory: "المجموعة",
    usages: "ستاركس",
    cooldowns: 5
};

let leftMembers = new Map(); // لتخزين المغادرين لكل مجموعة

module.exports.handleEvent = function({ api, event }) {
    if (event.logMessageType === "log:unsubscribe") {
        const leftUserID = event.logMessageData.leftParticipantFbId;
        const threadID = event.threadID;
        
        // تخزين معلومات المغادر
        if (!leftMembers.has(threadID)) {
            leftMembers.set(threadID, []);
        }
        
        // الحصول على اسم المستخدم المغادر
        api.getUserInfo(leftUserID, (err, userInfo) => {
            if (err) return;
            
            const userName = userInfo[leftUserID].name || "عضو مجهول";
            const currentTime = new Date().toLocaleString();
            
            let threadMembers = leftMembers.get(threadID);
            threadMembers.push({
                name: userName,
                time: currentTime
            });
            
            leftMembers.set(threadID, threadMembers);
        });
    }
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    
    // التحقق من وجود مغادرين في المجموعة
    if (!leftMembers.has(threadID) || leftMembers.get(threadID).length === 0) {
        return api.sendMessage("⚠ لم يغادر أحد المجموعة حتى الآن.", threadID);
    }

    // إنشاء رسالة بقائمة المغادرين
    const members = leftMembers.get(threadID);
    let message = "📋 قائمة الأعضاء الذين غادروا المجموعة:\n\n";
    
    members.forEach((member, index) => {
        message += `${index + 1}. ${member.name}\n└─ غادر في: ${member.time}\n\n`;
    });

    api.sendMessage(message, threadID);
};
