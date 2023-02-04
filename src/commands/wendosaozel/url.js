module.exports = {
    conf: {
      aliases: ["link","url"],
      name: "link",
      help: "link"
    },
  
    
run: async (client, message, args, embed, prefix) => {
if(!message.guild.vanityURLCode) return message.reply({ content:"> Sunucunun özel bir urlsi bulunmuyor"});
const url = await message.guild.fetchVanityData();

message.reply({ content: `discord.gg/${message.guild.vanityURLCode}\n\`Toplam kullanım:\` **${url.uses}**`})
},
  };
