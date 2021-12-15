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

    async run(message, color) {
        let user = message.mentions.users.last()
        let totalvouch = db.get(`${message.auther.id}.totalvouch`)

        if(totalvouch < 10) return message.reply('you do not have enough vouches recieved to rep someone. (10+)')

        let embed = new MessageEmbed()
            .setTitle(`New Embed Color`)
            .setColor(`${color}`)
        message.channel.send({
            embed
        })
    }
};