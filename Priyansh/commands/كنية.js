module.exports.config = {
    name: "مراقبة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Modified by Claude",
    description: "مراقبة كنيات الاعضاء",
    commandCategory: "المجموعة",
    usages: "مراقبة",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

let nicknameMonitoring = new Map();

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    
    const threadID = event.threadID;
    
    if (!nicknameMonitoring.has(threadID)) {
        nicknameMonitoring.set(threadID, true);
        
        // إرسال رسالة التأكيد مع الصورة
        var message = {
            body: "✅ تم تفعيل مراقبة كنيات الأعضاء في هذه المجموعة",
            attachment: fs.createReadStream(__dirname + "/cache/monitor.jpg")
        }
        
        // تحميل الصورة وإرسال الرسالة
        request("https://up6.cc/2025/02/173843076665791.jpg")
            .pipe(fs.createWriteStream(__dirname + "/cache/monitor.jpg"))
            .on("close", () => {
                api.sendMessage(message, threadID, () => {
                    fs.unlinkSync(__dirname + "/cache/monitor.jpg");
                });
            });
            
        // إضافة مستمع لمراقبة تغييرات الكنية
        api.listenMqtt((err, event) => {
            if (event.type === "event" && event.logMessageType === "log:user-nickname") {
                const { threadID, author, logMessageData } = event;
                
                if (nicknameMonitoring.get(threadID)) {
                    const changedFor = logMessageData.participant_id;
                    const newNickname = logMessageData.nickname || "حذف الكنية";
                    
                    api.getUserInfo([author, changedFor], (err, users) => {
                        if (err) return;
                        
                        const authorName = users[author].name;
                        const targetName = users[changedFor].name;
                        
                        let msg = `⚠️ تنبيه تغيير كنية:\n`;
                        msg += `👤 المستخدم: ${authorName}\n`;
                        if (author === changedFor) {
                            msg += `📝 قام بتغيير كنيته إلى: ${newNickname}`;
                        } else {
                            msg += `📝 قام بتغيير كنية ${targetName} إلى: ${newNickname}`;
                        }
                        
                        api.sendMessage(msg, threadID);
                    });
                }
            }
        });
    } else {
        nicknameMonitoring.delete(threadID);
        api.sendMessage("❌ تم إيقاف مراقبة كنيات الأعضاء في هذه المجموعة", threadID);
    }
};
