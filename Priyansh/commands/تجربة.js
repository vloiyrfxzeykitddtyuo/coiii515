module.exports.config = {
    name: "مراقبة الكنية",
    version: "1.0.0",
    hasPermssion: 2, // تأكد من أن لديك التصريح المناسب
    credits: "احمد عجينة",
    description: "تنبيه عند تغيير كنية أحد الأعضاء",
    commandCategory: "إدارة",
    usages: "مراقبة الكنية",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    // يتم تخزين معرفات الأعضاء وكنياتهم
    const members = {};
    
    // الحصول على قائمة الأعضاء في المجموعة
    api.getThreadInfo(event.threadID, (err, info) => {
        if (err) return console.error(err);
        
        info.participantIDs.forEach(memberId => {
            members[memberId] = info.names[memberId];
        });

        // مراقبة التغييرات
        api.listen((event) => {
            if (event.logMessageType === 'log:subscribe') {
                const newMemberId = event.logMessageData.addedParticipants[0].userFBID;
                const newMemberName = event.logMessageData.addedParticipants[0].fullName;
                members[newMemberId] = newMemberName;
            }
            if (event.logMessageType === 'log:unsubscribe') {
                const removedMemberId = event.logMessageData.leftParticipantFbId;
                delete members[removedMemberId];
            }
            if (event.logMessageType === 'log:thread-name') {
                const changedMemberId = event.logMessageData.senderFbId;
                const oldName = members[changedMemberId];
                const newName = event.logMessageData.threadName;

                if (oldName !== newName) {
                    const notificationMessage = `تنبيه: تغيرت كنية ${oldName} إلى ${newName}.`;
                    api.sendMessage(notificationMessage, event.threadID);
                    members[changedMemberId] = newName; // تحديث الكنية
                }
            }
        });
    });
};
