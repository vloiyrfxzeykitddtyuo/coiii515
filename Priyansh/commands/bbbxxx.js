module.exports.config = {
    name: "ترحيب",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "إرسال رسالة ترحيب عند إضافة عضو جديد",
    commandCategory: "المطور",
    usages: "",
    cooldowns: 0
};

module.exports.run = async function({ api, event }) {
    const { threadID, senderID } = event;

    // تحقق مما إذا كان الحدث هو إضافة عضو جديد
    if (event.type === "add_member") {
        const welcomeMessage = `
👋 أهلا وسهلا بك في مجموعة SCP!
نحن سعداء بانضمامك إلينا. 

✨ نرجو منك الالتزام بقوانين المجموعة:
1. الاحترام المتبادل.
2. عدم نشر المحتوى غير اللائق.
3. المشاركة بأفكار بناءة.

نتمنى لك وقتًا ممتعًا هنا!

إذا كان لديك أي استفسارات، لا تتردد في طرحها.`;

        // إرسال رسالة الترحيب
        api.sendMessage(welcomeMessage, threadID);
    }
};
