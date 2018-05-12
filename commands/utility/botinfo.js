const Discord = require('discord.js');
const moment = require('moment');
require('moment-duration-format');
exports.run = (client, msg, args, lang) => {
	const uptimeserver = moment.duration(client.uptime).format(`d[ ${lang.messageevent_days}], h[ ${lang.messageevent_hours}], m[ ${lang.messageevent_minutes}] s[ ${lang.messageevent_seconds}]`);

	var online = lang.botinfo_online.replace('%guilds', client.guilds.size).replace('%users', client.users.size);
	const embed = new Discord.RichEmbed()
		.setAuthor('LenoxBot', client.user.avatarURL)
		.setColor('#0066CC')
		.setThumbnail(client.user.avatarURL)
		.addField(`⏳ ${lang.botinfo_runtime}`, `${uptimeserver}`)
		.addField(`🛠 ${lang.botinfo_memory}`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
		.addField(`📡 ${lang.botinfo_stats}`, online)
		.addField(`💻 ${lang.botinfo_doc}`, `http://www.lenoxbot.com/`)
		.addField(`💎 ${lang.botinfo_support}`, `https://www.patreon.com/lenoxbot`)
		.addField(`📤 ${lang.botinfo_invite}`, `http://lenoxbot.com/invite/`)
		.addField(`📢 ${lang.botinfo_supportserver}`, 'http://lenoxbot.com/discord/');

	msg.channel.send({
		embed
	});
};

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases: ['binfo', 'bi'],
	userpermissions: []
};
exports.help = {
	name: 'botinfo',
	description: 'Information about the bot',
	usage: 'botinfo',
	example: ['botinfo'],
	category: 'utility',
	botpermissions: ['SEND_MESSAGES']
};