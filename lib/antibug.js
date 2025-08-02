const fs = require("fs");
const path = require("path");

// Path to antibug JSON file
const bugFilePath = path.join(__dirname, "../fredie/antibug.json");

// Bug triggers and lag/crash characters
const BUG_STRINGS = [
  "@everyone", "‏", // RTL characters
  "࿋", "࿊", "⃝", "﷽", "۝", "🇮🇳", "🌚", "𓆩𓆪",
  "https://wa.me/join", // group invite links
  "spam", "bug", "lag", "🥵", "💀", "🔥🔥🔥🔥🔥", "🤬🤬🤬",
  "0x0", "\u202e" // RLO (Right-to-Left Override)
];

// Load AntiBug config from file
function loadBugData() {
  try {
    const data = fs.readFileSync(bugFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// Save updated config
function saveBugData(data) {
  fs.writeFileSync(bugFilePath, JSON.stringify(data, null, 2));
}

// Data cache
const antibugData = loadBugData();

// Enable AntiBug for a specific JID
async function enableAntiBug(jid) {
  antibugData[jid] = { active: true };
  saveBugData(antibugData);
}

// Disable AntiBug for a specific JID
async function disableAntiBug(jid) {
  delete antibugData[jid];
  saveBugData(antibugData);
}

// Check if AntiBug is enabled
function isAntiBugOn(jid) {
  return antibugData[jid]?.active === true;
}

// Check if text contains bug triggers
function containsBug(text) {
  if (!text || typeof text !== "string") return false;

  // Normalize and scan text
  const lower = text.toLowerCase();

  return (
    BUG_STRINGS.some((bug) => lower.includes(bug.toLowerCase())) ||
    text.length > 600
  );
}

// Optional: Reset all AntiBug data
function resetAntiBug() {
  saveBugData({});
}

module.exports = {
  enableAntiBug,
  disableAntiBug,
  isAntiBugOn,
  containsBug,
  resetAntiBug, // Optional export
};
