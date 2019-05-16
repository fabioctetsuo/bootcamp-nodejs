const MailService = require('../services/Mail');

class PurchaseMail {
  get key() {
    return 'PurchaseMail';
  }

  async handle(job, done) {
    const { ad, user, content } = job.data;
    await MailService.sendMail({
      from: '"Fabio Tetsuo" <fabioctetsuo@gmail.com>',
      to: ad.author.email,
      subject: `Solitação de Compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad },
    });
    return done();
  }
}

module.exports = new PurchaseMail();
