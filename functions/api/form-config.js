export async function onRequestGet({env}) {
  const ready = Boolean(env.RESEND_API_KEY && env.LEADS_TO_EMAIL && env.LEADS_FROM_EMAIL && env.TURNSTILE_SITE_KEY && env.TURNSTILE_SECRET_KEY);
  return Response.json({ready,turnstileSiteKey:ready ? env.TURNSTILE_SITE_KEY : null},{
    headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}
  });
}
