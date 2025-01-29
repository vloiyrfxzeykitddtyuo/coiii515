module.exports.config = {
  name: "معلومات",
  version: "1.0.1",
  hasPermssion: 0,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "معلومات الأدمن والبوت",
  commandCategory: "...", 
  cooldowns: 1,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async function({ api,event,args,client,Users,Threads,__GLOBAL,Currencies }) {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];
const time = process.uptime(),
    hours = Math.floor(time / (60 * 60)),
    minutes = Math.floor((time % (60 * 60)) / 60),
    seconds = Math.floor(time % 60);
const moment = require("moment-timezone");
var juswa = moment.tz("Asia/Riyadh").format("『D/MM/YYYY』 【HH:mm:ss】");
var link = ["https://i.imghippo.com/files/lJ8376Tkc.jpg"];

var callback = () => api.sendMessage({body:╾━╤デ╦︻(▀ Ĺ‌▀   ) معلومات الأدمن والبوت 

⚡️ اسم البوت ⚡️ ${global.config.BOTNAME}

👑 مشرف البوت 👑 ابو عباس 

🌟 رابط حساب المشرف على فيسبوك 🌟
https://github.com/ekekwlwlelel/mo50mo60.git

📱 للمساعدة تواصل معنا على تيليجرام 📱
@

✧══════•❁❀❁•══════✧

⚙️ بادئة البوت ⚙️ ${global.config.PREFIX}

👨‍💻 مالك البوت 👨‍💻 ابو عباس البغدادي 

⏰ معلومات التشغيل ⏰

📅 اليوم: ${juswa}

⚡️ البوت يعمل منذ: ${hours}:${minutes}:${seconds}

✨ شكراً لاستخدامك بوت ${global.config.BOTNAME} ✨

༺════ •⊰❉⊱• ════༻
           المطور: ابو عباس البغدادي 
༺════ •⊰❉⊱• ════༻

,attachment: fs.createReadStream(dirname + "/cache/juswa.jpg")}, event.threadID, () => fs.unlinkSync(dirname + "/cache/juswa.jpg"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/juswa.jpg")).on("close",() => callback());
   };
