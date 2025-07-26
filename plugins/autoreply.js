const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");

const repliesPath = path.join(__dirname, "../fredie/autoreply.json");
let repliesData = {};
try {
  if (fs.existsSync(repliesPath)) {
    const raw = fs.readFileSync(repliesPath, "utf-8");
    repliesData = JSON.parse(raw);
  }
} catch (err) {
  console.error("Failed to read autoreply.json:", err);
}

ezra({
  nomCom: "auto-reply",
  categorie: "Fun-Fredi",
  reaction: "🤖"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, body } = commandeOptions;

  if ((conf.GREET_MESSAGE || "").toLowerCase() !== "yes") return;
  const msgText = body?.toLowerCase();
  if (!msgText) return;

  for (const keyword in repliesData) {
    if (msgText.includes(keyword.toLowerCase())) {
      const replyText = repliesData[keyword];
      await zk.sendMessage(origineMessage, { text: replyText }, { quoted: ms });
      console.log(`✅ Replied with auto message for keyword: "${keyword}"`);
      break;
    }
  }
});
