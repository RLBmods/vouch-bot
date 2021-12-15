const Command = require('../../Structures/Command');
const {
    MessageEmbed
} = require('discord.js');
const config = require('../../../config.json');
const ecolor = config.color;
const db = require('quick.db')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Shows rep and vouches of user',
            category: 'Vouch',
            usage: '<user>'
        });
    }

    async run(message) {
        let user = message.mentions.users.first() || message.author;
        let color = db.get(`${message.author.id}.color`)
        let vouch = db.get(`${user.id}.totalvouch`)
        if(vouch === undefined) vouch = 0
        let vouchgiven = db.get(`${user.id}.vouchgiven`)
        if(vouchgiven === undefined) vouchgiven = 0
        let rep = db.get(`${user.id}.totalrep`)
        if(rep === undefined) rep = 0
        let repgiven = db.get(`${user.id}.repgiven`)
        if(repgiven === undefined) repgiven = 0

        let embed = new MessageEmbed()
            .setAuthor(`${user.username}'s Stats`, user.displayAvatarURL())
            .setColor(`${color}`)
            .addField('Vouches', `\`\`\`${vouch}\`\`\``, true)
            .addField('Vouches Given', `\`\`\`${vouchgiven}\`\`\``, true)
            .addField('\u200B', '\u200B', true)
            .addField('Rep', `\`\`\`${rep}\`\`\``, true)
            .addField('Rep Given', `\`\`\`${repgiven}\`\`\``, true)
            .addField('\u200B', '\u200B', true)
        message.channel.send({
            embed
        })
    }
};