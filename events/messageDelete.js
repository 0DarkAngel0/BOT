const Discord = require('discord.js');
exports.run = async(client, msg) => {
    if (client.starboard.get(msg.id)) {
        const table = client.starboard.get(msg.id);
        const starboardch = client.channels.get(table.channel);

        starboardch.fetchMessage(table.msgid).then(m => m.delete());
    }

    const tableconfig = client.guildconfs.get(msg.guild.id);
    var lang = require(`../languages/en.json`);
    if (tableconfig.messagedellog === 'false') return;
    const messagechannel = client.channels.get(tableconfig.messagedellogchannel);

    const embed = new Discord.RichEmbed()
    .setColor('#FE2E2E')
    .setTimestamp()
    .setAuthor(lang.messagedeleteevent_deleted)
    .addField(`🗣 ${lang.messagedeleteevent_author}`, msg.author.tag)
    .addField(`📲 ${lang.messagedeleteevent_channel}`, `${msg.channel.name} (${msg.channel.id})`)
    .addField(`📎 ${lang.messagedeleteevent_mid}`, msg.id)
    .addField(`📜 ${lang.messagedeleteevent_message}`, msg.cleanContent.length > 1 ? msg.cleanContent : '-');

    messagechannel.send({ embed: embed });
};
