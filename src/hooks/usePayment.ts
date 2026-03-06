import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { Stripe, loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const usePayment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayment = async (amount: number) => {
    setLoading(true);
    setError(null);

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('User is not authenticated. Please log in.');
      }

      const stripe = await stripePromise;
      const response = await fetch('/api/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.getIdToken()}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Payment failed.');
      }

      const paymentData = await response.json();
      const paymentIntent = await stripe?.confirmCardPayment(paymentData.clientSecret);

      if (paymentIntent?.error) {
        throw new Error(paymentIntent.error.message);
      }

      return paymentIntent;
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, handlePayment };
};

export default usePayment;