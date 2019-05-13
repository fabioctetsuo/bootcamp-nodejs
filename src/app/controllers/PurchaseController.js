const Ad = require('../models/Ad');
const User = require('../models/User');
const MailService = require('../services/Mail');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;
    const purchaseAd = await Ad.findById(ad).populate('author');
    const user = await User.findById(req.userId);
    await MailService.sendMail({
      from: '"Fabio Tetsuo" <fabioctetsuo@gmail.com>',
      to: purchaseAd.author.email,
      subject: `Solitação de Compra: ${purchaseAd.title}`,
      html: `<p>Teste: ${content}</p>`,
    });
    return res.send();
  }
}

module.exports = new PurchaseController();
