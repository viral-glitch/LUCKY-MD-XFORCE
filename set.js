const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'LUCKY-XFORCE••<=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0NUbFFsVTR3TUp4dFBEc292U3o0ckVnRWdYZnNSRWgrNXkzZytXQmEyMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiY0tqUm9NSUJDcTFMQXdBU3pLanNScWoyWWRnSDUwc1gxL1JvMWtVcGcxbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFSVpaTk8xR2E2V1hKSDBIWmRwWUVrNHZGUE1TbEFnQUcyZDBVOFg0UW1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnRjJqclBpREVIS1g2bi9Yd2lQOUQ1d1A5NkhVUDRBZ2pQLzB2WWZ1ZzNzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkFNN05kcVZ0aDJkc1VvZ1lxSHpMSUwwcWRnT3ZTSm9vVlRUdG9RYU0wSE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ing3NWVIbHI1Tmc5SzZZcVlobUlaYjFOYlEzb2JXMWU1K0R0c0lUdWJJQTQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUFTOWF2Z0wxMkpTWFJ3TXVPQWo4dzZaczlTdkQvNXpiRnFBZkRYWEMyOD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnp5dWF5WkZIbmZydWZvcTdnWkpSRGtSak83TGdUQzREYXppZTM1TG9WUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImNHWDE0M3Evakxld1J0eGdjTjgxanRiY3lxVldnZkh3QVAxYWZPWEhvalJNRDFPZVNsU0RMMlVxZVdoTEdHbkZSeEU1cWNVeDRKcFZHd0V3Qm1vOGlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJSTUppdTVXaEkyYTRUYjArc09oKzl3bXl3bzBIS1kzcjZocWpvKzlFYlUwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY3MjU2MjczM0BzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJDNEM5MUZFODI0QjI4RTgwQzIwMTYwMjVENjNCNkExMSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzU0ODU2MTI0fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2NzI1NjI3MzNAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiNzhGNjcxRDFFNzk3QTYxMzY5QjVENDAwRkU0QURFQkMifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1NDg1NjEyNX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NjcyNTYyNzMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjhERkM2QjY3MjlFQjgxRkNGNUQyQ0ZDMTkzODM5MEQxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTQ4NTYxMjd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6Ik03Rzk3RktKIiwibWUiOnsiaWQiOiIyNTU2NzI1NjI3MzM6ODhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiaWFtZGFuX0phbWVzIiwibGlkIjoiNjk1NTc0OTg3MDM5NTY6ODhAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKZUoxN29IRUt6MTQ4UUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJXYWdqM2drUDJXd0luTUV2ZU1ETHJwNHVkMVFURGVWS0RrbjZOM1UyYmlNPSIsImFjY291bnRTaWduYXR1cmUiOiJ0M3h1UHo2QnNLS3V4RXArc29IY0tFOXpGcHVRTDZzaks4dFBYaXZHaFoxK3VSWUdIdWU0SUhWNE5JS2xZUFZrV09qS1BFT3hwSmdmamdpMXVRbktBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiYlFUSnRRbXExbVNBR1U3Rm9uclh2VlFDZ3FOV1JzTXpHenFGWmFLYTlhbkIwZ2F2Uk1ITzF6aTJxTnhJbkZzaElZTGZ1T2ZjRFpKM1h5dmU1ZytZaXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2NzI1NjI3MzM6ODhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCVm1vSTk0SkQ5bHNDSnpCTDNqQXk2NmVMbmRVRXczbFNnNUoramQxTm00aiJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0JJSUJRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzU0ODU2MTIyLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBTDV3In0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/mr-X-force/LUCKY-MD-XFORCE',
    OWNER_NAME : process.env.OWNER_NAME || "FrediEzra",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255752593977",
    DEV : process.env.DEV || "FrediEzra Tz",
              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTO_REACT : process.env.AUTO_REACTION || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no",
    AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
    URL: process.env.URL || "https://files.catbox.moe/uw4l17.jpeg",  
    URL2: process.env.URL2 || "https://files.catbox.moe/3o37c5.jpeg",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || 'no',              
    CHAT_BOT: process.env.CHAT_BOT || "no",              
    AUTO_READ_MESSAGES: process.env.AUTO_READ_MESSAGES || "no",
    AUTO_BLOCK: process.env.AUTO_BLOCK || 'no', 
    GCF: process.env.GROUP_HANDLE || 'no', 
    GREET : process.env.GREET_MESSAGE || "no", 
    AUTO_STICKER : process.env.AUTO_STICKER || "no", 
    AUTO_STATUS_TEXT: process.env.AUTO_STATUS_TEXT || 'Your Status Seen By LUCKY-MD-XFORCE',   
    AUTO_STATUS_REPLY: process.env.AUTO_STATUS_REPLY || 'no',
    ANTI_BUG : process.env.ANTI_BUG || "no",
    ANTI_MENTION_GROUP : process.env.ANTI_MENTION_GROUP || "on",
    ANTI_TAG : process.env.ANTI_TAG || "on",
    ANTI_BAD : process.env.ANTI_BAD || "on",
    ANTI_SHARE_GROUP : process.env.ANTI_SHARE_GROUP || "on",
    ANTI_LINK_GROUP : process.env.ANTI_LINK_GROUP || "on",
    AUTO_BIO: process.env.AUTO_BIO || 'yes',       
    ANTI_CALL_TEXT : process.env.ANTI_CALL_TEXT || '',             
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
    WEBSITE :process.env.GURL || "https://fredi-ai-site.vercel.app",
    CAPTION : process.env.CAPTION || "LUCKY-MD-XFORCE",
    BOT : process.env.BOT_NAME || 'LUCKY-MD-XFORCE',
    MODE: process.env.PUBLIC_MODE || "no",              
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_API_KEY : process.env.HEROKU_API_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '5' ,
    ETAT : process.env.PRESENCE || '1',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    LUCKY_ADM : process.env.ANTI_DELETE_MESSAGES || 'no',
    ANTI_DELETE_GROUP : process.env.ANTI_DELETE_GROUP || 'no',
    ANTI_CALL: process.env.ANTI_CALL || 'yes', 
    AUTO_REPLY : process.env.AUTO_REPLY || "no", 
    AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes', 
    VOICE_CHATBOT_INBOX : process.env.VOICE_CHATBOT_INBOX || "no",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, 
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
