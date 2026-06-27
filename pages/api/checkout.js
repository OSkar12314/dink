import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { items } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ error: 'Tom varukorg' });
  }

  const line_items = items.map((item) => ({
    price_data: {
      currency: 'sek',
      product_data: {
        name: item.name,
        description: item.desc || undefined,
      },
      unit_amount: item.price * 100, // Stripe använder ören
    },
    quantity: item.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    shipping_address_collection: { allowed_countries: ['SE'] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 0, currency: 'sek' },
          display_name: 'Gratis frakt',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 3 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: { amount: 4900, currency: 'sek' },
          display_name: 'Express (1 dag)',
          delivery_estimate: {
            minimum: { unit: 'business_day', value: 1 },
            maximum: { unit: 'business_day', value: 1 },
          },
        },
      },
    ],
    success_url: `${req.headers.origin}/tack?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/`,
    locale: 'sv',
  });

  res.status(200).json({ url: session.url });
}
