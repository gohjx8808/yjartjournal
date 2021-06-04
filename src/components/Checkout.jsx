import React, { useState } from 'react';
import getStripe from '../utils/stripejs';

const buttonStyles = {
  fontSize: '13px',
  textAlign: 'center',
  color: '#000',
  padding: '12px 60px',
  boxShadow: '2px 5px 10px rgba(0,0,0,.1)',
  backgroundColor: 'rgb(255, 178, 56)',
  borderRadius: '6px',
  letterSpacing: '1.5px',
};

const buttonDisabledStyles = {
  opacity: '0.5',
  cursor: 'not-allowed',
};

const Checkout = () => {
  const [loading, setLoading] = useState(false);

  const redirectToCheckout = async (event) => {
    event.preventDefault();
    setLoading(true);

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      mode: 'payment',
      lineItems: [{ price: 'price_1IyGWwH6YfhgUz8kTfVYv4Oq', quantity: 1 }],
      successUrl: 'https://jxappecommercesite.gtsb.io/page-2/',
      cancelUrl: 'https://jxappecommercesite.gtsb.io/',
    });

    if (error) {
      console.warn('Error:', error);
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      style={
        loading ? { ...buttonStyles, ...buttonDisabledStyles } : buttonStyles
      }
      type="button"
      onClick={redirectToCheckout}
    >
      Buy Chocolate
    </button>
  );
};

export default Checkout;
