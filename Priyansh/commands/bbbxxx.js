module.exports.config = {
    name: "القوانين",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "احمد عجينة",
    description: "اقتراحات انمي",
    commandCategory: "ترفية",
    usages: "ا",
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
    var ZiaRein = [
"https://up6.cc/2025/01/17380993985011.jpg",
    ];
    var ZiaRein2 = () => api.sendMessage({body: `◈ ──────『✇』────── ◈

قــوانــيـن SCP

◈ ──────『✇』────── ◈

1-يلزم على الكل وضع الشعار بشكل واضح وبحجم مناسب
‼️يستحسن أن يتجاوز حجم الشعار نسبة 23٪

2-يمنع المزاح خارج الحدود او تقليل احترام الاخرين بحجة المزاح: طرد (1) ساعات

3- يمنع العبث بإعدادات المجموعة ( الاكواد والاسم والصورة): طرد (42) ساعة

4- يمنع التحدث أثناء غلق الشات: طرد (2) ساعات

5- يمنع مقاطعة المسؤولين اثناء الاجتماعات: طرد (2) ساعات

6- يمنع عمل تاغ لمسؤولي الاتحاد والانبو ومسؤولي الفريق بدون سبب : تحذير يلحقه طرد

7-السب والشتم +18: طرد ودخول السجن

8-التحدث عن الفرق الأخرى بسوء : طرد (3) ساعة

9-التكلم عن الأديان والسياسة بتعصب: تحذير يلحقه طرد

10-حذف رسائل بدون سكرين:طرد (6) ساعة

11-سبام ممنوع نهائيا: طرد (72) ساعة (تنخفض العقوبة او تزيد حسب السبام)

12-التشفير بالرسائل ممنوع منعا باتا : طرد (3) ساعة

13-يمنع ارسال أي شيء مخل بالحياء كيف ما كان نوعه : طرد (24) ساعة

14-يمنع ارسال الصور الشخصية : تحذير يلحقه خصم نقاط`, attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);
    return request(encodeURI(ZiaRein[Math.floor(Math.random() * ZiaRein.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};
