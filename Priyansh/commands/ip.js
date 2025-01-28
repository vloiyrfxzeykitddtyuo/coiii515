module.exports.config = {
    name: "هايبر",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "إرسال رسالة إلى جميع المجموعات",
    commandCategory: "المطور",
    usages: "[الرسالة]",
    cooldowns: 500
};

module.exports.run = async function({ api, event, args }) {
    const { threadID, messageID, senderID } = event;
    const devID = "100015903097543"; // ايدي المطور
    
    if (senderID != devID) {
        return api.sendMessage("⚠️ | عذراً، هذا الأمر مخصص للمطور فقط.", threadID, messageID);
    }

    if (args.length == 0) {
        return api.sendMessage("⚠️ | يرجى كتابة الرسالة التي تريد إرسالها.", threadID, messageID);
    }

    const message = args.join(" ");
    const getCurrentTime = () => {
        const now = new Date();
        const days = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
        const day = days[now.getDay()];
        const date = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${day} ${date}/${month}/${year} - ${hours}:${minutes}`;
    };

    const formattedMessage = `
╭━━━━━━━━━━━━━╮
    رسالة من المطور
╰━━━━━━━━━━━━━╯
👤 | المطور: 『اﺳﹷﹻواٰﭑد ﹷﹻ』
🆔 | الحساب: https://www.facebook.com/100015903097543

📝 | الرسالة:
${message}

⏰ | التاريخ والوقت:
${getCurrentTime()}
━━━━━━━━━━━━━━━`;

    let count = 0;
    const allThreads = await api.getThreadList(100, null, ["INBOX"]);
    const filteredThreads = allThreads.filter(thread => thread.isGroup);

    api.sendMessage(`⏳ | جارِ إرسال الرسالة إلى ${filteredThreads.length} مجموعة...`, threadID);

    for (const thread of filteredThreads) {
        try {
            await api.sendMessage(formattedMessage, thread.threadID);
            count++;
            await new Promise(resolve => setTimeout(resolve, 1000)); // تأخير ثانية واحدة بين كل رسالة
        } catch (error) {
            console.error(`Failed to send message to thread ${thread.threadID}:`, error);
        }
    }

    api.sendMessage(`✅ | تم إرسال الرسالة بنجاح إلى ${count} مجموعة.`, threadID);
};
