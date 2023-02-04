const conf = require("../../configs/sunucuayar.json")
const { red } = require("../../configs/emojis.json")
const emoji = require("../../configs/emojis.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
  conf: {
    aliases: ["say"],
    name: "say",
    help: "say"
  },

  run: async (client, message, args, embed) => {
    if(!conf.teyitciRolleri.some(oku => message.member.roles.cache.has(oku)) && !conf.sahipRolu.some(oku => message.member.roles.cache.has(oku)) && !message.member.permissions.has('ADMINISTRATOR')) 
    {
      message.react(red)
      return
    }
    let Tag = conf.tag 

    var takviye = rakam(message.guild.premiumSubscriptionCount)
    var takviyesayı = rakam(message.guild.premiumTier)
    var TotalMember = rakam(message.guild.memberCount)
    var AktifMember = rakam(message.guild.members.cache.filter(m => m.presence && m.presence.status !== "offline").size)
    let tag = `${rakam(message.guild.members.cache.filter(u => u.user.username.includes(Tag)).size)} (${Tag})`
    var sesli = rakam(message.guild.members.cache.filter((x) => x.voice.channel).size)

  const ozi = message.channel.send({ embeds: [embed
               .setColor('RANDOM')
               .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
               .setDescription(`
<t:${Math.floor(Date.now() / 1000)}:R> **Tarihli Sunucu Verisi**

\` ❯ \` Şu anda toplam **${sesli}** kişi seslide.
\` ❯ \` Sunucuda **${TotalMember}** adet üye var (**${AktifMember}** Aktif)
\` ❯ \` Toplamda **${tag}** kişi tagımızı alarak bizi desteklemiş.
\` ❯ \` Toplamda **${takviye}** adet boost basılmış!
`)
           ]})
 },
 };

function rakam(sayi) {
  var basamakbir = sayi.toString().replace(/ /g, "     ");
  var basamakiki = basamakbir.match(/([0-9])/g);
  basamakbir = basamakbir.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase();
  if (basamakiki) {
    basamakbir = basamakbir.replace(/([0-9])/g, d => {
      return {
        '0': "<a:0_:1068068200413138966>",
        '1': "<a:1_:1068068210479464448>",
        '2': "<a:2_:1068068220512239616>",
        '3': "<a:3_:1068068235095851082>",
        '4': "<a:4_:1068068244495282237>",
        '5': "<a:5_:1068068260676902934>",
        '6': "<a:6_:1068068269078093874>",
        '7': "<a:7_:1068068281950421002>",
        '8': "<a:8_:1068068298337554513>",
        '9': "<a:9_:1068068313323806750>"
      }
      [d];
    })
  }
  return basamakbir;
}