// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { items } = req.body;
  const total = calculateTotalAmount(items); // Implement your calculation

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total * 100, // Convert to cents
    currency: 'usd',
  });

  res.send({ clientSecret: paymentIntent.client_secret });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));