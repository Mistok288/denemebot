const conf = require("../configs/sunucuayar.json")
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

    let iltifatSayi = 0;
    let iltifatlar = [
      "> **alyeskanın gözleri gibisin ışıl ışıl**",
      "> **Ankarada deniz sende karakter**",
      "> **Sevgilin mi terk etti siktir ett gel oynuyalım**",
      "> **Kimse bir sen edemez kendi mi kontrol edemem",
      "> **Koş hemen geceyi anlatmış şarkısını dinle senin adına yazılmış resmen**",
      "> **Güneşi gülüsüne nasıl sıgdırdın**",
      "> **Olmuyan karakterini mi arıyorsun vah vah yazık**"
    ];
    
    module.exports = async (message) => {
        if (message.channel.id === conf.chatChannel && !message.author.bot) {
        iltifatSayi++;
        if (iltifatSayi >= 50) {
          iltifatSayi = 0;
          message.reply({ content: iltifatlar.random()});
        };
      };
    }; 

module.exports.conf = {
  name: "messageCreate",
};
