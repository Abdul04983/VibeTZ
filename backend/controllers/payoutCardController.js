const Payout = require('../models/payoutModel');

exports.requestCardPayout = async (req, res) => {
  try {
    const { userId, amount, cardNumber, expiryMonth, expiryYear, cvv } = req.body;

    // Validation simple
    if (!userId || !amount || !cardNumber || !expiryMonth || !expiryYear || !cvv) {
      return res.status(400).json({ message: 'Tafadhali jaza taarifa zote muhimu' });
    }

    // Hapa unaweza kuunganisha na API ya gateway ya malipo ya card (kama Stripe Issuing, Paystack, au API nyingine)
    // Kwa mfano, hapa ni mockup tu:

    // Mock success response:
    const payout = new Payout({
      user: userId,
      amount,
      method: 'card',
      status: 'pending',
      requestedAt: new Date(),
    });

    await payout.save();

    return res.status(201).json({ message: 'Omba malipo ya Card imetumwa kwa usindikaji', payout });
  } catch (error) {
    return res.status(500).json({ message: 'Hitilafu ilitokea', error: error.message });
  }
};
