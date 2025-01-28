module.exports.config = {
	name: "welcome",	
	version: "1.0.0", 
	hasPermission: 0,
	credits: "NTKhang",
	description: "Send a welcome message when a new member joins the group", 
	commandCategory: "other",
	usages: "",
	cooldowns: 5, 
	dependencies: "",
};

module.exports.run = async function({ api, event }) {
	const welcomeMessage = `✨ أهلا وسهلا بك في مجموعة SCP! ✨\n\nنحن سعداء بانضمامك إلينا. نتمنى أن تستمتع بوقتك هنا.\n\nيرجى الالتزام بقوانين المجموعة واحترام الجميع. \n\nإذا كان لديك أي أسئلة، لا تتردد في طرحها! 😊`;
	
	// إرسال رسالة الترحيب إلى المجموعة
	api.sendMessage(welcomeMessage, event.threadID);
};
