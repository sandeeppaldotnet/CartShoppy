// src/pages/Checkout.jsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Alert, Button, Card, Col, Row, ListGroup } from 'react-bootstrap';
import CheckoutForm from '../components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent on backend
    fetch('/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartItems,
        currency: 'usd'
      }),
    })
    .then(res => res.json())
    .then(data => setClientSecret(data.clientSecret));
  }, []);

  return (
    <div className="checkout-page py-5">
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h2 className="mb-4">Payment Details</h2>
              {clientSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{ clientSecret }}
                >
                  <CheckoutForm />
                </Elements>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h3 className="mb-4">Order Summary</h3>
              <ListGroup variant="flush">
                {cartItems.map(item => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <div>
                      {item.title} <br />
                      <small className="text-muted">x{item.quantity}</small>
                    </div>
                    <div>${(item.price * item.quantity).toFixed(2)}</div>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between fw-bold">
                  <span>Total:</span>
                  <span>$
                    {cartItems.reduce(
                      (total, item) => total + (item.price * item.quantity),
                      0
                    ).toFixed(2)}
                  </span>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Checkout;