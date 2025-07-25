const { ezra } = require("../fredi/ezra");
const fs = require("fs");
const conf = require("../set"); // Assume conf.WARN_COUNT is defined here

let antiTagActive = false;
let actionMode = ""; // 'delete' | 'remove' | 'warn'
const warns = {}; // Store warn counts by user

ezra({
  nomCom: "anti-tag",
  categorie: "Group-Fredi",
  reaction: "🚫"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg, groupe, auteurMsg } = commandeOptions;

  if (!groupe) {
    await zk.sendMessage(origineMessage, "❌ This command works in groups only!");
    return;
  }

  // Handle turn ON/OFF
  if (arg[0]) {
    const status = arg[0].toLowerCase();
    if (status === "on") {
      antiTagActive = true;

      const menu = `🔐 *Anti-Tag is ON* \nChoose action on tag:\n\n1️⃣ Delete Message\n2️⃣ Remove User\n3️⃣ Warn User\n\n_Reply with a number_`;
      await zk.sendMessage(origineMessage, menu);
      return;
    } else if (status === "off") {
      antiTagActive = false;
      actionMode = "";
      await zk.sendMessage(origineMessage, "🛑 Anti-Tag has been turned OFF.");
      return;
    }
  }

  // Handle replies to choose mode
  if (antiTagActive && ms.message?.conversation && !actionMode && ["1", "2", "3"].includes(ms.message.conversation.trim())) {
    const choice = ms.message.conversation.trim();
    if (choice === "1") actionMode = "delete";
    else if (choice === "2") actionMode = "remove";
    else if (choice === "3") actionMode = "warn";

    await zk.sendMessage(origineMessage, `✅ Anti-Tag mode set to: *${actionMode.toUpperCase()}*`);
    return;
  }

  // Listen for tagged messages
  if (antiTagActive && ms.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length) {
    const mentioned = ms.message.extendedTextMessage.contextInfo.mentionedJid;

    for (const user of mentioned) {
      if (actionMode === "delete") {
        await zk.sendMessage(origineMessage, "🧹 Message deleted due to tag!", { delete: ms.key });
      }

      if (actionMode === "remove") {
        await zk.groupParticipantsUpdate(origineMessage.remoteJid, [auteurMsg], "remove");
        await zk.sendMessage(origineMessage, "👢 User removed for tagging.");
      }

      if (actionMode === "warn") {
        if (!warns[auteurMsg]) warns[auteurMsg] = 0;
        warns[auteurMsg]++;

        const currentWarn = warns[auteurMsg];
        const warnCount = conf.WARN_COUNT || 3;

        if (currentWarn >= warnCount) {
          await zk.groupParticipantsUpdate(origineMessage.remoteJid, [auteurMsg], "remove");
          await zk.sendMessage(origineMessage, `🚫 Warn limit exceeded. @${auteurMsg.split('@')[0]} removed!`, { mentions: [auteurMsg] });
          warns[auteurMsg] = 0;
        } else {
          await zk.sendMessage(origineMessage, `⚠️ Warning ${currentWarn}/${warnCount} to @${auteurMsg.split('@')[0]}`, { mentions: [auteurMsg] });
        }
      }
    }
  }
});
