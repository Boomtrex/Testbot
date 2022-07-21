const { SlashCommandBuilder, inlineCode, EmbedBuilder } = require('@discordjs/builders');



module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Zeige Informationen über den Server oder einen User an')
		.addSubcommand(subCommand=> subCommand.setName('server').setDescription('Zeige Informationen über den Server'))
		.addSubcommand(subCommand=> subCommand.setName('member').setDescription('Zeige Informationen über den Member')
		.addUserOption(option=> option.setName('member').setDescription('Der Member').setRequired(true))),
		async execute(interaction) {
			switch(interaction.options.getSubcommand()) {
				case 'server': {
					interaction.reply({ embeds: [
						new EmbedBuilder()
						.setTitle(`Informationen für die Guild ${interaction.guild.name}`)
						.addFields([
							{
							name: 'Channels',
							value: `${interaction.guild.channels.cache.size} Channels`
							},
							{
								name: 'Erstellt',
							    value: `<t:${Math.round(interaction.guild.createdTimestamp/1000)}>`,
								inline: true
							}
						])
					]})
					break
				}

				case 'member': {
					const member = interaction.options.getMember('member')
					interaction.reply({ embeds: [
						new EmbedBuilder()
						.setTitle(`Informationen über ${member.toString()}`)
						.addFields([
							{
							name: 'Account erstellt',
							value: `<t:${Math.round(member.user.createdTimestamp/1000)}>`,
							},
							{
								name: 'Guild beigetreten',
							    value: `<t:${Math.round(member.joinedTimestamp/1000)}>`,
								inline: true
							}
						])
					]})
					break
				}
			}
	}
}