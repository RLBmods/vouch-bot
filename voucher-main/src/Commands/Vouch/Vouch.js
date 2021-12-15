const Command = require('../../Structures/Command');
const {
    MessageEmbed
} = require('discord.js');
const config = require('../../../config.json');
const ms = require('ms')
const db = require('quick.db')

module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Shows rep and vouches of user',
            category: 'Vouch',
            usage: '<user> <reason>'
        });
    }

    async run(message, args) {
        let user = message.mentions.users.last()
        let reason = args.slice(1).join(' ')
        let color = db.get(`${message.author.id}.color`)

        let vouchtimeout = db.get(`${message.author.id}.vouchcd`);
        let vouch = db.get(`${message.author.id}.vouchtime`);
        let vouchtime = ms(vouchtimeout - (Date.now() - vouch))
        if (vouch === null || vouchtimeout - (Date.now() - vouch) <= 0) vouchtime = 'Ready'

        let vouchusertimeout = db.get(`${user.id}_${message.author.id}.vouchcd`);
        let vouchuser = db.get(`${user.id}_${message.author.id}.vouchtime`);
        let vouchusertime = ms(vouchusertimeout - (Date.now() - vouchuser))
        if (vouchuser === null || vouchusertimeout - (Date.now() - vouchuser) <= 0) vouchusertime = 'Ready'

        if(user.id === message.author.id) return message.reply('you cannot vouch yourself.')
        if(vouch !== null || vouchtimeout - (Date.now() - vouch) > 0) return message.reply(`you cannot vouch for another ${vouchtime}.`)
        if (vouchuser !== null || vouchusertimeout - (Date.now() - vouchuser) > 0) return message.reply(`you cannot vouch for this user for another ${vouchusertime}.`)
        if(reason === null) return message.reply(`please specify reason for this vouch.`)

        db.add(`${user.id}.totalvouch`, 1)
        db.add(`${message.author.id}.givenvouch`, 1)
        db.push(`${user.id}_${message.author.id}.vouch`, reason)
        db.set(`${user.id}_${message.author.id}.vouchcd`, 86400000);
        db.set(`${user.id}_${message.author.id}.vouchtime`, Date.now());
        db.set(`${message.author.id}.vouchcd`, 600000);
        db.set(`${message.author.id}.vouchtime`, Date.now());
            let embed = new MessageEmbed()
            .setAuthor(`Vouch Added`, message.author.displayAvatarURL())
            .setColor(`${color}`)
            .addField('User', `\`\`\`${user.tag}\`\`\``)
            .addField('Reason', `\`\`\`${reason}\`\`\``)
        message.channel.send({embed})
    }
};