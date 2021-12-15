const Event = require('../Structures/Event');
const ms = require('ms');
const Discord = require('discord.js');
const client = new Discord.Client()
const {
    MessageButton
} = require('discord-buttons');
const {
    MessageEmbed
} = require('discord.js');
const colors = require('colors')
const db = require('quick.db')

module.exports = class extends Event {

    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    run() {
        let tag = this.client.user.tag
        let id = this.client.user.id
        let cmds = this.client.commands.size
        let events = this.client.events.size
        let guilds = this.client.guilds.cache.size.toLocaleString()
        let members = this.client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()

        const statuses = [
            `over ${guilds} guilds`,
            `over ${members} members`,
            `@ me for help`
        ];

        let i = 0;
        setInterval(() => this.client.user.setActivity(`${statuses[i++ % statuses.length]}`, { type: 'WATCHING', url: 'https://twitch.tv/#' }), 15000);
        this.client.user.setStatus('idle');

        console.log(" ██░ ██  ▄▄▄      ▓█████▄ ▓█████   ██████ \n▓██░ ██▒▒████▄    ▒██▀ ██▌▓█   ▀ ▒██    ▒ \n▒██▀▀██░▒██  ▀█▄  ░██   █▌▒███   ░ ▓██▄   \n░▓█ ░██ ░██▄▄▄▄██ ░▓█▄   ▌▒▓█  ▄   ▒   ██▒\n░▓█▒░██▓ ▓█   ▓██▒░▒████▓ ░▒████▒▒██████▒▒\n ▒ ░░▒░▒ ▒▒   ▓▒█░ ▒▒▓  ▒ ░░ ▒░ ░▒ ▒▓▒ ▒ ░\n ▒ ░▒░ ░  ▒   ▒▒ ░ ░ ▒  ▒  ░ ░  ░░ ░▒  ░ ░\n ░  ░░ ░  ░   ▒    ░ ░  ░    ░   ░  ░  ░  \n ░  ░  ░      ░  ░   ░       ░  ░      ░  \n                   ░                      ".red)
        setTimeout(function() {
            console.log('Connected to Discord via the token successfully.\n'.blue)
        }, 200);
        setTimeout(function() {
            console.log('Username: '.blue + `${tag}`.green + ' | '.white + 'ID: '.blue + id.green + '\n')
        }, 400);
        setTimeout(function() {
            console.log('Running on Discord API version '.blue + Discord.version.green + '\n')
        }, 600);
        setTimeout(function() {
            console.log(`Loaded Command(s): `.blue + `${cmds}`.green + ' | '.white + `Loaded Event(s): `.blue + `${events}`.green + '\n')
        }, 800);
        setTimeout(function() {
            console.log(`Guild(s): `.blue + guilds.green + ' | '.white + `Member(s): `.blue + members.green)
        }, 1000);

    }
};