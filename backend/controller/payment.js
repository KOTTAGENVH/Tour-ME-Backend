import Stripe from 'stripe';

//Make payment via Stripe

//Add your desired Stripe Secret Key here😏
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const makePayment = async (amount, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_types: ['card']
      });
     return true;
    } catch (e) {
      console.error(e.message);
     return false;
    }
  };