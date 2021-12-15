const Event = require('../../Structures/Event');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');
const db = require('quick.db')

module.exports = class extends Event {

	async run(message) {
		const mentionRegex = RegExp(`^<@!?${this.client.user.id}>$`);
		const mentionRegexPrefix = RegExp(`^<@!?${this.client.user.id}> `);

		const user = message.author;
		const color = await db.fetch(`color_${user.id}`)

		const embed1 = new MessageEmbed();
		embed1.setColor(color);
		embed1.setDescription(`The prefix is \`${this.client.prefix}\``);
		embed1.setFooter(`Try running ${this.client.prefix}help`);

		if (message.author.bot) return;

		if (message.content.match(mentionRegex)) message.channel.send(embed1);

		const prefix = message.content.match(mentionRegexPrefix) ?
			message.content.match(mentionRegexPrefix)[0] : this.client.prefix;

		if (!message.content.startsWith(prefix)) return;

		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

		const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
		if (command) {
			command.run(message, args);
		}

	}
};
