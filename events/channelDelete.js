const Discord = require('discord.js');
exports.run = (client, channel) => {
	if (!channel) return;
	if (channel.type !== 'text') return;

	const tableload = client.guildconfs.get(channel.guild.id);
	if (!tableload) return;
	if (tableload.channeldeletelog === 'false') return;

	if (tableload.language === '') {
		tableload.language = 'en';
		client.guildconfs.set(channel.guild.id, tableload);
	}

	const lang = require(`../languages/${tableload.language}.json`);

	const messagechannel = client.channels.get(tableload.channeldeletelogchannel);

	const embed = new Discord.RichEmbed()
		.setColor('#FE2E2E')
		.setTimestamp()
		.setAuthor(lang.channeldeleteevent_channeldeleted)
		.addField(`📎 ${lang.channelcreateevent_channelid}:`, channel.id)
		.addField(`📝 ${lang.channelcreateevent_name}:`, channel.name);
	messagechannel.send({ embed: embed });
};
