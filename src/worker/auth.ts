import { createHmac } from 'crypto';

export function validate(initData: string): boolean {
  const secret = crypto.subtle.digest('SHA-256', new TextEncoder().encode(process.env.BOT_TOKEN));
  
  const parsed = new URLSearchParams(initData);
  const hash = parsed.get('hash');
  parsed.delete('hash');
  parsed.sort();

  const dataCheckString = Array.from(parsed.entries())
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');

  const hmac = createHmac('sha256', secret)
    .update(dataCheckString)
    .digest('hex');

  return hmac === hash;
}