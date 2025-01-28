module.exports.config = {
    name: "welcome",	
    version: "1.0.0", 
    hasPermssion: 0,
    credits: "YourName", // ضع اسمك هنا
    description: "Send a welcome message when a new member joins the group", 
    commandCategory: "group",
    usages: "",
    cooldowns: 5, 
    dependencies: "",
};

module.exports.run = async function({ api, event, Users }) {
    // تحقق من نوع الحدث إذا كان يتعلق بإضافة عضو جديد
    if (event.logMessageType === "log:subscribe") {
        const addedMembers = event.logMessageData.addedParticipants;

        // إذا تمت إضافة أعضاء جدد إلى المجموعة
        for (const member of addedMembers) {
            const userId = member.userFbId;
            const userName = member.fullName || "عضو جديد";

            // الحصول على اسم العضو من قاعدة بيانات المستخدمين
            const userInfo = await Users.getData(userId);
            const userNameFromDB = userInfo.name || userName;

            // إرسال رسالة ترحيب
            api.sendMessage(
                `🌟 أهلاً وسهلاً بك، ${userNameFromDB}! 🌟\n\nمرحباً بك في مجموعة SCP.\n\n⚠️ الرجاء الالتزام بقوانين المجموعة واحترام الجميع. نتمنى لك وقتاً ممتعاً معنا! 😊`,
                event.threadID
            );
        }
    }
};
