import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Missing Stripe secret key in environment variables.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2022-11-15', // Adjust the API version according to your needs
});

export default stripe;