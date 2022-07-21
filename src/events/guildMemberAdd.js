const { GuildMember, EmbedBuilder } = require('discord.js')

module.exports = {
	name: 'guildMemberAdd',
	/**
	 * 
	 * @param {GuildMember} member
	 */
	execute(member) {
		member.guild.channels.cache.get('913123394470445084').send()
		embeds: [
			new EmbedBuilder()
			.setTitle('Willkommen')
			.setDescription(`${member.toString()} ist dem Server Beigetreten`)
			.setThumbnail(member.user.displayAvatarURL())
			.setColor('#abc329')
		]
	},
};