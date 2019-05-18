const Ad = require('../models/Ad');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Queue = require('../services/Queue');
const PurchaseEmail = require('../jobs/PurchaseMail');

class PurchaseController {
  async store(req, res) {
    const { ad, content } = req.body;
    const { userId } = req;
    const purchaseAd = await Ad.findById(ad).populate('author');
    const { purchaseBy } = purchaseAd;

    if (purchaseBy) {
      return res.status(409).json({
        error: 'Ad was already selled',
      });
    }
    const user = await User.findById(userId);

    const purchase = await Purchase.create({
      ad,
      content,
      buyer: userId,
    });

    Queue.create(PurchaseEmail.key, {
      ad: purchaseAd,
      user,
      content,
    }).save();

    return res.status(201).json(purchase);
  }
}

module.exports = new PurchaseController();
