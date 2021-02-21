const _ = require("underscore");
const Discord = require("discord.js");

require('dotenv').config()

module.exports = {
    token: process.env.BOT_TOKEN,
};
const client = new Discord.Client();

const prefix = "#";

client.on("message", function(message) {
    if (message.author.bot) return;
    //if (!message.content.startsWith(prefix)) return;
    if (message.content.startsWith('!')) {
        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(/\s+/);
        const command = args.shift().toLowerCase();
        if (command === 'очередь') {

            const authorID = message.author.id;
            console.log(authorID);

            message.react('➕');
            message.react('✅');

            const filter = (reaction, user) => {
                return ['➕', '✅'].includes(reaction.emoji.name);
            };

            const collector = message.createReactionCollector(filter, {time: 300000});

            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === '✅' && user.id === message.author.id) {
                    let plusMark = message.reactions.cache;

                    let queue = [];
                    plusMark.forEach(reaction => {
                        if (reaction._emoji.name === '➕') {
                            const users = reaction.users.cache;
                            users.forEach(user => {
                                if (user.username !== 'prad-movies' && user.username !== 'prad-movies-dev')
                                    queue.push(user.username);
                            })
                        }
                    });

                    queue = _.shuffle(queue);
                    let reply = '';
                    for (let i = 1; i < queue.length + 1; i++) {
                        reply += '\n' + i + '. ' + queue[i - 1];
                    }
                    message.reply(reply);
                }
            });

            collector.on('end', collected => {

            });
        }
    }
    if (message.content.startsWith('#')) {
        if (message.channel.name === 'кинолюб') {
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(/\s+/);
            const command = args.shift().toLowerCase();
            if (command === "просмотренныефильмы") {
                message.react('1⃣');
                message.react('2⃣');
                message.react('3⃣');
                message.react('4⃣');
                message.react('5⃣');
            }
        } else if (message.channel.name === 'библиотека') {
            const commandBody = message.content.slice(prefix.length);
            const args = commandBody.split(/\s+/);
            const command = args.shift().toLowerCase();
            if (command === "прочитанныекниги") {
                message.react('1⃣');
                message.react('2⃣');
                message.react('3⃣');
                message.react('4⃣');
                message.react('5⃣');
            }
        }
    }
});

client.login(process.env.BOT_TOKEN);