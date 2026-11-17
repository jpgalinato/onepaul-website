const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const pick=(x,max)=>typeof x==='string'?x.trim().slice(0,max):'';
const EMAIL=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function onRequestPost({request,env}){
  if(!env.RESEND_API_KEY||!env.LEADS_TO_EMAIL||!env.LEADS_FROM_EMAIL||!env.TURNSTILE_SECRET_KEY)
    return json({error:'Enquiry delivery is not yet configured.'},503);
  const origin=request.headers.get('Origin');
  const expected=new URL(request.url).origin;
  if(origin!==expected)return json({error:'Invalid origin.'},403);
  if(Number(request.headers.get('content-length')||0)>10000)return json({error:'Payload too large.'},413);
  let body;
  try{body=await request.json();}catch{return json({error:'Invalid enquiry.'},400);}
  const name=pick(body.name,120),email=pick(body.email,180),company=pick(body.company,160),discipline=pick(body.discipline,100),size=pick(body.size,40),details=pick(body.details,1500);
  const consent=body.consent==='yes',honeypot=pick(body.website,200),token=pick(body['cf-turnstile-response'],2200);
  if(honeypot)return json({ok:true}); // Treat bots as successful without delivery
  if(name.length<2||!EMAIL.test(email)||!company||!discipline||!size||details.length<8||!consent||!token)
    return json({error:'Please complete the required fields and verification.'},400);
  const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP')||undefined})
  }).catch(()=>null);
  const verdict=check?.ok?await check.json().catch(()=>null):null;
  if(!verdict?.success)return json({error:'Security check failed. Please try again.'},403);
  const subject='Onepaul website enquiry — '+company.replace(/[\r\n]/g,' ');
  const text=['New website enquiry','', 'Name: '+name,'Email: '+email,'Company: '+company,'Discipline: '+discipline,'Team size: '+size,'', 'Requirements:',details,'','Consent to response: Yes'].join('\n');
  const sent=await fetch('https://api.resend.com/emails',{
    method:'POST',headers:{'Authorization':'Bearer '+env.RESEND_API_KEY,'Content-Type':'application/json','User-Agent':'Onepaul-Website/1.0'},
    body:JSON.stringify({from:env.LEADS_FROM_EMAIL,to:[env.LEADS_TO_EMAIL],reply_to:email,subject,text})
  }).catch(()=>null);
  if(!sent?.ok)return json({error:'Unable to deliver this enquiry. Please try again later.'},502);
  return json({ok:true});
}
export function onRequestGet(){return json({error:'Method not allowed.'},405);}
