module.exports.config = {
    name: "مراقبة كنيات",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "مراقبة كنيات الأعضاء في المجموعة",
    commandCategory: "ترفية",
    usages: "مراقبة البوت",
    cooldowns: 5,
    dependencies: {
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, Users }) => {
    const fs = global.nodemodule["fs-extra"];
    const axios = global.nodemodule["axios"];
    
    if (event.body === "مراقبة البوت") {
        // إعداد قائمة لتخزين الكنيات الحالية
        let currentNicknames = {};
        
        // إرسال رسالة التأكيد
        api.sendMessage({
            body: `تم تفعيل مراقبة كنيات الأعضاء. رابط الصورة: https://up6.cc/2025/02/173843076665791.jpg`
        }, event.threadID, event.messageID);
        
        // مراقبة الكنيات
        const checkNicknames = async () => {
            const threadInfo = await api.getThreadInfo(event.threadID);
            const members = threadInfo.participantIDs;
            
            for (const memberID of members) {
                const userInfo = await Users.getInfo(memberID);
                const nickname = userInfo[memberID].nickname || userInfo[memberID].fullName;
                
                // التحقق من التغييرات
                if (currentNicknames[memberID] !== nickname) {
                    currentNicknames[memberID] = nickname;
                    api.sendMessage({
                        body: `تم تغيير كنية العضو: ${nickname}`
                    }, event.threadID);
                }
            }
        };

        // استدعاء دالة المراقبة بشكل دوري
        setInterval(checkNicknames, 5000); // كل 5 ثوانٍ
    }
};
