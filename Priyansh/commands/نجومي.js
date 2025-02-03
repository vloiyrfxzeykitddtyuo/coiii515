module.exports.config = {
    name: "نجومي",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Modified by Claude",
    description: "يظهر اسمك وعدد نجومك",
    commandCategory: "العاب",
    usages: "",
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    // استبدل هذه القيمة بعدد نجوم المستخدم
    const userStars = 100; // يمكنك تغيير هذا الرقم بناءً على عدد النجوم الفعلي للمستخدم
    const userName = event.senderID; // يمكنك استبدال هذا برمز لجلب اسم المستخدم من فيسبوك إذا كان متاحًا

    const message = `🎉 مرحبًا ${userName} 🎉\nلديك ${userStars} نجوم! ⭐`;

    api.sendMessage(message, event.threadID);
};
