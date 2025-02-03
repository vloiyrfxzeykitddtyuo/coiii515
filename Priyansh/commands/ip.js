module.exports.config = {
    name: "زخرفة",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "أحمد",
    description: "أنماط تزيين النصوص",
    commandCategory: "مرح",
    usages: "تزيين [النص]",
    cooldowns: 5,
};

module.exports.run = async({ api, event, args }) => {
    const text = args.join(" ");
    
    if (!text) {
        return api.sendMessage(`💠 أنماط تزيين النص 💠\n\nيرجى استخدام: !تزيين [نصك]\n\nمثال: !تزيين مرحبا\n\nاختر النمط:\n1. 𝓢𝓽𝔂𝓵𝓮 𝓞𝓷𝓮\n2. 𝕊𝕥𝕪𝕝𝕖 𝕋𝕨𝕠\n3. S̲t̲y̲l̲e̲ T̲h̲r̲e̲e̲\n4. ᔕTYᒪE ᖴOᑌᖇ\n5. 𝐒𝐭𝐲𝐥𝐞 𝐅𝐢𝐯𝐞\n\nرد برقم 1-5 لاختيار النمط.`, event.threadID);
    }

    const style = event.body.split(" ")[0];
    
    const styleOne = text.split("").map(char => {
        const fancy = {
            'a': '𝓪', 'b': '𝓫', 'c': '𝓬', 'd': '𝓭', 'e': '𝓮', 'f': '𝓯', 'g': '𝓰', 'h': '𝓱',
            'i': '𝓲', 'j': '𝓳', 'k': '𝓴', 'l': '𝓵', 'm': '𝓶', 'n': '𝓷', 'o': '𝓸', 'p': '𝓹',
            'q': '𝓺', 'r': '𝓻', 's': '𝓼', 't': '𝓽', 'u': '𝓾', 'v': '𝓿', 'w': '𝔀', 'x': '𝔁',
            'y': '𝔂', 'z': '𝔃', 'A': '𝓐', 'B': '𝓑', 'C': '𝓒', 'D': '𝓓', 'E': '𝓔', 'F': '𝓕',
            'G': '𝓖', 'H': '𝓗', 'I': '𝓘', 'J': '𝓙', 'K': '𝓚', 'L': '𝓛', 'M': '𝓜', 'N': '𝓝',
            'O': '𝓞', 'P': '𝓟', 'Q': '𝓠', 'R': '𝓡', 'S': '𝓢', 'T': '𝓣', 'U': '𝓤', 'V': '𝓥',
            'W': '𝓦', 'X': '𝓧', 'Y': '𝓨', 'Z': '𝓩'
        };
        return fancy[char] || char;
    }).join("");

    const styleTwo = text.split("").map(char => {
        const fancy = {
            'a': '𝕒', 'b': '𝕓', 'c': '𝕔', 'd': '𝕕', 'e': '𝕖', 'f': '𝕗', 'g': '𝕘', 'h': '𝕙',
            'i': '𝕚', 'j': '𝕛', 'k': '𝕜', 'l': '𝕝', 'm': '𝕞', 'n': '𝕟', 'o': '𝕠', 'p': '𝕡',
            'q': '𝕢', 'r': '𝕣', 's': '𝕤', 't': '𝕥', 'u': '𝕦', 'v': '𝕧', 'w': '𝕨', 'x': '𝕩',
            'y': '𝕪', 'z': '𝕫', 'A': '𝔸', 'B': '𝔹', 'C': 'ℂ', 'D': '𝔻', 'E': '𝔼', 'F': '𝔽',
            'G': '𝔾', 'H': 'ℍ', 'I': '𝕀', 'J': '𝕁', 'K': '𝕂', 'L': '𝕃', 'M': '𝕄', 'N': 'ℕ',
            'O': '𝕆', 'P': 'ℙ', 'Q': 'ℚ', 'R': 'ℝ', 'S': '𝕊', 'T': '𝕋', 'U': '𝕌', 'V': '𝕍',
            'W': '𝕎', 'X': '𝕏', 'Y': '𝕐', 'Z': 'ℤ'
        };
        return fancy[char] || char;
    }).join("");

    const styleThree = text.split("").map(char => char + '\u0332').join("");

    const styleFour = text.split("").map(char => {
        const fancy = {
            'a': 'ᗩ', 'b': 'ᗷ', 'c': 'ᑕ', 'd': 'ᗪ', 'e': 'E', 'f': 'ᖴ', 'g': 'G', 'h': 'ᕼ',
            'i': 'I', 'j': 'ᒍ', 'k': 'K', 'l': 'ᒪ', 'm': 'ᗰ', 'n': 'ᑎ', 'o': 'O', 'p': 'ᑭ',
            'q': 'ᑫ', 'r': 'ᖇ', 's': 'ᔕ', 't': 'T', 'u': 'ᑌ', 'v': 'ᐯ', 'w': 'ᗯ', 'x': '᙭',
            'y': 'Y', 'z': 'ᘔ', 'A': 'ᗩ', 'B': 'ᗷ', 'C': 'ᑕ', 'D': 'ᗪ', 'E': 'E', 'F': 'ᖴ',
            'G': 'G', 'H': 'ᕼ', 'I': 'I', 'J': 'ᒍ', 'K': 'K', 'L': 'ᒪ', 'M': 'ᗰ', 'N': 'ᑎ',
            'O': 'O', 'P': 'ᑭ', 'Q': 'ᑫ', 'R': 'ᖇ', 'S': 'ᔕ', 'T': 'T', 'U': 'ᑌ', 'V': 'ᐯ',
            'W': 'ᗯ', 'X': '᙭', 'Y': 'Y', 'Z': 'ᘔ'
        };
        return fancy[char] || char;
    }).join("");

    const styleFive = text.split("").map(char => {
        const fancy = {
            'a': '𝐚', 'b': '𝐛', 'c': '𝐜', 'd': '𝐝', 'e': '𝐞', 'f': '𝐟', 'g': '𝐠', 'h': '𝐡',
            'i': '𝐢', 'j': '𝐣', 'k': '𝐤', 'l': '𝐥', 'm': '𝐦', 'n': '𝐧', 'o': '𝐨', 'p': '𝐩',
            'q': '𝐪', 'r': '𝐫', 's': '𝐬', 't': '𝐭', 'u': '𝐮', 'v': '𝐯', 'w': '𝐰', 'x': '𝐱',
            'y': '𝐲', 'z': '𝐳', 'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅',
            'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌', 'N': '𝐍',
            'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕',
            'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
        };
        return fancy[char] || char;
    }).join("");

    let response = "";
    switch(args[0]) {
        case "1":
            response = styleOne;
            break;
        case "2":
            response = styleTwo;
            break;
        case "3":
            response = styleThree;
            break;
        case "4":
            response = styleFour;
            break;
        case "5":
            response = styleFive;
            break;
        default:
            response = `🎀 نصك بأنماط مختلفة:\n\n1. ${styleOne}\n2. ${styleTwo}\n3. ${styleThree}\n4. ${styleFour}\n5. ${styleFive}\n\nلاستخدام نمط محدد، اكتب: !تزيين [الرقم] [النص]`;
    }

    return api.sendMessage(response, event.threadID, event.messageID);
};
