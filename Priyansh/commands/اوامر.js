module.exports.config = {
    name: "اوامر",
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
"https://c.top4top.io/p_3321gyhhl0.gif",
    ];
    var message = `♕|══━══━≼❈≽━══━══|♕
   ⚜️ SUZY BOT ⚜️  
♕|══━══━≼❈≽━══━══
✦| قـائـمـة الأوامــر |✦
╭──➤
│ ✧ ⏐ فارغة
│✧  ⏐ فارعة
│ ✧ ⏐ فارغة
╰──➤

❈|════════════|❈

💠| مـعـلـومـات الـبـوت |💠
◈ اسم البوت: سوزي
◈ البريفكس: سوزي
◈ الأوامر المتاحة: 0

❈|════════════|❈`;

    var ZiaRein2 = () => api.sendMessage({body: message, attachment: fs.createReadStream(__dirname + "/cache/ZiaRein1.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/ZiaRein1.jpg"), event.messageID);
    return request(encodeURI(ZiaRein[Math.floor(Math.random() * ZiaRein.length)])).pipe(fs.createWriteStream(__dirname + "/cache/ZiaRein1.jpg")).on("close", () => ZiaRein2());
};
