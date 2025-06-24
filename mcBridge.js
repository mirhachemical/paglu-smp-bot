const { getBotInstance } = require('./bot');

function execMinecraftCommand(cmd) {
  const bot = getBotInstance();
  if (bot && bot.chat) bot.chat(`/${cmd}`);
}

async function getOnlinePlayers() {
  const bot = getBotInstance();
  if (!bot || !bot.players) return '❌ Bot not connected.';
  const names = Object.keys(bot.players);
  return names.length ? `👥 Online: ${names.join(', ')}` : '😴 No players online.';
}

module.exports = { execMinecraftCommand, getOnlinePlayers };
