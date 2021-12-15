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
        db.set(`color_${user.id}`, color)

        let embed = new MessageEmbed()
            .setTitle(`New Embed Color`)
            .setColor(`${color}`)
        message.channel.send({
            embed
        })
    }
};