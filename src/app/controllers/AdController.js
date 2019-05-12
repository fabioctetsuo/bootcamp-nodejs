const Ad = require('../models/Ad');

class AdController {
  async index(req, res) {
    const {
      page, priceMin, priceMax, title,
    } = req.query;
    const filters = {};

    if (priceMin || priceMax) {
      filters.price = {};
      if (priceMin) filters.price.$gte = priceMin;
      if (priceMax) filters.price.$lte = priceMax;
    }

    if (title) {
      filters.title = new RegExp(title, 'i');
    }
    // const ads = await Ad.populate('author').find();
    const ads = await Ad.paginate(filters, {
      limit: 20,
      page: page || 1,
      sorted: '-createdAt',
      populate: ['author'],
    });
    return res.json(ads);
  }

  async show(req, res) {
    const { id } = req.params;
    try {
      const ad = await Ad.findById(id);
      return res.json(ad);
    } catch (e) {
      return res.status(404).json({
        error: 'Ad not found',
      });
    }
  }

  async store(req, res) {
    const { body, userId } = req;
    const ad = await Ad.create({ ...body, author: userId });
    return res.status(201).json(ad);
  }

  async update(req, res) {
    const { id } = req.params;
    const { body } = req;
    const ad = await Ad.findByIdAndUpdate(id, body, {
      new: true,
    });
    return res.status(204).json(ad);
  }

  async destroy(req, res) {
    const { id } = req.params;
    await Ad.findByIdAndDelete(id);
    return res.status(204).send();
  }
}

module.exports = new AdController();
