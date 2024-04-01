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
    name: 'ticket',
    description: 'Destek sistemini gönderir.',
    type: ApplicationCommandType.ChatInput,
    execute: async (client, interaction, args) => {
        
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({
            cotent: `Bu komutu çalıştırmak için izniniz yok!`
        })

        interaction.channel.send({
            embeds: [{
                title: "Talep Oluştur",
                description: `Lütfen talep açmak istediğiniz destek departmanını seçin.\n\n**Not:** Gereksiz yere talep oluşturan kişiler uyarı alacaktır.`,
                footer: {
                    text: "FirstClass Talep Sistemi"
                },
                color: Colors.Blurple,
                image: {
                    url: config.ticketbanner
                }
            }],            
            components: [
                new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder().setCustomId('staff').setLabel('IC Destek').setEmoji('1212410580707713064').setStyle(ButtonStyle.Success),
                    new ButtonBuilder().setCustomId('answer').setLabel('OOC Destek').setEmoji('1212410580707713064').setStyle(ButtonStyle.Primary),
                    new ButtonBuilder().setCustomId('other').setLabel('Şikayet').setEmoji('1212410580707713064').setStyle(ButtonStyle.Danger)
                )
            ]
        })
    }
}