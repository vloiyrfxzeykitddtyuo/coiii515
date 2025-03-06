module.exports.config = {
    name: "بريد",
    version: "1.0.0",
    permission: 0,
    credits: "Modified by Claude",
    prefix: true,
    description: "إنشاء وإدارة البريد المؤقت",
    category: "أدوات",
    cooldowns: 5
};

module.exports.run = async function({ event, api, args }) {
    const axios = global.nodemodule['axios'];
    const fs = global.nodemodule["fs-extra"];

    const generateEmail = async () => {
        try {
            const response = await axios.get("رابط1", {
                params: {
                    action: "genRandomMailbox",
                    count: "https://www.1secmail.com/api/v1/"
                },
                headers: {
                    'User-Agent': "okhttp/3.9.1",
                    'Accept-Encoding': "gzip"
                }
            });
            return response.data.split('["')[1].split('"]')[0];
        } catch (error) {
            return null;
        }
    };

    const checkMessages = async (email) => {
        try {
            const [name, domain] = email.split('@');
            const response = await axios.get("https://www.1secmail.com/api/v1/", {
                params: {
                    action: "getMessages",
                    login: name,
                    domain: domain
                },
                headers: {
                    'User-Agent': "okhttp/3.9.1",
                    'Accept-Encoding': "gzip"
                }
            });
            return response.data;
        } catch (error) {
            return [];
        }
    };

    if (!args[0]) {
        const email = await generateEmail();
        if (email) {
            api.sendMessage({
                body: `=== [ بريد مؤقت جديد ] ===\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ البريد: ${email}\n━━━━━━━━━━━━━━━━━━`
            }, event.threadID, event.messageID);

            // Start checking for messages
            const checkInterval = setInterval(async () => {
                const messages = await checkMessages(email);
                for (const msg of messages) {
                    api.sendMessage({
                        body: `=== [ رسالة جديدة ] ===\n━━━━━━━━━━━━━━━━━━\n[ ▶️]➜ من: ${msg.from}\n[ ▶️]➜ الموضوع: ${msg.subject}\n[ ▶️]➜ المحتوى: ${msg.text || "لا يوجد محتوى"}\n━━━━━━━━━━━━━━━━━━`
                    }, event.threadID);
                }
            }, 5000);

            // Clear interval after 10 minutes
            setTimeout(() => clearInterval(checkInterval), 600000);
        } else {
            api.sendMessage("❌ حدث خطأ في إنشاء البريد", event.threadID, event.messageID);
        }
    } else if (args[0] === "فحص") {
        const email = args[1];
        if (!email) {
            api.sendMessage("❌ يرجى تحديد البريد المراد فحصه", event.threadID, event.messageID);
            return;
        }

        const messages = await checkMessages(email);
        if (messages.length > 0) {
            let response = "=== [ الرسائل الواردة ] ===\n━━━━━━━━━━━━━━━━━━\n";
            messages.forEach(msg => {
                response += `[ ▶️]➜ من: ${msg.from}\n[ ▶️]➜ الموضوع: ${msg.subject}\n[ ▶️]➜ المحتوى: ${msg.text || "لا يوجد محتوى"}\n━━━━━━━━━━━━━━━━━━\n`;
            });
            api.sendMessage(response, event.threadID, event.messageID);
        } else {
            api.sendMessage("لا توجد رسائل جديدة", event.threadID, event.messageID);
        }
    }
};
