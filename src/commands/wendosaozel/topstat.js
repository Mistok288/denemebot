const moment = require("moment");
require("moment-duration-format");
const messageGuild = require("../../schemas/messageGuild");
const messageGuildChannel = require("../../schemas/messageGuildChannel");
const voiceGuild = require("../../schemas/voiceGuild");
const voiceGuildChannel = require("../../schemas/voiceGuildChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
module.exports = {
    conf: {
      aliases: ["topsasdasdtat","tasdasdasds","topasdasdasdasd", "wendostopla"],
      name: "toasdasdstat",
      help: "topsasdasdasdtat"
    },
  
run: async (client, message, args, embed, prefix) => {
    const messageChannelData = await messageGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const voiceChannelData = await voiceGuildChannel.find({ guildID: message.guild.id }).sort({ channelData: -1 });
    const messageUsersData = await messageUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const voiceUsersData = await voiceUser.find({ guildID: message.guild.id }).sort({ topStat: -1 });
    const messageGuildData = await messageGuild.findOne({ guildID: message.guild.id });
    const voiceGuildData = await voiceGuild.findOne({ guildID: message.guild.id });
    const messageChannels = messageChannelData.splice(0, 15).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join(`\n`);
    const voiceChannels = voiceChannelData.splice(0, 15).map((x, index) => `\`${index+1}.\` <#${x.channelID}>: \`${moment.duration(x.channelData).format("H [saat], m [dakika]")}\``).join(`\n`);
    const messageUsers = messageUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${Number(x.topStat).toLocaleString()} mesaj\``).join(`\n`);
    const voiceUsers = voiceUsersData.splice(0, 10).map((x, index) => `\`${index+1}.\` <@${x.userID}>: \`${moment.duration(x.topStat).format("H [saat], m [dakika]")}\``).join(`\n`);
   
    var sescat = new MessageButton()
    .setCustomId("ses")
    .setLabel("Toplam ses")
    .setStyle(1)

    var main = new MessageButton()
    .setCustomId("main")
    .setLabel("Wendos Always")
    .setEmoji("1065608793997725746")
    .setStyle(4)

    const row = new MessageActionRow()
    .addComponents([main, sescat]);
   
     embed.setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
     .setDescription(`
${message.guild.name} sunucusunun toplam ses ve chat bilgileri gösterilmektedir.
    `)
    .addField(`**Genel ses sıralaması**(\`Toplam ${moment.duration(voiceGuildData ? voiceGuildData.topStat : 0).format("H [saat], m [dakika]")}\`)`,`${voiceUsers.length > 0 ? voiceUsers : "Veri Bulunmuyor."}`,true)
    .addField(`**Genel chat sıralaması**(\`Toplam ${Number(messageGuildData ? messageGuildData.topStat : 0).toLocaleString()} mesaj\`)`,`${messageUsers.length > 0 ? messageUsers : "Veri Bulunmuyor."}`,true)
    let msg = await message.channel.send({ embeds: [embed], components: [row]})

    var filter = (xd) => xd.user.id === message.author.id;
    let collector =  msg.createMessageComponentCollector({ filter, componentType: 'BUTTON', time: 99999999 })
  
collector.on("collect", async (button) => {
if(button.customId === "ses") {
  await button.deferUpdate();
  
const embeds = new MessageEmbed()
.setDescription(`
${voiceChannels.length > 0 ? voiceChannels : "Veri Bulunmuyor."}`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
msg.edit({
embeds: [embeds],
components : [row]
})}
if(button.customId === "mes") {
  await button.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`
${messageChannels.length > 0 ? messageChannels : "Veri Bulunmuyor."}
`).setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true, size: 2048 })})
msg.edit({
embeds: [embeds],
components : [row]
})}
if(button.customId === "main") {
  await button.deferUpdate();

  msg.edit({
embeds: [embed],
components : [row]
})}
})
},
  };
  
  