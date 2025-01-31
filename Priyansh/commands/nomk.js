const fs = require("fs");
const request = require("request");
const { join } = require("path");

module.exports.config = {
  name: "لوجر",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Modified by: ǺᎩᎧᏬᏰ",
  description: "عرض معلومات المجموعة",
  commandCategory: "📊 المعلومات 📊",
  cooldowns: 5,
};

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.run = async function({ api, event }) {
  const threadID = event.threadID;
  
  try {
    // جلب معلومات المجموعة
    const threadInfo = await api.getThreadInfo(threadID);
    const participantIDs = threadInfo.participantIDs;
    
    // جلب معلومات المستخدمين
    let userInfo = {};
    try {
      userInfo = await api.getUserInfo(participantIDs);
    } catch (e) {
      console.error("خطأ في جلب معلومات المستخدمين:", e);
    }

    // إحصائيات الرسائل
    let messageStats = {};
    if (threadInfo.messageCount) {
      for (const id in threadInfo.messageCount) {
        messageStats[id] = threadInfo.messageCount[id];
      }
    }

    // ترتيب المستخدمين حسب عدد الرسائل
    let topUsers = Object.entries(messageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([id, count], index) => {
        const name = userInfo[id] ? userInfo[id].name : "مستخدم غير معروف";
        return `${index + 1}. ${name}: ${formatNumber(count)} رسالة`;
      })
      .join('\n');

    // تجميع قائمة المشرفين
    let adminList = "";
    try {
      if (threadInfo.adminIDs) {
        adminList = threadInfo.adminIDs
          .map(admin => userInfo[admin.id] ? userInfo[admin.id].name : "مشرف غير معروف")
          .join('، ');
      }
    } catch (e) {
      adminList = "غير متوفر";
    }

    const infoMessage = `
╭────────❍
│ 📊 معلومات المجموعة
├────────❍
│ 👥 اسم المجموعة: ${threadInfo.threadName || "غير متوفر"}
│ 👤 عدد الأعضاء: ${formatNumber(participantIDs.length)}
│ 📈 المضافين: ${formatNumber(threadInfo.approvalQueue ? threadInfo.approvalQueue.length : 0)}
│ 📉 المغادرين: ${formatNumber(threadInfo.messageCount || 0)}
│ 💬 عدد الرسائل: ${formatNumber(threadInfo.messageCount || 0)}
├────────❍
│ 👑 المشرفين:
│ ${adminList || "لا يوجد"}
├────────❍
│ 🏆 الأكثر نشاطاً:
│ ${topUsers || "لا توجد إحصائيات"}
├────────❍
│ ⚙️ إعدادات المجموعة:
│ 🔐 وضع الموافقة: ${threadInfo.approvalMode ? "✅" : "❌"}
│ 🎮 الألعاب: ${threadInfo.isGroup ? "✅" : "❌"}
╰────────❍`;

    // إرسال صورة المجموعة مع المعلومات
    if (threadInfo.imageSrc) {
      const imgPath = join(__dirname, "cache", "groupImage.png");
      
      request(threadInfo.imageSrc)
        .pipe(fs.createWriteStream(imgPath))
        .on("close", () => {
          api.sendMessage(
            {
              body: infoMessage,
              attachment: fs.createReadStream(imgPath)
            },
            threadID,
            (error, info) => {
              if (error) {
                api.sendMessage("❌ حدث خطأ في إرسال الصورة", threadID);
                console.error(error);
              }
              if (fs.existsSync(imgPath)) {
                fs.unlinkSync(imgPath);
              }
            }
          );
        })
        .on("error", (err) => {
          console.error("خطأ في تحميل الصورة:", err);
          api.sendMessage(infoMessage, threadID);
        });
    } else {
      api.sendMessage(infoMessage, threadID);
    }

  } catch (error) {
    console.error("خطأ رئيسي:", error);
    api.sendMessage("⚠️ عذراً، حدث خطأ أثناء جلب معلومات المجموعة", threadID);
  }
};
