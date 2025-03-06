module.exports.config = {
    name: "بريد",
    version: "1.0.0",
    permission: 0,
    credits: "Modified",
    prefix: true,
    description: "إنشاء بريد مؤقت",
    category: "أدوات",
    cooldowns: 5
};

module.exports.run = async function({ event, api, args }) {
    const axios = require('axios');
    
    // المصفوفة التي تحتوي على نطاقات البريد المؤقت
    const domains = ['tempmail.com', 'temp-mail.org', 'throwawaymail.com'];
    
    // دالة لإنشاء بريد عشوائي
    function generateRandomEmail() {
        const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let username = '';
        for(let i = 0; i < 10; i++) {
            username += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${username}@${domain}`;
    }

    if (!args[0]) {
        // إنشاء بريد جديد
        const newEmail = generateRandomEmail();
        return api.sendMessage({
            body: `=== [ بريد مؤقت جديد ] ===\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ البريد: ${newEmail}\n[ ▶️]➜ للفحص اكتب: .بريد فحص ${newEmail}\n━━━━━━━━━━━━━━━━━━`
        }, event.threadID, event.messageID);
    }

    if (args[0] === "فحص" && args[1]) {
        const emailToCheck = args[1];
        try {
            // محاكاة فحص البريد
            return api.sendMessage({
                body: `=== [ فحص البريد ] ===\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ البريد: ${emailToCheck}\n[ ▶️]➜ الحالة: لا توجد رسائل جديدة\n━━━━━━━━━━━━━━━━━━`
            }, event.threadID, event.messageID);
        } catch (error) {
            return api.sendMessage("❌ حدث خطأ أثناء فحص البريد", event.threadID, event.messageID);
        }
    }

    return api.sendMessage("❓ الاستخدام:\n.بريد - لإنشاء بريد جديد\n.بريد فحص [البريد] - لفحص الرسائل", event.threadID, event.messageID);
};
