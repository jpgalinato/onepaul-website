(() => {
  const nav = document.getElementById('primary-nav');
  const toggle = document.getElementById('mobile-menu');
  const groups = [...document.querySelectorAll('.nav-group')];
  const closeGroups = (except) => groups.forEach(g => { if(g !== except) g.open = false; });
  toggle?.addEventListener('click', () => {
    const opened = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded',String(opened));
    if(!opened) closeGroups();
  });
  groups.forEach(g => g.addEventListener('toggle', () => {if(g.open) closeGroups(g);}));
  document.addEventListener('click', e => {if(!e.target.closest('.nav-group')) closeGroups();});
  document.addEventListener('keydown', e => {if(e.key === 'Escape'){closeGroups();nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}});
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {closeGroups();nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));

  const form = document.getElementById('enquiry-form');
  if (!form) return;
  const submit = form.querySelector('button[type=submit]');
  const status = document.getElementById('form-status');
  const show = (message, kind='') => {status.textContent=message;status.className='form-status '+kind;};
  let siteKey = '';
  let widgetLoaded = false;
  const widgetWrap = document.createElement('div');
  widgetWrap.id = 'onepaul-turnstile';
  widgetWrap.style.margin = '12px 0 20px';
  form.insertBefore(widgetWrap, submit);
  const renderTurnstile = () => {
    if(!siteKey || !window.turnstile || widgetLoaded) return;
    window.turnstile.render('#onepaul-turnstile',{sitekey:siteKey,callback:()=>show('Security check completed. You can now submit.'), 'expired-callback':()=>show('Security check expired. Please complete it again.','error')});
    widgetLoaded=true;
  };
  async function configure(){
    submit.disabled = true;
    submit.setAttribute('aria-disabled','true');
    show('Enquiry delivery is not connected on this review build.');
    try{
      const response=await fetch('/api/form-config',{cache:'no-store'});
      if(!response.ok)return;
      const cfg=await response.json();
      if(!cfg.ready||!cfg.turnstileSiteKey)return;
      siteKey=cfg.turnstileSiteKey;
      const script=document.createElement('script');
      script.src='https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
      script.async=true;
      script.onload=renderTurnstile;
      document.head.appendChild(script);
      submit.disabled=false;
      submit.removeAttribute('aria-disabled');
      show('Complete the security check, then send your enquiry.');
    }catch{
      show('Enquiry delivery is not connected on this review build.');
    }
  }
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    if(submit.disabled)return;
    if(!form.reportValidity()){show('Please complete the required fields.','error');return;}
    const data=Object.fromEntries(new FormData(form).entries());
    if(!data['cf-turnstile-response']){show('Please complete the security check.','error');return;}
    submit.disabled=true;show('Sending your enquiry…');
    try{
      const result=await fetch('/api/enquiry',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
      const payload=await result.json().catch(()=>({}));
      if(!result.ok)throw Error(payload.error||'We could not send your enquiry.');
      show('Enquiry sent. Thank you. Onepaul can now follow up with you.','ok');
      form.reset();if(window.turnstile)window.turnstile.reset();
    }catch(error){show(error.message||'Unable to send. Please try again.','error');}
    finally{submit.disabled=false;}
  });
  configure();
})();
