module.exports.config = {
    name: "زيادة",
    version: "0.0.1",
    permission: 2,
    credits: "احمد عجينة",
    prefix: true,
    description: "زيادة الرصيد",
    category: "اسـتــرو",
    cooldowns: 5
};

module.exports.run = async function({ event, api, args, client, Currencies, Users, utils, __GLOBAL }) {
    var mention = Object.keys(event.mentions)[0];
    var content = args.join(" ");
    var sender = content.slice(0, content.lastIndexOf(" "));
    var moneySet = content.substring(content.lastIndexOf(" ") + 1);

    if (args[0] == 'رصيدي') {
        return api.sendMessage(`تم اضافة ${moneySet} الى رصيدك `, event.threadID, 
            () => Currencies.increaseMoney(event.senderID, parseInt(moneySet)), event.messageID);
    }
    else if (args[0] == "del") {
        if (args[1] == 'me') {
            const moneyme = (await Currencies.getData(event.senderID)).money;
            api.sendMessage(`✅تم حذف كل أموالك \n💸 المبلغ المراد حذفه هو ${moneyme}.`, event.threadID, 
                async () => await Currencies.decreaseMoney(event.senderID, parseInt(moneyme)));
        }
        else if (Object.keys(event.mentions).length == 1) {
            const moneydel = (await Currencies.getData(mention)).money;
            api.sendMessage(`✅تمت إزالة كامل مبلغ ${event.mentions[mention].replace("@", "")} المبلغ المحذوف هو ${moneydel}.`, event.threadID, 
                async () => await Currencies.decreaseMoney(mention, parseInt(moneydel)));
        }
        else return api.sendMessage("خطأ في الصيغة", event.threadID, event.messageID);
    }
    else if (Object.keys(event.mentions).length == 1) {
        return api.sendMessage({
            body: (`تم زيادة رصيد ${event.mentions[mention].replace("@", "")} ألى ${moneySet} دولار .`),
            mentions: [{
                tag: event.mentions[mention].replace("@", ""),
                id: mention
            }]
        }, event.threadID, 
            async () => Currencies.increaseMoney(mention, parseInt(moneySet)), event.messageID);
    }
    else if (args[0] == "UID") {
        var id = args[1];
        var cut = args[2];
        let nameeee = (await Users.getData(id)).name;
        return api.sendMessage(`تم تغيير رصيد ${nameeee} الى ${cut} دولار`, event.threadID, 
            () => Currencies.increaseMoney(id, parseInt(cut)), event.messageID);
    }
    else {
        api.sendMessage("خطأ في بناء الجملة", event.threadID, event.messageID);
    }
}

