require('dotenv').config();
const startDiscordBot = require('./discord');
const startMinecraftBot = require('./bot');

startDiscordBot();
startMinecraftBot();
