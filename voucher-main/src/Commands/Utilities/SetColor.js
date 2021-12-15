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
            description: 'Set Embed Color (hex, no #)',
            category: 'Utilities',
            usage: 'fffff'
        });
    }

    async run(message) {
        let user = message.author;
        let color = args[0]
        db.set(`${user.id}.color`, color)

        let embed = new MessageEmbed()
            .setTitle(`New Embed Color`)
            .setColor(`${color}`)
        message.channel.send({
            embed
        })
    }
};