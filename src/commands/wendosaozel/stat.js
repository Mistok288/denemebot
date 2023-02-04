const {  voice, mesaj2, star, miniicon } = require("../../configs/emojis.json");
const messageUserChannel = require("../../schemas/messageUserChannel");
const voiceUserChannel = require("../../schemas/voiceUserChannel");
const messageUser = require("../../schemas/messageUser");
const voiceUser = require("../../schemas/voiceUser");
const voiceUserParent = require("../../schemas/voiceUserParent");
const moment = require("moment");
const inviterSchema = require("../../schemas/inviter");
require("moment-duration-format");
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require("discord.js");
const conf = require("../../configs/sunucuayar.json")
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    conf: {
      aliases: ["gerekssssssssssssssse","sssssssssssssssssssssstat", "wendoss"],
      name: "stsssssssssssssssssssat",
      help: "stsssssssssssssssssat"
    },
  
run: async (client, message, args, embed, prefix) => {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const inviterData = await inviterSchema.findOne({ guildID: message.guild.id, userID: member.user.id });
    const total = inviterData ? inviterData.total : 0;
    const regular = inviterData ? inviterData.regular : 0;
    const bonus = inviterData ? inviterData.bonus : 0;
    const leave = inviterData ? inviterData.leave : 0;
    const fake = inviterData ? inviterData.fake : 0;

    const category = async (parentsArray) => {
        const data = await voiceUserParent.find({ guildID: message.guild.id, userID: member.id });
        const voiceUserParentData = data.filter((x) => parentsArray.includes(x.parentID));
        let voiceStat = 0;
        for (var i = 0; i <= voiceUserParentData.length; i++) {
          voiceStat += voiceUserParentData[i] ? voiceUserParentData[i].parentData : 0;
        }
        return moment.duration(voiceStat).format("H [saat], m [dakika] s [saniye]");
      };
      
      const Active1 = await messageUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      const Active2 = await voiceUserChannel.find({ guildID: message.guild.id, userID: member.id }).sort({ channelData: -1 });
      let messageTop;
      Active1.length > 0 ? messageTop = Active1.splice(0, 5).map(x => `<#${x.channelID}>: \`${Number(x.channelData).toLocaleString()} mesaj\``).join("\n") : messageTop = "Veri bulunmuyor."

      const messageData = await messageUser.findOne({ guildID: message.guild.id, userID: member.id });
      const voiceData = await voiceUser.findOne({ guildID: message.guild.id, userID: member.id });
      const messageWeekly = messageData ? messageData.weeklyStat : 0;
      const voiceWeekly = moment.duration(voiceData ? voiceData.weeklyStat : 0).format("H [saat], m [dakika]");
      const messageDaily = messageData ? messageData.dailyStat : 0;
      const voiceDaily = moment.duration(voiceData ? voiceData.dailyStat : 0).format("H [saat], m [dakika]");

      const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
              .setCustomId('statmenu')
              .setPlaceholder('Yapım Aşamasında')
              .addOptions([
                  { label: 'Ses istatistikleri', description: 'Hangi kanallarda ne kadar seste kaldıgını gösterir', value: '1', emoji: '1066401473795194941' },
                  { label: 'Mesaj istatistikleri', description: 'Sunucudaki toplam ses verilerini gösterir', value: '2', emoji: '1066020518341382215' },
                  { label: 'İşlemi İptal Et', description: 'Açılan Menüyü Kapatır', value: '3', emoji: '1033072911210270720' },
              ]),
      );    
        
      


      
let yy = new MessageEmbed()
.setDescription(`Merhabalar ${message.member.toString()}, aşağıdan yetkilileri bilgilendirmek için menüyü kullanabilirsin!
\` 1 \` Stat
\` 2 \` toplam stat
\` 3 \` iptal
`)



  embed.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses ve mesaj bilgileri aşağıda belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Toplam Mesaj**__",  value: `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name:"__**Toplam Davet**__",  value: `
\`\`\`fix
${inviterData ? `${total} regular`: "Veri bulunmuyor."} 
\`\`\`
`, inline: true },
 )

 

let msg = await message.channel.send({ embeds: [embed], components: [row]})

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });

collector.on("collect", async (interaction) => {
if(interaction.customId === "statmenu") {
  await interaction.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam ses bilgileri aşağıda belirtilmiştir.`)
.addFields(
{ name: "__**Toplam Ses**__",  value: 1 `
\`\`\`fix
${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}
\`\`\`
`, inline: true },
{ name: "__**Haftalık Ses**__",  value: 1 `
\`\`\`fix
${voiceWeekly}
\`\`\`
`, inline: true },
{ name:"__**Günlük Ses**__",  value: 1  `
\`\`\`fix
${voiceDaily}
\`\`\`
`, inline: true },
)

  embeds.addField(` **Sesli Sohbet İstatistiği**`, `
 Toplam: \`${moment.duration(voiceData ? voiceData.topStat : 0).format("H [saat], m [dakika]")}\`
 Public Odalar: \`${await category(conf.publicParents)}\`
 Secret Odalar: \`${await category(conf.privateParents)}\`
 Alone Odalar: \`${await category(conf.aloneParents)}\`
Yönetim Yetkili Odaları: \`${await category(conf.funParents)}\`
 Kayıt Odaları: \`${await category(conf.registerParents)}\`
 `, false);

msg.edit({
  embeds: [embeds],
  components : [row]
})}

const wee = new MessageActionRow()
.addComponents(
  new MessageSelectMenu()
        .setCustomId('statmenu')
        .setPlaceholder('Yapım Aşamasında')
        .addOptions([
            { label: 'Mesaj istatistikleri', description: 'Sunucudaki toplam ses verilerini gösterir', value: '2', emoji: '1066020518341382215' },
    
        ]),
);    
  


if(interaction.customId === "statmenu") {
  await interaction.deferUpdate();

const embeds = new MessageEmbed()
.setDescription(`${member.toString()} üyesinin \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` sunucusunda toplam mesaj bilgileri aşağıda belirtilmiştir.`)

.addFields(
{ name: "__**Toplam Mesaj**__",  value: 2  `
\`\`\`fix
${messageData ? messageData.topStat : 0} mesaj
\`\`\`
`, inline: true },
{ name: "__**Haftalık Mesaj**__",  value: 2 `
\`\`\`fix
${Number(messageWeekly).toLocaleString()} mesaj
\`\`\`
`, inline: true },
{ name:"__**Günlük Mesaj**__",  value: 2 `
\`\`\`fix
${Number(messageDaily).toLocaleString()} mesaj
\`\`\`
`, inline: true },
)
embeds.addField(` **Mesaj İstatistiği**`, `
${messageTop}
`, false);
msg.edit({
  embeds: [embeds],
  components : [row]
})}
if(interaction.customId === "statmenu") {
  await interaction.deferUpdate();

msg.edit({
  embeds: [embed],
  components : [row]
})}
})
},
};
  
