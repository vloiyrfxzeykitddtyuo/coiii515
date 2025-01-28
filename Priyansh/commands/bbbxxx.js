module.exports.config = {
    name: "welcome",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "YourName",
    description: "Send a welcome message to new group members",
    commandCategory: "other",
    usages: "",
    cooldowns: 5,
    dependencies: "",
};

module.exports.run = async function({ api, event }) {
    const newMember = event.author;
    const groupName = "SCP"; // Change this to your group name

    api.sendMessage(`Welcome, ${newMember.name} to the ${groupName} group! 🎉\nWe are glad to have you here. Please remember to respect others and enjoy your time in the group.`, event.threadID);
};
