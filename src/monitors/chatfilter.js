const { Monitor } = require('klasa');
const { MessageEmbed } = require('discord.js');

module.exports = class extends Monitor {

	constructor(...args) {
		super(...args, {
			ignoreEdits: false,
			ignoreOthers: false
		});
	}

	async run(message) {
		if (!message.guild || !message.content || !message.content.length) return;

		const [chatfilter_enabled, chatfilter_array, chatfilterlog_channel] = message.guildSettings.pluck('chatfilter.chatfilter_enabled', 'chatfilter.chatfilter_array', 'chatfilter.chatfilterlog_channel');
		if (!chatfilter_enabled || !chatfilter_array.length || message.command) return;

		const getFiltered = message.content.split(' ').filter(m => chatfilter_array.includes(m));
		if (!getFiltered.length) return;

		if (chatfilter_enabled && chatfilterlog_channel) {
			chatfilterlog_channel.send(new MessageEmbed()
				.setAuthor(`A message from ${message.author.tag} was deleted by the chat filter.`)
				.setColor('RED')
				.addField(`🗣 ${message.language.get('MONITOR_CHATFILTER_AUTHOR')}:`, message.author.tag)
				.addField(`📲 ${message.language.get('MONITOR_CHATFILTER_CHANNEL')}:`, `${message.channel} (${message.channel.id})`)
				.addField(`📥 ${message.language.get('MONITOR_CHATFILTER_MESSAGE')}:`, message.cleanContent)
			);
		}

		await message.delete()
			.then((msg) => {
				return message.channel.sendLocale('MONITOR_CHATFILTER_MSGDELETED', [msg.author]);
			}).catch((error) => { })
	}

};
