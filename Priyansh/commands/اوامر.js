module.exports.config = {
    name: "اوامر",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "قائمة الأوامر المتاحة",
    commandCategory: "النظام",
    usages: "اوامر",
    cooldowns: 5,
    dependencies: {
        "request": "",
        "fs-extra": "",
        "axios": ""
    }
};

module.exports.run = async({ api, event, args, client, Users, Threads, __GLOBAL, Currencies }) => {
    const axios = global.nodemodule["axios"];
    const request = global.nodemodule["request"];
    const fs = global.nodemodule["fs-extra"];
    var botImages = [
        "https://c.top4top.io/p_3321gyhhl0.gif",
        // يمكنك إضافة المزيد من روابط الصور هنا
    ];
    
    var message = `
┏━━━❰ ✧ 𝗦𝗨𝗭𝗬 𝗕𝗢𝗧 ✧ ❱━━━┓

★°. ┊   قائمة الأوامر الخاصة   ┊ .°★
┊°· ┊     بالبوت سوزي     ┊ ·°┊
★·°·٠•●❤●•٠·°·★

✧༺❀༻✧ الأوامر الترفيهية ✧༺❀༻✧
┏━━━━━━━━━━━━━━━┓
┣ ⋆ ˚｡⋆୨୧˚ انمي ˚୨୧⋆｡˚ ⋆
┣ ⋆ ˚｡⋆୨୧˚ صورة ˚୨୧⋆｡˚ ⋆
┣ ⋆ ˚｡⋆୨୧˚ غناء ˚୨୧⋆｡˚ ⋆
┗━━━━━━━━━━━━━━━┛

✧༺❀༻✧ أوامر المجموعة ✧༺❀༻✧
┏━━━━━━━━━━━━━━━┓
┣ ⊹ ࣪ ˖ ݁ تاك ݁ ˖ ࣪ ⊹
┣ ⊹ ࣪ ˖ ݁ قوانين ݁ ˖ ࣪ ⊹
┣ ⊹ ࣪ ˖ ݁ تنظيف ݁ ˖ ࣪ ⊹
┗━━━━━━━━━━━━━━━┛

✧༺❀༻✧ معلومات البوت ✧༺❀༻✧
┏━━━━━━━━━━━━━━━┓
┣ ✿ اسم البوت: 𝙎𝙐𝙕𝙔
┣ ✿ البادئة: سوزي
┣ ✿ المطور: احمد عجينة
┣ ✿ الإصدار: 1.0.0
┗━━━━━━━━━━━━━━━┛

✧༺❀༻✧ طريقة الاستخدام ✧༺❀༻✧
استخدم "سوزي + الأمر" 
مثال: سوزي انمي

┗━━━❰ ❤️‍🔥 ❱━━━┛`;

    var sendMessage = () => api.sendMessage({body: message, attachment: fs.createReadStream(__dirname + "/cache/botmenu.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/botmenu.jpg"), event.messageID);
    return request(encodeURI(botImages[Math.floor(Math.random() * botImages.length)])).pipe(fs.createWriteStream(__dirname + "/cache/botmenu.jpg")).on("close", () => sendMessage());
};
