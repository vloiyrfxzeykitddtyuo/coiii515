module.exports.config = {
    name: "روليت",
    version: "1.0.0",
    permission: 0,
    credits: "Assistant",
    prefix: true,
    description: "لعبة عجلة الروليت الفخمة",
    category: "الألعاب",
    cooldowns: 10
};

module.exports.run = async function({ api, event, args, Currencies }) {
    const { threadID, senderID, messageID } = event;
    
    const rewards = [
        { value: 2, text: "ربحت ضعف المبلغ! 💰" },
        { value: 0, text: "خسرت رهانك! 💸" }
    ];

    // التحقق من الرهان
    const betAmount = parseInt(args[0]);
    if (!betAmount || isNaN(betAmount) || betAmount < 1) {
        return api.sendMessage(
            "⚠️ الرجاء إدخال مبلغ الرهان!\nمثال: روليت 5", 
            threadID, messageID
        );
    }

    // التحقق من رصيد المستخدم
    const userMoney = (await Currencies.getData(senderID)).money;
    if (userMoney < betAmount) {
        return api.sendMessage(
            "❌ عذراً، رصيدك غير كافي للرهان بهذا المبلغ!", 
            threadID, messageID
        );
    }

    // إرسال رسالة البداية
    api.sendMessage(
        "🎰 جارِ تدوير عجلة الحظ...\n⏳ انتظر النتيجة...", 
        threadID,
        async () => {
            // تأخير 3 ثواني
            await new Promise(resolve => setTimeout(resolve, 3000));

            // اختيار نتيجة عشوائية (50% فرصة للربح و 50% للخسارة)
            const result = rewards[Math.random() < 0.5 ? 0 : 1];
            let winAmount = result.value * betAmount;
            let finalAmount = result.value === 0 ? -betAmount : betAmount;

            // إنشاء رسالة النتيجة
            let resultMessage = "🎲 نتيجة الروليت 🎲\n";
            resultMessage += "━━━━━━━━━━━━━━━━━━\n";
            resultMessage += `👤 النتيجة: ${result.text}\n`;
            
            if (result.value === 0) {
                resultMessage += `📌 خسرت: ${betAmount} دولار\n`;
            } else {
                resultMessage += `💰 ربحت: ${winAmount} دولار\n`;
                resultMessage += `📊 صافي الربح: ${finalAmount} دولار\n`;
            }
            resultMessage += "━━━━━━━━━━━━━━━━━━";

            // تحديث رصيد المستخدم
            await Currencies.increaseMoney(senderID, finalAmount);

            // إرسال النتيجة
            api.sendMessage(resultMessage, threadID);
        }
    );
};
