const {
    MessageEmbed
} = require('discord.js');
const Command = require('../../Structures/Command');
const config = require('../../../config.json');
const db = require('quick.db')


module.exports = class extends Command {

    constructor(...args) {
        super(...args, {
            description: 'Displays all the commands in the bot',
            category: 'Utilities'
        });
    }

    async run(message, [command]) {
        let user = message.author;
        let color = await db.fetch(`${user.id}.color`)
        const embed = new MessageEmbed()
            .setColor(`${color}`)
            .setAuthor(`Hades Help`, this.client.user.displayAvatarURL({
                dynamic: true
            }))
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .setFooter(`Requested by ${message.author.username}`, message.author.displayAvatarURL({
                dynamic: true
            }))

        if (command) {
            const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command));

            if (!cmd) return message.channel.send(`No command named \`${command}\``);

            embed.setAuthor(`${this.client.utils.capitalise(cmd.name)} Help`, this.client.user.displayAvatarURL());
            embed.setDescription([
                `> **Aliases:** ${cmd.aliases.length ? cmd.aliases.map(alias => `\`${alias}\``).join(', ') : 'None'}`,
                `> **Description:** ${cmd.description}`,
                `> **Category:** ${cmd.category}`,
                `> **Usage:** ${cmd.usage}`
            ]);

            return message.channel.send(embed);
        } else {
            embed.setDescription([
                `Server Prefix: \`${this.client.prefix}\``,
                `Loot and timers are shared across servers`
            ]);
            let categories;
            // if (!this.client.owners.includes(message.author.id)) {
            // 	categories = this.client.utils.removeDuplicates(this.client.commands.filter(cmd => cmd.category !== 'Owner').map(cmd => cmd.category));
            // }
            {
                categories = this.client.utils.removeDuplicates(this.client.commands.map(cmd => cmd.category));
            }

            for (const category of categories) {
                embed.addField(`**${this.client.utils.capitalise(category)}**`, this.client.commands.filter(cmd =>
                    cmd.category === category).map(cmd => `\`${cmd.name}\``).join(', '));
            }
            return message.channel.send(embed);
        }
    }
};