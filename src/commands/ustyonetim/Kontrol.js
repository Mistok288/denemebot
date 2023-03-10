const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
let ayar = require("../../configs/sunucuayar.json"); 
let sunucu = require("../../configs/settings.json");  
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    conf: {
      aliases: ["control", "kontrol"],
      name: "kontrol",
      help: "kontrol"
    },
  
    run: async (client, message, args, durum, kanal) => {

    if(!ayar.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    { 
    message.reply({ content:`Yetkin bulunmamakta dostum.`}).then((e) => setTimeout(() => { e.delete(); }, 5000)); 
    return }
 
       let guild = client.guilds.cache.get(sunucu.guildID);
       await guild.members.fetch();

      
    let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.get(ayar.ekipRolu))

    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

const row = new MessageActionRow()
.addComponents(
new MessageButton().setStyle('SUCCESS').setLabel('Tag Rol Dağıt').setCustomId('tagrol'),
new MessageButton().setStyle('PRIMARY').setLabel('Kayıtsız Rol Dağıt').setCustomId('kayıtsızdagit'),
);

let ozi = new MessageEmbed()
.setDescription(`
${message.member.toString()}, \`${moment(Date.now()).format("LLL")}\` tarihinden  itibaren \`${message.guild.name}\` rolü olmayan üyelerin rol dağıtım tablosu aşağıda belirtilmiştir.
`)

.addFields(
{ name: "__**Taglı Rol**__", value: `
\`\`\`fix
${taglilar.size} kişi
\`\`\`
`, inline: true },
{ name: "__**Kayıtsız Rol**__", value: `
\`\`\`fix
${ozicim.size} kişi
\`\`\`
`, inline: true }
)

.setColor("BLACK")
.setFooter({ text: message.author.tag, iconURL: message.author.avatarURL()})
.setTimestamp()
.setThumbnail(message.author.displayAvatarURL({ dynamic: true, size: 2048 }))
 
 
  let msg = await message.channel.send({ embeds: [ozi], components: [row]})
 
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

      collector.on("collect", async (button) => {

    
    if (button.customId === 'tagrol') {
 
      let taglilar = message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu))

    button.reply({ content:`
Tagı olup rolü olmayan ${taglilar.size} kullanıcıya rol verildi.

Tag Rolü verilen kullanıcılar;
${taglilar.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")}`})

    message.guild.members.cache.filter(s => s.user.username.includes(ayar.tag) && !s.roles.cache.has(ayar.ekipRolu)).map(x=> x.roles.add(ayar.ekipRolu))                
    }

    if (button.customId === 'kayıtsızdagit') {
 
    let ozicim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)

    button.reply({ content:`
Kayıtsız rolü olmayan ${ozicim.size} kullanıcıya kayıtsız rolü verildi !

Kayıtsız Rolü verilen kullanıcılar;
${ozicim.map(x => x || "Rolü olmayan Kullanıcı bulunmamaktadır.")} `})

    message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0).map(x=> x.roles.add(ayar.unregRoles))

    }

  });
}
}
