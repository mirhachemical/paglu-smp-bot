const { Client, GatewayIntentBits } = require('discord.js');
const { execMinecraftCommand, getOnlinePlayers } = require('./mcBridge');

module.exports = function startDiscordBot() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

  const prefix = '!';

  client.on('ready', () => {
    console.log(`✅ Discord bot ready as ${client.user.tag}`);
  });

  client.on('messageCreate', async message => {
    if (message.author.bot || !message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    const isOwner = message.author.id === process.env.OWNER_ID;

    if (command === 'ip') {
      message.reply(`🌐 Server IP: ${process.env.MC_HOST}:${process.env.MC_PORT}`);
    }

    if (command === 'players') {
      message.reply(await getOnlinePlayers());
    }

    if (!isOwner) return;

    if (command === 'say') {
      execMinecraftCommand(`say ${args.join(' ')}`);
    } else if (command === 'ban') {
      execMinecraftCommand(`ban ${args.join(' ')}`);
    } else if (command === 'kick') {
      execMinecraftCommand(`kick ${args.join(' ')}`);
    }
  });

  client.login(process.env.DISCORD_TOKEN);
};
