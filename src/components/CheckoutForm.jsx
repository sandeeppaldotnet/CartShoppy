// src/components/CheckoutForm.jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Alert, Button, Spinner } from 'react-bootstrap';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)
        }
      }
    );

    if (stripeError) {
      setError(stripeError.message);
      setProcessing(false);
    } else if (paymentIntent.status === 'succeeded') {
      setSucceeded(true);
      // Handle successful payment here
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="mb-4 p-2 border rounded" />
      
      {error && <Alert variant="danger">{error}</Alert>}
      {succeeded && <Alert variant="success">Payment Successful!</Alert>}

      <Button
        type="submit"
        disabled={processing || succeeded || !stripe}
        className="w-100"
      >
        {processing ? (
          <Spinner animation="border" size="sm" />
        ) : (
          `Pay $${totalAmount}`
        )}
      </Button>
    </form>
  );
};

export default CheckoutForm;