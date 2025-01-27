module.exports.config = {
	name: "reminder",
	version: "1.0.0", 
	hasPermssion: 0,
	credits: "NTKhang",
	description: "Random reminders to send prayers upon Muhammad and his family",
	commandCategory: "other",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

const reminders = [
    "اللهم صل على محمد وآل محمد.",
    "صلاة وسلام عليك يا رسول الله.",
    "اللهم صل على أفضل خلقك محمد.",
    "اللهم اجعل صلاتنا على محمد وآل محمد شفيعة لنا يوم القيامة.",
    "صلاة على النبي الذي أرسله الله رحمة للعالمين.",
    "اللهم صل على من أنزلت عليه الكتاب.",
    "اللهم صل على محمد وآل محمد كما صليت على إبراهيم.",
    "اللهم صل على محمد وآل محمد في الأولى والآخرة."
];

module.exports.run = async function({ api, event }) {
    setInterval(() => {
        const randomReminder = reminders[Math.floor(Math.random() * reminders.length)];
        api.sendMessage(randomReminder, event.threadID);
    }, 60000); // 60 seconds
};
