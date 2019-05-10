const Discord = require('discord.js');
exports.run = (client, oldPresence, newPresence) => {
	if (!client.provider.isReady) return;
	if (!client.provider.getGuild(oldPresence.guild.id, 'prefix')) return;

	if (client.provider.getGuild(oldPresence.guild.id, 'presenceupdatelog') === 'false') return;

	const lang = require(`../languages/${client.provider.getGuild(oldPresence.guild.id, 'language')}.json`);

	const messagechannel = client.channels.get(client.provider.getGuild(oldPresence.guild.id, 'presenceupdatelogchannel'));
	if (!messagechannel) return;

	if (oldPresence.status !== newPresence.status) {
		const embed = new Discord.MessageEmbed()
			.setColor('ORANGE')
			.setTimestamp()
			.setAuthor(lang.presenceupdateevent_changed)
			.addField(`📎 ${lang.presenceupdateevent_member}:`, `${oldPresence.user.tag} (${oldPresence.userID})`)
			.addField(`📤 ${lang.presenceupdateevent_old}:`, oldPresence.status)
			.addField(`📥 ${lang.presenceupdateevent_new}:`, newPresence.status);
		messagechannel.send({ embed: embed });
	}
};
