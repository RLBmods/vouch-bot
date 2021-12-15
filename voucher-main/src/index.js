const Discord = require('./Structures/Client');
const config = require('../config.json');
const {
    MessageEmbed
} = require('discord.js');
const {
    MessageButton
} = require('discord-buttons');
const client = new Discord(config);
const db = require('quick.db')
client.start();

require('discord-buttons')(client);
require('discord-slider')(client);