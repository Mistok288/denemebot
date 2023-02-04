const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const { red, green } = require("../../configs/emojis.json")
let ayar = require("../../configs/sunucuayar.json"); 
let cfg = require("../../configs/settings.json"); 
const moment = require("moment");
require("moment-duration-format");
const client = global.bot;

module.exports = {
    conf: {
      aliases: ["perm"],
      name: "perm",
      help: "perm"
    },
  
    run: async (client, message, args, embed) => {
  if (!message.member.permissions.has("ADMINISTRATOR")) return message.react(red)

let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
if (!uye) return message.reply({ content:` • Örnek; !perm @wendos/ID`});
if(message.author.id === uye.id) return message.reply({content: `Kendine Rol Veremezsin dostum!`, ephemeral: true })

const perm = new MessageActionRow()
.addComponents(
    new MessageSelectMenu()
        .setCustomId('perm')
        .setPlaceholder('Eklemek istediğiniz perm için tıklayınız')
        .addOptions([
            {
                label: 'Vip',
                value: 'vip',
                emoji: '970343074150621215'
            },
            {
                label: 'Register',
                value: 'Register',
                emoji: '1065609520795095090'
            },						
        ]),
);

const msg = await message.reply({ content : `${uye} rol vermek icin lütfen menüyü kullanın`, components: [perm] });

const filter = i => i.user.id == message.author.id 
const collector = msg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', max: 1, time: 20000 });
collector.on("collect", async (interaction) => {

     if (interaction.values[0] === "vip") {
        uye.roles.cache.has(ayar.vipRole) ? uye.roles.remove(ayar.vipRole) : uye.roles.add(ayar.vipRole);
        if(!uye.roles.cache.has(ayar.vipRole)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Vip** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Vip** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Vip** rolü geri alındı.`, components: [] });
        };
     }

     if (interaction.values[0] === "Register") {
        uye.roles.cache.has(ayar.registerPerm) ? uye.roles.remove(ayar.müzisyenRole) : uye.roles.add(ayar.müzisyenRole);
        if(!uye.roles.cache.has(ayar.registerPerm)) {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Register** adlı rol verildi.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişiye **Müzisyen** rolü verildi.`, components: [] });
        } else {
          client.channels.cache.find(x => x.name == "rol_log").send({ embeds: [embed.setDescription(`${uye} isimli kişiye **${moment(Date.now()).format("LLL")}** tarihinde ${message.author} tarafından **Register** adlı rol geri alındı.`)]})
          msg.edit({ content:`${green} Başarıyla ${uye}, isimli kişinin **Müzisyen** rolü geri alındı.`, components: [] });
        };
     }

  
    })

}
}