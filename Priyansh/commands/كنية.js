module.exports.config = {
    name: "مراقبة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Modified by Claude",
    description: "مراقبة تغييرات كنيات الأعضاء",
    commandCategory: "المجموعة",
    usages: "مراقبة",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.handleEvent = async function({ api, event }) {
    if (event.type === "change_thread_nickname") {
        const { threadID, author, participantIDs, nickname } = event;
        
        // Get user info
        const userInfo = await api.getUserInfo(author);
        const authorName = userInfo[author].name;
        
        // Get changed user info
        const changedUserInfo = await api.getUserInfo(participantIDs[0]);
        const changedUserName = changedUserInfo[participantIDs[0]].name;

        let msg = "";
        if (!nickname) {
            msg = `🔔 تنبيه: قام ${authorName} بحذف كنية ${changedUserName}`;
        } else {
            msg = `🔔 تنبيه: قام ${authorName} بتغيير كنية ${changedUserName} إلى: ${nickname}`;
        }

        const alertImage = "https://up6.cc/2025/02/173843076665791.jpg"; // Alert icon image
        
        let stream = await global.utils.getStreamFromURL(alertImage);
        api.sendMessage({
            body: msg,
            attachment: stream
        }, threadID);
    }
};

module.exports.run = async function({ api, event }) {
    const { threadID } = event;
    
    // Activation message
    const activationMsg = "✅ تم تفعيل نظام مراقبة كنيات الأعضاء في المجموعة";
    const alertImage = "https://up6.cc/2025/02/173843076665791.jpg"; // Alert icon image
    
    let stream = await global.utils.getStreamFromURL(alertImage);
    return api.sendMessage({
        body: activationMsg,
        attachment: stream
    }, threadID);
};
