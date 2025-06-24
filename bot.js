const mineflayer = require('mineflayer');
const { autoReconnector } = require('mineflayer-auto-reconnect');
const fs = require('fs');

let bot;

function createBot() {
  bot = mineflayer.createBot({
    host: process.env.MC_HOST,
    port: parseInt(process.env.MC_PORT),
    username: process.env.MC_USERNAME,
    password: process.env.MC_PASSWORD || undefined,
    version: false
  });

  autoReconnector(bot, {
    attempts: Infinity,
    minDelay: 5000,
    maxDelay: 10000
  });

  bot.on('login', () => {
    console.log('✅ Minecraft bot joined the server');
    bot.chat('/login yourpassword'); // or /register
  });

  bot.on('end', () => {
    console.log('🔁 Bot disconnected');
  });

  bot.on('error', err => {
    console.log('❌ Bot error:', err);
  });
}

module.exports = createBot;
module.exports.getBotInstance = () => bot;
