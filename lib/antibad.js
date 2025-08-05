const badWords = [
  "fuck", "shit", "bitch", "asshole", "nigga", "sex", "porn", "boya", "matako",
  "punda", "malaya", "mkundu", "tumbua", "tombwa", "cunt", "penis", "vagina",
  "dick", "boobs", "mkundu", "msenge", "kuma", "malaya", "bastard", "🖕", "manina", "firwa", "madafaka"
];

// Convert all words to lowercase for accurate matching
const lowerBadWords = badWords.map(w => w.toLowerCase());

// Check if a message contains bad text
function containsBadText(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return lowerBadWords.some(bad => lowerText.includes(bad));
}

module.exports = {
  containsBadText
};
