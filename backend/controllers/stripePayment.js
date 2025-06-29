const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Example: Payout function to send money to connected account
const createPayout = async (req, res) => {
  const { amount, currency, connectedAccountId } = req.body;

  try {
    const payout = await stripe.payouts.create(
      {
        amount,
        currency,
      },
      {
        stripeAccount: connectedAccountId,
      }
    );

    res.status(200).json({ success: true, payout });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { createPayout };
