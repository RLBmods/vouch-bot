/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
const Command = require('../../Structures/Command');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
const Discord = require('discord.js');
const client = new Discord.Client()
const config = require('../../../config.json');
const db = require('quick.db');
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = class extends Command {

	constructor(...args) {
		super(...args, {
			description: 'Shows bot stats and invite',
			category: 'Utilities'
		});
	}

	async run(message) {
		let tag = this.client.user.tag
		let username = this.client.user.username
        let id = this.client.user.id
        let cmds = this.client.commands.size
        let events = this.client.events.size
        let guilds = this.client.guilds.cache.size.toLocaleString()
        let members = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()
    	
		const embed = new MessageEmbed()
			.setAuthor(username + '\'s stats', this.client.user.displayAvatarURL())
			.setThumbnail(this.client.user.displayAvatarURL())
			.addField('Total Guild(s)', `\`\`\`${guilds}\`\`\``, true)
			.addField('Total Member(s)', `\`\`\`${members}\`\`\``, true)
			.addField('\u200B', '\u200B', true)
			.addField('Loaded Commands', `\`\`\`${cmds}\`\`\``, true)
			.addField('Loaded Events', `\`\`\`${events}\`\`\``, true)
			.addField('\u200B', '\u200B', true)

		let invite = new MessageButton()
			.setStyle('url')
			.setURL(`https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot`) 
			.setLabel('Bot Invite');

		let serverinvite = new MessageButton()
			.setStyle('url')
			.setURL(``)
			.setLabel('Support Server');

		let row = new MessageActionRow()
			.addComponents(invite, serverinvite);
			
		message.channel.send(' ', {
			embed: embed,
            component: row
        });
	}
};
