module.exports.config = {
  name: "جوان",
  version: "3.1.2",
  hasPermssion: 0,
  credits: "احمد عجينة",
  description: "رد تلقائي على كلمة جوان",
  commandCategory: "نظام",
  usages: "",
  cooldowns: 5,
  dependencies: {
      "axios": "",
      "fs-extra": "",
      "path": "",
      "jimp": ""
  }
};

module.exports.onLoad = async() => {
  const { resolve } = global.nodemodule["path"];
  const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
  const { downloadFile } = global.utils;
  const dirMaterial = __dirname + `/cache/canvas/`;
  const path = resolve(__dirname, 'cache/canvas', 'jawan.jpg');
  if (!existsSync(dirMaterial + "canvas")) mkdirSync(dirMaterial, { recursive: true });
  if (!existsSync(path)) await downloadFile("https://up6.cc/2025/01/173807054441831.jpg", path);
}

module.exports.handleEvent = async function({ api, event }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID, body } = event;
  
  if (body && (body.toLowerCase().includes("ءجوان") || body.toLowerCase().includes("جوان"))) {
    const path = __dirname + `/cache/canvas/jawan.jpg`;
    
    api.sendMessage({
      body: "شنو تريد منها 👈🏻👉🏻🔪",
      attachment: fs.createReadStream(path)
    }, threadID, messageID);
  }
};

module.exports.run = async function({ api, event }) {
  const fs = global.nodemodule["fs-extra"];
  const { threadID, messageID } = event;
  const path = __dirname + `/cache/canvas/jawan.jpg`;
  
  api.sendMessage({
    body: "شنو تريد منها 👈🏻👉🏻🔪",
    attachment: fs.createReadStream(path)
  }, threadID, messageID);
};
