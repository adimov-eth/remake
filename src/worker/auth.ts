export async function validate(initData: string, env: { BOT_TOKEN: string }): Promise<boolean> {
    const botToken = env.BOT_TOKEN;
        if (!botToken) {
        console.error('BOT_TOKEN environment variable is not set');
        return false;
    }
    const secret = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(botToken));
    
    const parsed = new URLSearchParams(initData);
    const hash = parsed.get('hash');
    if (!hash) return false;
    parsed.delete('hash');
    parsed.sort();
  
    const dataCheckString = Array.from(parsed.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');
  
    const hmac = await crypto.subtle.importKey(
      'raw',
      secret,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    ).then(key => 
      crypto.subtle.sign('HMAC', key, new TextEncoder().encode(dataCheckString))
    ).then(signature => 
      Array.from(new Uint8Array(signature))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('')
    );
  
    return hmac === hash;
  }