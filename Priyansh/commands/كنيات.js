module.exports.config = {
    name: "مراقبة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "عباس البغدادي",
    description: "مراقبة تغييرات الكنيات في المجموعة",
    commandCategory: "نظام",
    usages: "مراقبة",
    cooldowns: 5
};

// متغير لتخزين حالة المراقبة (مفعلة أم لا)
let isMonitoring = false;

module.exports.run = async({ api, event }) => {
    const { threadID, messageID } = event;
    
    // تبديل حالة المراقبة
    isMonitoring = !isMonitoring;
    
    if (isMonitoring) {
        return api.sendMessage("✅ جار مراقبة نظام الكنيات في المجموعة", threadID, messageID);
    } else {
        return api.sendMessage("❌ تم إيقاف مراقبة نظام الكنيات", threadID, messageID);
    }
};

module.exports.handleEvent = async({ api, event }) => {
    // التحقق من نوع الحدث وما إذا كانت المراقبة مفعلة
    if (event.type !== "change_thread_nickname" || !isMonitoring) return;
    
    const { threadID, author, participantIDs, nickname } = event;
    
    try {
        // الحصول على معلومات المستخدم الذي تم تغيير كنيته
        const targetUser = participantIDs[0];
        
        // الحصول على معلومات المستخدمين
        const userInfo = await api.getUserInfo([author, targetUser]);
        
        const authorName = userInfo[author].name;
        const targetName = userInfo[targetUser].name;
        
        let message = "";
        
        // إذا قام الشخص بتغيير كنيته الخاصة
        if (author === targetUser) {
            message = `⚠️ تنبيه: قام ${authorName} بتغيير كنيته إلى "${nickname || 'لا توجد كنية'}"`;
        } else {
            message = `⚠️ تنبيه: قام ${authorName} بتغيير كنية ${targetName} إلى "${nickname || 'لا توجد كنية'}"`;
        }
        
        // إرسال الإشعار في المجموعة
        return api.sendMessage(message, threadID);
    } catch (error) {
        console.error("خطأ في معالجة تغيير الكنية:", error);
    }
};
