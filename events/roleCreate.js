const Discord = require('discord.js');
exports.run = (client, role) => {
    const tableload = client.guildconfs.get(role.guild.id);
    if (tableload.rolecreatelog === 'false') return;

    if (tableload.language === '') {
        tableload.language = 'en';
        client.guildconfs.set(role.guild.id, tableload);
	}

    var lang = require(`../languages/${tableload.language}.json`);

    const messagechannel = client.channels.get(tableload.rolecreatelogchannel);

    const embed = new Discord.RichEmbed()
    .setColor('#FE2E2E')
    .setTimestamp()
    .setAuthor(lang.rolecreateevent_created)
    .addField(`📎 ${lang.rolecreateevent_id}:`, role.id)
    .addField(`🔰 ${lang.rolecreateevent_color}:`, role.hexColor)
    .addField(`📝 ${lang.rolecreateevent_name}:`, role.name);
    messagechannel.send({ embed: embed });
};
