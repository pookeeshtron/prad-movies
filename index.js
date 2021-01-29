const Discord = require("discord.js");
require('dotenv').config()
module.exports = {
  token: process.env.BOT_TOKEN,
};
const client = new Discord.Client();

const prefix = "#";

client.on("message", function(message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
	if (message.channel.name !== 'позитивные-киноманы') return;
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "просмотренныефильмы") {
        message.react('1⃣');
        message.react('2⃣');
        message.react('3⃣');
        message.react('4⃣');
        message.react('5⃣');
    }
});

client.login(process.env.BOT_TOKEN);