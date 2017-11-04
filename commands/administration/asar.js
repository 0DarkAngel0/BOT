exports.run = async(client, msg, args) => {
	if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('You dont have permissions to execute this command!').then(m => m.delete(10000));
	const tableload = client.guildconfs.get(msg.guild.id);
	let addedrole = args.slice().join(' ');
	const foundRole = msg.guild.roles.find(role => role.name.toLowerCase() === args.slice().join(' ').toLowerCase());

	if (addedrole.length < 1) return msg.reply('You must specify the name of the role!').then(m => m.delete(10000));
	if (!foundRole) return msg.reply('Höh ... This role does not exist at all!').then(m => m.delete(10000));
		for (var i = 0; i < tableload.selfassignableroles.length; i++) {
			if (foundRole.id === tableload.selfassignableroles[i]) return msg.channel.send('You have already added this role to the self-assignable roles!');
		}
		const roleId = foundRole.id;
		tableload.selfassignableroles.push(roleId);
		await client.guildconfs.set(msg.guild.id, tableload);
		
		return msg.channel.send('Role has been successfully set to self-assignable roles!');
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: []
};
exports.help = {
	name: 'asar',
	description: 'Add a role that allows users to assign themselves',
	usage: 'asar {rolename}',
	example: 'asar Member',
	category: 'administration'
};
