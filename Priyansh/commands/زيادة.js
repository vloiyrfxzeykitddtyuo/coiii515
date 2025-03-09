module.exports.config = {
    name: "بريد",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "إنشاء بريد إلكتروني عشوائي",
    commandCategory: "ترفية",
    usages: "بريد",
    cooldowns: 5,
};

const axios = require('axios');

module.exports.run = async ({ api, event }) => {
    // رابط موقع انشاء البريد
    const emailApiUrl = "https://temp-mail.org/ar/";
    
    // إرسال رسالة "جاري انشاء البريد"
    api.sendMessage("🔍 | جاري إنشاء بريد إلكتروني، انتظر قليلاً...", event.threadID);

    // انتظار 3 ثواني
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
        // إرسال طلب لإنشاء بريد إلكتروني
        const response = await axios.get(`${emailApiUrl}?action=genRandomMailbox&count=1`);
        const email = response.data[0];

        // إرسال البريد الإلكتروني الناتج
        api.sendMessage(`📧 تم إنشاء البريد الإلكتروني: ${email}`, event.threadID);
    } catch (error) {
        api.sendMessage("❌ فشل في إنشاء البريد الإلكتروني.", event.threadID);
    }
};
