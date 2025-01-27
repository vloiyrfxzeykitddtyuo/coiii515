module.exports.config = {
	name: "ايدي",	
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "عرض معلومات IP الخاص بك أو IP آخر", 
	commandCategory: "اخرى",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, args, event, __GLOBAL }) {
  const timeStart = Date.now();
  
    const axios = require("axios");
  if (!args[0]) {api.sendMessage("الرجاء إدخال عنوان IP الذي تريد فحصه",event.threadID, event.messageID);}
  else {
var infoip = (await axios.get(`http://ip-api.com/json/${args.join(' ')}?fields=66846719`)).data;
       if (infoip.status == 'fail')
         {api.sendMessage(`خطأ! حدث خطأ. يرجى المحاولة مرة أخرى لاحقاً: ${infoip.message}`, event.threadID, event.messageID)}
          else {
            /////////////////
          //////////////////
 api.sendMessage({body:`======${(Date.now()) - timeStart} ميلي ثانية=====
 🗺️القارة: ${infoip.continent}
🏳️الدولة: ${infoip.country}
🎊رمز الدولة: ${infoip.countryCode}
🕋المنطقة: ${infoip.region}
⛱️المحافظة/الولاية: ${infoip.regionName}
🏙️المدينة: ${infoip.city}
🛣️الحي: ${infoip.district}
📮الرمز البريدي: ${infoip.zip}
🧭خط العرض: ${infoip.lat}
🧭خط الطول: ${infoip.lon}
⏱️المنطقة الزمنية: ${infoip.timezone}
👨‍✈️اسم المنظمة: ${infoip.org}
💵العملة: ${infoip.currency}
`,location: {
				latitude: infoip.lat,
				longitude: infoip.lon,
				current: true
			}}
,event.threadID, event.messageID);}
        }
    
                  }
