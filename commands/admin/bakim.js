const {
    ActionRowBuilder,
    ApplicationCommandType,
    ButtonBuilder,
    ButtonStyle,
    Colors,
    PermissionsBitField
} = require('discord.js');
const config = require('../../config.json');

module.exports = {
    name: 'bakım',
    description: 'Bakım gönderir.',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction, args) => {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({
            cotent: `Bu komutu çalıştırmak için izniniz yok!`
        })

        interaction.channel.send({
            embeds: [{
                title: "Sunucumuz Bakımda",
                description: "FiveM: `connect 62.72.164.244` \n\nSunucumuz şuan bakıma alınıyor. Lütfen güvenli çıkış yapın.\n\n**Keyifli roller dileriz.**\nHerhangi bir sorunda <#1217979718977060944> kanalından bize ulaşabilirsiniz.",
                footer: {
                    text: "Artık uçuyo'm havada First Class"
                },
                color: Colors.Blurple,
                image: {
                    url: config.bakimbanner
                }
            }]
        })
        interaction.channel.send("@everyone")
    }
}