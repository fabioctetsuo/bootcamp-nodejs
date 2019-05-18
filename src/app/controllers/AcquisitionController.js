const Purchase = require('../models/Purchase');

class AcquisitionController {
  async store(req, res) {
    const { purchaseId } = req.body;
    const { ad, buyer } = await Purchase.findById(purchaseId).populate({
      path: 'ad',
      populate: {
        path: 'author',
      },
    });
    // eslint-disable-next-line
    if (!ad.author._id.equals(req.userId)) {
      return res.status(401).json({ error: 'You are not authorized to execute this action' });
    }
    if (ad.purchasedBy) {
      return res.status(409).json({ error: 'This ad had already been bought' });
    }
    ad.purchasedBy = buyer;
    await ad.save();
    return res.status(201).json(ad);
  }
}

module.exports = new AcquisitionController();
