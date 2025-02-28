module.exports.config = {
    name: "emoji",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 - تعريب",
    description: "تشفير الرسائل إلى رموز تعبيرية والعكس",
    commandCategory: "أدوات",
    usages: "emoji en <نص>\nأو\nemoji de <نص>",
    cooldowns: 5
};

module.exports.run = async ({ event, api, args }) => {
    var text = args.slice(1).join(" ");
    var type = args[0];
        if (type == 'encode' || type == "en") {
            text = text.replace(/ا/g, "😀");
            text = text.replace(/ب/g, "😃");
            text = text.replace(/ت/g, "😁");
            text = text.replace(/ث/g, "😅");
            text = text.replace(/ج/g, "🥰");
            text = text.replace(/ح/g, "🤣");
            text = text.replace(/خ/g, "🥲");
            text = text.replace(/د/g, "☺️");
            text = text.replace(/ذ/g, "😊");
            text = text.replace(/ر/g, "😇");
            text = text.replace(/ز/g, "😉");
            text = text.replace(/س/g, "😒");
            text = text.replace(/ش/g, "😞");
            text = text.replace(/ص/g, "😙");
            text = text.replace(/ض/g, "😟");
            text = text.replace(/ط/g, "😕");
            text = text.replace(/ظ/g, "🙂");
            text = text.replace(/ع/g, "🙃");
            text = text.replace(/غ/g, "☹️");
            text = text.replace(/ف/g, "😡");
            text = text.replace(/ق/g, "😍");
            text = text.replace(/ك/g, "😩");
            text = text.replace(/ل/g, "😭");
            text = text.replace(/م/g, "😳");
            text = text.replace(/ن/g, "😠");
            text = text.replace(/ه/g, "😎");
            text = text.replace(/و/g, "🤔");
            text = text.replace(/ي/g, "😴");
            text = text.replace(/ء/g, "🤨");
            text = text.replace(/ؤ/g, "🤢");
            text = text.replace(/ئ/g, "🤗");
            text = text.replace(/ة/g, "😱");
            text = text.replace(/أ/g, "😄");
            text = text.replace(/إ/g, "😆");
            text = text.replace(/آ/g, "😝");
            text = text.replace(/ى/g, "😋");
            text = text.replace(/ /g, "."); // استبدال المسافة بنقطة
 
            return api.sendMessage(text, event.threadID, event.messageID);
        }
        else if (type == 'decode' || type == "de") {
            text = text.replace(/😀/g, "ا");
            text = text.replace(/😃/g, "ب");
            text = text.replace(/😁/g, "ت");
            text = text.replace(/😅/g, "ث");
            text = text.replace(/🥰/g, "ج");
            text = text.replace(/🤣/g, "ح");
            text = text.replace(/🥲/g, "خ");
            text = text.replace(/☺️/g, "د");
            text = text.replace(/😊/g, "ذ");
            text = text.replace(/😇/g, "ر");
            text = text.replace(/😉/g, "ز");
            text = text.replace(/😒/g, "س");
            text = text.replace(/😞/g, "ش");
            text = text.replace(/😙/g, "ص");
            text = text.replace(/😟/g, "ض");
            text = text.replace(/😕/g, "ط");
            text = text.replace(/🙂/g, "ظ");
            text = text.replace(/🙃/g, "ع");
            text = text.replace(/☹️/g, "غ");
            text = text.replace(/😡/g, "ف");
            text = text.replace(/😍/g, "ق");
            text = text.replace(/😩/g, "ك");
            text = text.replace(/😭/g, "ل");
            text = text.replace(/😳/g, "م");
            text = text.replace(/😠/g, "ن");
            text = text.replace(/😎/g, "ه");
            text = text.replace(/🤔/g, "و");
            text = text.replace(/😴/g, "ي");
            text = text.replace(/🤨/g, "ء");
            text = text.replace(/🤢/g, "ؤ");
            text = text.replace(/🤗/g, "ئ");
            text = text.replace(/😱/g, "ة");
            text = text.replace(/😄/g, "أ");
            text = text.replace(/😆/g, "إ");
            text = text.replace(/😝/g, "آ");
            text = text.replace(/😋/g, "ى");
            text = text.replace(/\./g, ' '); // استبدال النقطة بمسافة
            
            return api.sendMessage(text, event.threadID, event.messageID);
        }
        else {return api.sendMessage("صيغة خاطئة\nemoji en <نص>\nأو\nemoji de <نص>", event.threadID, event.messageID)}
  
  }
