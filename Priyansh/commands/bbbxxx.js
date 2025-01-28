module.exports.config = {
    name: "rules",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "YourName",
    description: "Display the rules of the SCP group with an image",
    commandCategory: "other",
    usages: "",
    cooldowns: 5,
    dependencies: "",
};

module.exports.run = async function({ api, event }) {
    const rules = `
◈ ──────『✇』────── ◈
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

14-يمنع ارسال الصور الشخصية : تحذير يلحقه خصم نقاط
`;

    const imageUrl = "https://up6.cc/2025/01/17380993985011.jpg"; // Replace this with the actual image URL

    api.sendMessage({ body: rules, attachment: [api.attachmentUploadUrl(imageUrl)], location: { latitude: 0, longitude: 0 } }, event.threadID);
};
