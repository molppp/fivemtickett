const {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChannelType,
    Colors,
    PermissionFlagsBits
} = require('discord.js');
const transcript = require('discord-html-transcripts');
const config = require('../../config.json');

module.exports = {
    name: 'interactionCreate',
    once: false,
    execute: async (interaction, client) => {
        if (!interaction.isButton()) return;

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder().setCustomId('claim').setLabel('Sahiplen').setEmoji('📩').setStyle(ButtonStyle.Secondary),
                new ButtonBuilder().setCustomId('close').setLabel('Kapat').setEmoji('🗑').setStyle(ButtonStyle.Danger),
                new ButtonBuilder().setCustomId('transcript').setLabel('Transkript').setEmoji('📁').setStyle(ButtonStyle.Primary)
            )


        let category = config.parent;
        let roleStaff = interaction.guild.roles.cache.get(config.roleStaffId);
        let LogChannel = config.logChannel;

        let AlreadyAChannel = interaction.guild.channels.cache.find(c => c.topic == interaction.user.id);
        if (AlreadyAChannel) return interaction.rely({
            content: ":x: | Sunucuda zaten açık bir destek talebiniz var.",
            ephemeral: true
        });

        if (interaction.customId === "close") {
            let channel = interaction.channel;
            channel.delete()
        } else if (interaction.customId === "claim") {
            interaction.reply({
                embeds: [{
                    description: `Talebiniz ile ilgilenen kişi ${interaction.user}`,
                    footer: {
                        text: "TurboDC Talep Sistemi"
                    },
                    color: Colors.Blurple
                }]
            })
        } else if (interaction.customId === "transcript") {
            interaction.reply({
                embeds: [{
                    description: `📁 Transkript tamamlandı`,
                    footer: {
                        text: "FirstClass V Talep Sistemi"
                    },
                    color: Colors.Blurple
                }]
            })

            client.channels.cache.get(config.logChannel).send({
                embeds: [{
                    description: `📁 ${interaction.channel} Transkripti`,
                    footer: {
                        text: "FirstClass V Talep Sistemi"
                    },
                    color: Colors.Blurple
                }],
                files: [await transcript.createTranscript(interaction.channel)]
            })
        } else if (interaction.customId === "staff") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user} <@&1217979370229202944>||`,
                    embeds: [{
                        title: "IC Destek",
                        description: `🎫 **Talep Detayları:**\nBir personelin size mümkün olduğunca kesin bir şekilde cevap verebilmesi için lütfen talebinizi ayrıntılı olarak belirtin. \n\n📕 **Çalışma Saatleri** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "FirstClass V Talep Sistemi",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })

        } else if (interaction.customId === "answer") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user} <@&1217979370229202944>||`,
                    embeds: [{
                        title: "OOC Destek",
                        description: `🎫 **Talep Detayları:**\nBir personelin size mümkün olduğunca kesin bir şekilde cevap verebilmesi için lütfen talebinizi ayrıntılı olarak belirtin. \n\n📕 **Çalışma Saatleri** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "FirstClass V Talep Sistemi",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        } else if (interaction.customId === "other") {
            interaction.guild.channels.create({
                name: `ticket ${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.parent,
                permissionOverwrites: [{
                        id: interaction.user.id,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    },
                    {
                        id: interaction.guild.id,
                        deny: [PermissionFlagsBits.ViewChannel]
                    },
                    {
                        id: roleStaff,
                        allow: [PermissionFlagsBits.ViewChannel, PermissionFlagsBits.ReadMessageHistory, PermissionFlagsBits.SendMessages],
                        deny: [PermissionFlagsBits.MentionEveryone]
                    }
                ]
            }).then((c) => {
                c.send({
                    content: `||${interaction.user} <@&1217979370229202944>||`,
                    embeds: [{
                        title: "Şikayet",
                        description: `🎫 **Talep Detayları:**\nBir personelin size mümkün olduğunca kesin bir şekilde cevap verebilmesi için lütfen talebinizi ayrıntılı olarak belirtin. \n\n📕 **Çalışma Saatleri** \n**Pazartesi:** ${config.workingHours.Pazartesi} \n**Salı:** ${config.workingHours.Sali} \n**Çarşamba:** ${config.workingHours.Carsamba} \n**Perşembe:** ${config.workingHours.Persembe} \n**Cuma:** ${config.workingHours.Cuma} \n**Cumartesi:** ${config.workingHours.Cumartesi} \n**Pazar:** ${config.workingHours.Pazar} \n`,
                        footer: {
                            text: "FirstClass V Talep Sistemi",
                        },
                        color: Colors.Blurple
                    }],
                    components: [
                        row
                    ]
                })
                interaction.reply({
                    content: `✅ Biletiniz başarıyla açıldı. <#${c.id}>`,
                    ephemeral: true
                })
            })
        }
    }
}
