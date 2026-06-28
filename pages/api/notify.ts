import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = process.env.MAILCHIMP_API_KEY!;
const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID!;
const SERVER = process.env.MAILCHIMP_SERVER!;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Ogiltig e-postadress.' });
  }

  const response = await fetch(
    `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`,
    {
      method: 'POST',
      headers: {
        Authorization: `apikey ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email.trim().toLowerCase(),
        status: 'subscribed',
        tags: ['waitlist'],
      }),
    }
  );

  if (response.ok) return res.status(200).json({ ok: true });

  const data = await response.json();
  // Already subscribed is still a success for the user
  if (data.title === 'Member Exists') return res.status(200).json({ ok: true });

  return res.status(500).json({ error: 'Kunde inte spara e-postadressen.' });
}
