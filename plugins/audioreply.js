const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const path = require("path");

const audioReplyPath = path.join(__dirname, "fredie/audioreply.json");
let audioData = {};

try {
  if (fs.existsSync(audioReplyPath)) {
    const raw = fs.readFileSync(audioReplyPath, "utf-8");
    audioData = JSON.parse(raw);
  }
} catch (err) {
  console.error("Failed to read audioreply.json:", err);
}

ezra({
  nomCom: "audio-reply",
  categorie: "Fun-Fredi",
  reaction: "🎧"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, body } = commandeOptions;

  if ((conf.AUDIO_REPLY || "").toLowerCase() !== "yes") return;
  const msgText = body?.toLowerCase();
  if (!msgText) return;

  for (const keyword in audioData) {
    if (msgText.includes(keyword.toLowerCase())) {
      const audioFilePath = path.join(__dirname, "audios", audioData[keyword]);
      if (!fs.existsSync(audioFilePath)) return;

      await zk.sendMessage(
        origineMessage,
        {
          audio: fs.readFileSync(audioFilePath),
          mimetype: 'audio/mp4',
          ptt: true
        },
        { quoted: ms }
      );

      console.log(`🎤 Replied with audio for keyword: "${keyword}"`);
      break;
    }
  }
});
