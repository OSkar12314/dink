import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'notify-emails.json');

function readEmails(): string[] {
  try {
    return JSON.parse(fs.readFileSync(FILE, 'utf8'));
  } catch {
    return [];
  }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({ error: 'Ogiltig e-postadress.' });
  }

  const emails = readEmails();
  const normalized = email.trim().toLowerCase();

  if (emails.includes(normalized)) {
    return res.status(200).json({ ok: true, already: true });
  }

  emails.push(normalized);
  fs.writeFileSync(FILE, JSON.stringify(emails, null, 2));

  return res.status(200).json({ ok: true });
}
