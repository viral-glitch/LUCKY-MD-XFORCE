const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");

// Load stickers JSON
const stickersPath = path.join(__dirname, "fredie/autosticker.json");
let stickersData = {};
try {
  if (fs.existsSync(stickersPath)) {
    const raw = fs.readFileSync(stickersPath, "utf-8");
    stickersData = JSON.parse(raw);
  }
} catch (err) {
  console.error("Failed to read autosticker.json:", err);
}

ezra({
  nomCom: "auto-sticker",
  categorie: "Fun-Fredi",
  reaction: "🎯"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg, body, reply } = commandeOptions;

  if ((conf.AUTO_STICKER || "").toLowerCase() !== "yes") return;

  const textMsg = body?.toLowerCase();
  if (!textMsg) return;

  for (const keyword in stickersData) {
    if (textMsg.includes(keyword.toLowerCase())) {
      const stickerPath = path.resolve(stickersData[keyword]);

      if (fs.existsSync(stickerPath)) {
        await zk.sendMessage(origineMessage, {
          sticker: fs.readFileSync(stickerPath)
        }, { quoted: ms });

        console.log(`✅ Sent sticker for keyword "${keyword}"`);
        break;
      } else {
        console.warn(`❌ Sticker file not found: ${stickerPath}`);
      }
    }
  }
});
