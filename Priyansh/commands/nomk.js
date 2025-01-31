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

function getTopUsers(stats, type, limit = 5) {
  const sortedUsers = Object.entries(stats)
    .sort(([, a], [, b]) => b[type] - a[type])
    .slice(0, limit);
  return sortedUsers;
}

async function getThreadInfo(api, threadID) {
  try {
    const threadInfo = await api.getThreadInfo(threadID);
    const participantIDs = threadInfo.participantIDs;
    const userInfo = await api.getUserInfo(participantIDs);

    // تجميع إحصائيات المستخدمين
    const stats = {};
    threadInfo.userInfo.forEach(user => {
      stats[user.id] = {
        name: user.name,
        messages: 0,
        reactions: 0
      };
    });

    // حساب عدد الرسائل والتفاعلات
    if (threadInfo.messageCount) {
      Object.values(threadInfo.messageCount).forEach(count => {
        if (stats[count.id]) {
          stats[count.id].messages = count.count;
        }
      });
    }

    // الحصول على أكثر المستخدمين نشاطاً
    const topActive = getTopUsers(stats, 'messages')
      .map(([id, data], index) => `${index + 1}. ${data.name}: ${formatNumber(data.messages)} رسالة`)
      .join('\n');

    const adminList = threadInfo.adminIDs.map(admin => userInfo[admin.id].name).join('، ');

    const infoMessage = `
╭──────────────────╮
│    📊 معلومات المجموعة 📊    │
╰──────────────────╯

👥 اسم المجموعة: ${threadInfo.threadName}
👤 عدد الأعضاء: ${formatNumber(participantIDs.length)}
📈 إجمالي الأعضاء المضافين: ${formatNumber(threadInfo.approvalMode ? threadInfo.approvalQueue.length : 0)}
📉 عدد المغادرين: ${formatNumber(threadInfo.memberLeaveCount || 0)}
💬 عدد الرسائل: ${formatNumber(threadInfo.messageCount)}
👑 المشرفين: ${adminList}

🏆 الأكثر نشاطاً:
${topActive}

⚙️ إعدادات المجموعة:
🔐 وضع الموافقة: ${threadInfo.approvalMode ? "مفعل" : "معطل"}
🎮 الألعاب: ${threadInfo.isGroup ? "مسموحة" : "غير مسموحة"}
`;

    // تحميل وإرسال صورة المجموعة مع المعلومات
    if (threadInfo.imageSrc) {
      const imgPath = join(__dirname, "cache", "groupImage.png");
      request(threadInfo.imageSrc).pipe(fs.createWriteStream(imgPath)).on("close", () => {
        api.sendMessage({
          body: infoMessage,
          attachment: fs.createReadStream(imgPath)
        }, threadID, () => fs.unlinkSync(imgPath));
      });
    } else {
      api.sendMessage(infoMessage, threadID);
    }

  } catch (error) {
    console.error(error);
    api.sendMessage(`⚠️ حدث خطأ: ${error.message}`, threadID);
  }
}

module.exports.run = async function({ api, event }) {
  await getThreadInfo(api, event.threadID);
};

