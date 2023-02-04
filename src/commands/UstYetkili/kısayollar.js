const { MessageEmbed, Client, Message, MessageActionRow, MessageSelectMenu } = require("discord.js");
const Discord = require('discord.js');
const client = global.bot;
const { green } = require("../../configs/emojis.json")

module.exports = {
  conf: {
    aliases: ["kısayollar"],
    name: "kısayollar",
    help: "kısayollar",
    owner: true
  },
 
    run: async (client, message, args, durum, kanal) => {
 
      const kısayollar = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('kısayollar')
					.setPlaceholder('Komutlar hakkında yardım almak için tıkla!')
					.addOptions([
					
					
            {
							label: 'Register Command',
							description: 'Register ile ilgili tum komutları gösterir',
							value: 'kayıt',
						},
            {
							label: 'Yetkili Komutları',
							description: 'Yetkili Komutlar kategorisinin yardım bilgileri için tıkla!',
							value: 'yetkili',
						},
					]),
			);
  
     await message.channel.send({ content : `${green} \`${message.guild.name}\`, bot komutlarını incelemek için aşağıdaki menüyü kullan!`, components: [kısayollar] });

    },
  };

  client.on('interactionCreate', interaction => {
    if (!interaction.isSelectMenu()) return;



if (interaction.values[0] === "kayıt") {
    interaction.reply({ content : `
\`\`\`fix
.isim <wendos/ID> isim/yaş
.kayıt <wendos/ID> isim/yaş
.kayıtsız <wendos/ID>
.teyitler <wendos/ID>
.isimler <wendos/ID>
\`\`\`
`, ephemeral: true })
};

if (interaction.values[0] === "yetkili") {
    interaction.reply({ content : `
\`\`\`diff
- .kilit [aç/kapat]
- .kontrol 
- .rollog <wendos/ID>
- .sıfırla <wendos/ID>
- .ysay
- .perm <wendos/ID>
- .ytag ekle/çıkar/liste (sadece ownerlar kullansın)
\`\`\`
`, ephemeral: true })
};
  

});
      
