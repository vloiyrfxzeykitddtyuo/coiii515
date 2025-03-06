module.exports.config = {
    name: "بريد",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "ALRAES",
    description: "إنشاء بريد مؤقت",
    commandCategory: "أدوات",
    usages: "بريد / سوبر / [رقم البريد]",
    cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
    const fs = require('fs');
    const axios = require('axios');
    
    // دالة لتحميل البريدات المؤقتة
    const loadTempEmails = () => {
        try {
            const data = fs.readFileSync('temp_emails.json', 'utf8');
            return JSON.parse(data);
        } catch (error) {
            return {};
        }
    };
    
    // دالة لحفظ البريدات المؤقتة
    const saveTempEmails = (emails) => {
        fs.writeFileSync('temp_emails.json', JSON.stringify(emails));
    };
    
    // دالة لإنشاء بريد مؤقت
    const generateTempEmail = async () => {
        try {
            const url = "https://www.1secmail.com/api/v1/";
            const params = {
                action: "genRandomMailbox",
                count: "1"
            };
            const headers = {
                'User-Agent': "okhttp/3.9.1",
                'Accept-Encoding': "gzip"
            };
            
            const response = await axios.get(url, { params, headers });
            return response.data[0];
        } catch (error) {
            console.error("خطأ في إنشاء البريد:", error);
            return null;
        }
    };
    
    // دالة لتحديث الرسائل
    const refreshMessages = async (email) => {
        try {
            const name = email.split('@')[0];
            const domain = email.split('@')[1];
            
            const url = "https://www.1secmail.com/api/v1/";
            const params = {
                action: "getMessages",
                login: name,
                domain: domain
            };
            const headers = {
                'User-Agent': "okhttp/3.9.1",
                'Accept-Encoding': "gzip"
            };
            
            const response = await axios.get(url, { params, headers });
            return response.data;
        } catch (error) {
            console.error("خطأ في تحديث الرسائل:", error);
            return [];
        }
    };
    
    // التعامل مع الأوامر
    const userId = event.senderID;
    const command = args[0];
    const tempEmails = loadTempEmails();
    
    // إذا لم يكن هناك أي معلومات للمستخدم، أنشئ مصفوفة فارغة
    if (!tempEmails[userId]) {
        tempEmails[userId] = {
            emails: [],
            currentEmail: null
        };
    }
    
    // إذا كان الأمر "سوبر" أو لم يكن هناك أمر وليس هناك بريد حالي
    if (command === "سوبر" || (!command && !tempEmails[userId].currentEmail)) {
        api.sendMessage("⏳ | جاري إنشاء بريد جديد...", event.threadID);
        
        const newEmail = await generateTempEmail();
        if (newEmail) {
            tempEmails[userId].emails.push(newEmail);
            tempEmails[userId].currentEmail = newEmail;
            saveTempEmails(tempEmails);
            
            api.sendMessage(`✅ | تم إنشاء بريد جديد:\n📧 ${newEmail}\n\nℹ️ استخدم 'بريد [رقم البريد]' للتحقق من الرسائل.`, event.threadID);
        } else {
            api.sendMessage("❌ | حدث خطأ أثناء إنشاء البريد.", event.threadID);
        }
        return;
    }
    
    // إذا كان الأمر رقم (للتحقق من رسائل بريد معين)
    if (command && !isNaN(command)) {
        const emailIndex = parseInt(command) - 1;
        if (emailIndex >= 0 && emailIndex < tempEmails[userId].emails.length) {
            const selectedEmail = tempEmails[userId].emails[emailIndex];
            tempEmails[userId].currentEmail = selectedEmail;
            saveTempEmails(tempEmails);
            
            api.sendMessage(`📬 | جاري التحقق من رسائل البريد:\n📧 ${selectedEmail}...`, event.threadID);
            
            const messages = await refreshMessages(selectedEmail);
            if (messages.length > 0) {
                let messageText = `📬 | رسائل البريد ${selectedEmail}:\n━━━━━━━━━━━━\n`;
                
                messages.forEach((msg, index) => {
                    messageText += `📩 رسالة ${index + 1}:\n`;
                    messageText += `👤 من: ${msg.from}\n`;
                    messageText += `📑 الموضوع: ${msg.subject}\n`;
                    messageText += `⏰ التاريخ: ${msg.date}\n`;
                    messageText += `━━━━━━━━━━━━\n`;
                });
                
                api.sendMessage(messageText, event.threadID);
            } else {
                api.sendMessage(`📭 | لا توجد رسائل في البريد ${selectedEmail}`, event.threadID);
            }
        } else {
            api.sendMessage("❌ | رقم البريد غير صحيح.", event.threadID);
        }
        return;
    }
    
    // عرض قائمة البريدات
    let emailsList = `📋 | قائمة البريدات (${tempEmails[userId].emails.length}):\n━━━━━━━━━━━━\n`;
    
    if (tempEmails[userId].emails.length > 0) {
        tempEmails[userId].emails.forEach((email, index) => {
            emailsList += `${index + 1}. ${email}\n`;
        });
        emailsList += `━━━━━━━━━━━━\nℹ️ استخدم 'بريد سوبر' لإنشاء بريد جديد أو 'بريد [رقم البريد]' للتحقق من الرسائل.`;
    } else {
        emailsList += "لا توجد بريدات. استخدم 'بريد سوبر' لإنشاء بريد جديد.";
    }
    
    api.sendMessage(emailsList, event.threadID);
};
