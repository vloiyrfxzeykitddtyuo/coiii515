module.exports.config = {
	name: "botStats",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
	description: "Show bot stats in the group",
	commandCategory: "Group",
	usages: "[bot ID]",
	cooldowns: 5,
};

module.exports.run = async ({ event, api, args, Users }) => {
	const botID = event.senderID; // ID البوت
	if (!botID) return api.sendMessage("يرجى إدخال ID صحيح للبوت.", event.threadID, event.messageID);

	// الحصول على بيانات التفاعل
	const userStats = await Users.getData(botID);
	const interactions = userStats.interactions || 0; // عدد التفاعلات
	const messagesSent = userStats.messagesSent || 0; // عدد الرسائل
	const balance = userStats.balance || 0; // الرصيد
	const activeHours = userStats.activeHours || 0; // ساعات النشاط

	const responseMessage = `إحصائيات البوت:\n` +
		`عدد التفاعلات: ${interactions}\n` +
		`عدد الرسائل: ${messagesSent}\n` +
		`الرصيد: ${balance}\n` +
		`ساعات النشاط: ${activeHours}`;

	return api.sendMessage(responseMessage, event.threadID, event.messageID);
};
