module.exports.config = {
    name: "المغادرين",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Starks",
    description: "عرض قائمة المغادرين",
    commandCategory: "المجموعة",
    usages: "ستاركس",
    cooldowns: 5,
    dependencies: {
        "fs-extra": ""
    }
};

module.exports.run = async function ({ api, event, args }) {
    const fs = global.nodemodule["fs-extra"];
    const { threadID } = event;
    
    // قراءة سجل المغادرين من الملف إن وجد
    let leftMembers = [];
    try {
        const path = __dirname + `/cache/left_${threadID}.json`;
        if (fs.existsSync(path)) {
            leftMembers = JSON.parse(fs.readFileSync(path));
        }
    } catch (error) {
        console.error(error);
    }

    if (leftMembers.length === 0) {
        return api.sendMessage("لم يغادر أحد المجموعة حتى الآن.", threadID);
    }

    // تنسيق رسالة بأسماء المغادرين
    let message = "📋 قائمة الأعضاء الذين غادروا المجموعة:\n\n";
    leftMembers.forEach((member, index) => {
        message += `${index + 1}. ${member.name} (${member.nickname || "بدون كنية"})\n`;
    });

    return api.sendMessage(message, threadID);
};

module.exports.handleEvent = async function({ api, event, Users }) {
    const { logMessageData, threadID } = event;
    
    // التحقق من نوع الحدث (مغادرة العضو)
    if (event.logMessageType === "log:unsubscribe") {
        const leftUserID = logMessageData.leftParticipantFbId;
        
        try {
            // الحصول على معلومات العضو المغادر
            const userInfo = await Users.getInfo(leftUserID);
            const name = userInfo.name || "مستخدم مجهول";
            const nickname = await Users.getNickname(leftUserID, threadID) || null;
            
            // حفظ معلومات المغادر
            const path = __dirname + `/cache/left_${threadID}.json`;
            let leftMembers = [];
            
            if (fs.existsSync(path)) {
                leftMembers = JSON.parse(fs.readFileSync(path));
            }
            
            leftMembers.push({
                userID: leftUserID,
                name: name,
                nickname: nickname,
                timeLeft: Date.now()
            });
            
            fs.writeFileSync(path, JSON.stringify(leftMembers));
        } catch (error) {
            console.error(error);
        }
    }
};
