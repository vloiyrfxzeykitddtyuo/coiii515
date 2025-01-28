module.exports.config = {
    name: "welcome",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "الترحيب بالأعضاء الجدد تلقائياً",
    commandCategory: "النظام",
    usages: "",
    cooldowns: 1
};

module.exports.run = async function({ api, event }) {};

module.exports.handleEvent = async function({ api, event }) {
    if (event.logMessageType !== "log:subscribe") return;
    
    const { threadID } = event;
    const { participantIDs } = await api.getThreadInfo(threadID);
    
    // الحصول على معرف العضو الجديد
    const newMemberID = event.logMessageData.addedParticipants[0].userFbId;
    
    // الحصول على معلومات العضو الجديد
    const userInfo = await api.getUserInfo(newMemberID);
    const userName = userInfo[newMemberID].name;

    // رسالة الترحيب
    const welcomeMessage = `
╔════ஜ۩۞۩ஜ═══╗
    أهلاً وسهلاً بك
╚════ஜ۩۞۩ஜ═══╝

مرحباً بك ${userName} في مجموعة SCP 🌟

نرجو منك قراءة وإتباع القواعد التالية:
━━━━━━━━━━━━━━━
1️⃣ احترام جميع الأعضاء والمشرفين
2️⃣ عدم نشر محتوى غير لائق
3️⃣ الالتزام بقوانين المجموعة
4️⃣ المشاركة الإيجابية والتفاعل البناء
5️⃣ تجنب المشاكل والنزاعات

📌 يمكنك كتابة "قوانين" لمعرفة القوانين كاملة
📱 للتواصل مع الإدارة يرجى استخدام "@admin"

عدد أعضاء المجموعة: ${participantIDs.length} عضو 👥

نتمنى لك وقتاً ممتعاً معنا! 🌹
━━━━━━━━━━━━━━━`;

    // صورة الترحيب (استبدل الرابط بصورة الترحيب الخاصة بك)
    const welcomeImage = "https://example.com/welcome-image.jpg";

    // إرسال رسالة الترحيب مع الصورة
    try {
        await api.sendMessage({
            body: welcomeMessage,
            attachment: await global.utils.getStreamFromURL(welcomeImage)
        }, threadID);
    } catch (error) {
        // إذا فشل تحميل الصورة، سيتم إرسال رسالة الترحيب فقط
        await api.sendMessage(welcomeMessage, threadID);
    }
};
