module.exports.config = {
	name: "rank",
	version: "2.1.0",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
	description: "View Member Rankings and Activity Stats",
	commandCategory: "Group",
	usages: " [user] or [tag] or [botID]",
	cooldowns: 5,
	dependencies: {
		"fs-extra": "",
		"path": "",
		"jimp": "",
		"node-superfetch": "",
		"canvas": ""
	}
};

module.exports.makeRankCard = async (data) => {    
    /*
    * 
    * Remake from Canvacord
    * 
    */

    const fs = global.nodemodule["fs-extra"];
    const path = global.nodemodule["path"];
	const Canvas = global.nodemodule["canvas"];
	const request = global.nodemodule["node-superfetch"];
	const __root = path.resolve(__dirname, "cache");
	const PI = Math.PI;

    const { id, name, rank, level, expCurrent, expNextLevel } = data;

	Canvas.registerFont(__root + "/regular-font.ttf", {
		family: "Manrope",
		weight: "regular",
		style: "normal"
	});
	Canvas.registerFont(__root + "/bold-font.ttf", {
		family: "Manrope",
		weight: "bold",
		style: "normal"
	});

	const pathCustom = path.resolve(__dirname, "cache", "customrank");
	var customDir = fs.readdirSync(pathCustom);
	var dirImage = __root + "/rankcard.png";
	customDir = customDir.map(item => item.replace(/\.png/g, ""));

	for (singleLimit of customDir) {
		var limitRate = false;
		const split = singleLimit.split(/-/g);
		var min = parseInt(split[0]), max = parseInt((split[1]) ? split[1] : min);
	
		for (; min <= max; min++) {
			if (level == min) {
				limitRate = true;
				break;
			}
		}

		if (limitRate == true) {
			dirImage = pathCustom + `/${singleLimit}.png`;
			break;
		}
	}

	let rankCard = await Canvas.loadImage(dirImage);
	const pathImg = __root + `/rank_${id}.png`;
	
	var expWidth = (expCurrent * 610) / expNextLevel;
	if (expWidth > 610 - 19.5) expWidth = 610 - 19.5;
	
	let avatar = await request.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);

	avatar = await this.circle(avatar.body);

	const canvas = Canvas.createCanvas(1000, 282);
	const ctx = canvas.getContext("2d");

	ctx.drawImage(rankCard, 0, 0, canvas.width, canvas.height);
	ctx.drawImage(await Canvas.loadImage(avatar), 70, 75, 150, 150);

	ctx.font = `bold 36px Manrope`;
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "start";
	ctx.fillText(name, 270, 164);
	ctx.font = `42px Manrope`;
	ctx.fillStyle = "#FF7F24";
	ctx.textAlign = "center";

	ctx.font = `bold 38px Manrope`;
	ctx.fillStyle = "#FF0000";
	ctx.textAlign = "end";
	ctx.fillText(level, 934 - 68, 82);
	ctx.fillStyle = "#FF0000";
	ctx.fillText("Lv.", 934 - 55 - ctx.measureText(level).width - 10, 82);

	ctx.font = `bold 39px Manrope`;
	ctx.fillStyle = "#FF0000";
	ctx.textAlign = "end";
	ctx.fillText(rank, 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 25, 82);
	ctx.fillStyle = "#FF0000";
	ctx.fillText("#", 934 - 55 - ctx.measureText(level).width - 16 - ctx.measureText(`Lv.`).width - 16 - ctx.measureText(rank).width - 16, 82);

	ctx.font = `bold 40px Manrope`;
	ctx.fillStyle = "#1874CD";
	ctx.textAlign = "start";
	ctx.fillText("/ " + expNextLevel, 710 + ctx.measureText(expCurrent).width + 10, 164);
	ctx.fillStyle = "#00BFFF";
	ctx.fillText(expCurrent, 710, 164);

	ctx.beginPath();
	ctx.fillStyle = "#FFB90F";
	ctx.arc(257 + 18.5, 147.5 + 18.5 + 36.25, 18.5, 1.5 * PI, 0.5 * PI, true);
	ctx.fill();
	ctx.fillRect(257 + 18.5, 147.5 + 36.25, expWidth, 37.5);
	ctx.arc(257 + 18.5 + expWidth, 147.5 + 18.5 + 36.25, 18.75, 1.5 * PI, 0.5 * PI, false);
	ctx.fill();

	const imageBuffer = canvas.toBuffer();
	fs.writeFileSync(pathImg, imageBuffer);
	return pathImg;
}

module.exports.circle = async (image) => {
    const jimp = global.nodemodule["jimp"];
	image = await jimp.read(image);
	image.circle();
	return await image.getBufferAsync("image/png");
}

module.exports.expToLevel = (point) => {
	if (point < 0) return 0;
	return Math.floor((Math.sqrt(1 + (4 * point) / 3) + 1) / 2);
}

module.exports.levelToExp = (level) => {
	if (level <= 0) return 0;
	return 3 * level * (level - 1);
}

module.exports.getInfo = async (uid, Currencies) => {
	let point = (await Currencies.getData(uid)).exp;
	const level = this.expToLevel(point);
	const expCurrent = point - this.levelToExp(level);
	const expNextLevel = this.levelToExp(level + 1) - this.levelToExp(level);
	return { level, expCurrent, expNextLevel };
}

// New function to get user activity stats
module.exports.getUserStats = async (uid, threadID, api, Currencies, Users) => {
    try {
        // Get user data
        const userData = await Users.getData(uid);
        const currencyData = await Currencies.getData(uid);
        
        // Get message count in the group
        const messageCount = userData.totalMsg || 0;
        
        // Get interaction count (reactions, shares, etc.)
        const interactionCount = userData.totalInteractions || 0;
        
        // Get user balance/credit
        const balance = currencyData.money || 0;
        
        // Calculate active hours (this is a sample implementation)
        // You might need to adapt this based on your actual data structure
        const activeHours = {};
        if (userData.activeTime) {
            Object.keys(userData.activeTime).forEach(hour => {
                activeHours[hour] = userData.activeTime[hour];
            });
        }
        
        // Format activity hours for display
        let activityHoursText = "";
        if (Object.keys(activeHours).length > 0) {
            const sortedHours = Object.entries(activeHours)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);
            
            activityHoursText = sortedHours.map(([hour, count]) => 
                `${hour}:00 - ${parseInt(hour) + 1}:00 (${count} messages)`
            ).join("\n");
        } else {
            activityHoursText = "No activity data available";
        }
        
        return {
            messageCount,
            interactionCount,
            balance,
            activityHoursText
        };
    } catch (error) {
        console.error("Error getting user stats:", error);
        return {
            messageCount: 0,
            interactionCount: 0,
            balance: 0,
            activityHoursText: "Error retrieving activity data"
        };
    }
}

module.exports.onLoad = async function () {
	const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
	const path = resolve(__dirname, "cache", "customrank");
    if (!existsSync(path)) mkdirSync(path, { recursive: true });

    if (!existsSync(resolve(__dirname, 'cache', 'regular-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/regular-font.ttf", resolve(__dirname, 'cache', 'regular-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'bold-font.ttf'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/fonts/bold-font.ttf", resolve(__dirname, 'cache', 'bold-font.ttf'));
	if (!existsSync(resolve(__dirname, 'cache', 'rankcard.png'))) await downloadFile("https://raw.githubusercontent.com/catalizcs/storage-data/master/rank/rank_card/rankcard.png", resolve(__dirname, 'cache', 'rankcard.png'));
}

module.exports.run = async ({ event, api, args, Currencies, Users }) => {
	const fs = global.nodemodule["fs-extra"];
	
	let dataAll = (await Currencies.getAll(["userID", "exp"]));
	const mention = Object.keys(event.mentions);
    
    // Check if user typed the bot's ID to see their activity stats
    if (args.length > 0 && args[0].toLowerCase() === global.botID) {
        const userStats = await this.getUserStats(event.senderID, event.threadID, api, Currencies, Users);
        const userName = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
        
        const statsMessage = `📊 Activity Stats for ${userName} 📊\n\n` + 
                           `🔹 Messages: ${userStats.messageCount}\n` +
                           `🔹 Interactions: ${userStats.interactionCount}\n` +
                           `🔹 Balance: ${userStats.balance}\n\n` +
                           `⏰ Most Active Hours:\n${userStats.activityHoursText}`;
        
        return api.sendMessage(statsMessage, event.threadID, event.messageID);
    }

	dataAll.sort((a, b) => {
		if (a.exp > b.exp) return -1;
		if (a.exp < b.exp) return 1;
	});

	if (args.length == 0) {
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(event.senderID)) + 1;
		const name = global.data.userName.get(event.senderID) || await Users.getNameUser(event.senderID);
		if (rank == 0) return api.sendMessage("Error❌ Please try again in 5 seconds.", event.threadID, event.messageID);
		const point = await this.getInfo(event.senderID, Currencies);
		const timeStart = Date.now();
		let pathRankCard = await this.makeRankCard({ id: event.senderID, name, rank, ...point })
		return api.sendMessage({body: `${Date.now() - timeStart}`, attachment: fs.createReadStream(pathRankCard, {'highWaterMark': 128 * 1024}) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length == 1) {
		const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(mention[0])) + 1;
		const name = global.data.userName.get(mention[0]) || await Users.getNameUser(mention[0]);
		if (rank == 0) return api.sendMessage("Error❌ Please try again in 5 seconds.", event.threadID, event.messageID);
		let point = await this.getInfo(mention[0], Currencies);
		let pathRankCard = await this.makeRankCard({ id: mention[0], name, rank, ...point })
		return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
	}
	if (mention.length > 1) {
		for (const userID of mention) {
			const rank = dataAll.findIndex(item => parseInt(item.userID) == parseInt(userID)) + 1;
			const name = global.data.userName.get(userID) || await Users.getNameUser(userID);
			if (rank == 0) return api.sendMessage("Error❌ Please try again in 5 seconds.", event.threadID, event.messageID);
			let point = await this.getInfo(userID, Currencies);
			let pathRankCard = await this.makeRankCard({ id: userID, name, rank, ...point })
			return api.sendMessage({ attachment: fs.createReadStream(pathRankCard) }, event.threadID, () => fs.unlinkSync(pathRankCard), event.messageID);
		}
	}
}
