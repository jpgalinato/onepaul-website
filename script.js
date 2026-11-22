const opNav=document.querySelector('#op-navigation');
const opToggle=document.querySelector('.op-menu-toggle');
const opGroups=[...document.querySelectorAll('.op-dropdown')];
function closeOpGroups(){opGroups.forEach(group=>{group.open=false;});}
function closeOpMenu(){opNav?.classList.remove('is-open');opToggle?.setAttribute('aria-expanded','false');closeOpGroups();}
opToggle?.addEventListener('click',()=>{const open=opToggle.getAttribute('aria-expanded')!=='true';opNav?.classList.toggle('is-open',open);opToggle.setAttribute('aria-expanded',String(open));if(!open)closeOpGroups();});
opGroups.forEach(group=>{group.querySelector('summary').addEventListener('click',()=>{if(!group.open)opGroups.filter(other=>other!==group).forEach(other=>{other.open=false;});});});
document.addEventListener('click',event=>{if(!event.target.closest('.op-dropdown'))closeOpGroups();if(!event.target.closest('.op-header'))closeOpMenu();});
document.addEventListener('keydown',event=>{if(event.key==='Escape'){const active=opGroups.find(group=>group.open);if(active){closeOpGroups();active.querySelector('summary').focus();}else if(opNav?.classList.contains('is-open')){closeOpMenu();opToggle?.focus();}}});
opNav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeOpMenu));
const opBreakpoint=window.matchMedia('(min-width: 901px)');opBreakpoint.addEventListener('change',closeOpMenu);
const opPath=window.location.pathname.replace(/\/?$/,'/');
opNav?.querySelectorAll('a').forEach(link=>{const url=new URL(link.href);if(!url.hash&&url.pathname.replace(/\/?$/,'/')===opPath)link.setAttribute('aria-current','page');});
opGroups.forEach(group=>{if([...group.querySelectorAll('a')].some(link=>link.getAttribute('aria-current')==='page'))group.querySelector('summary').classList.add('is-current');});

const calc=document.getElementById('team-calculator');if(calc){const ids=['roles','salary','load','allowance','rate'];const money=x=>new Intl.NumberFormat('en-PH',{style:'currency',currency:'PHP',maximumFractionDigits:0}).format(x);const number=id=>Number(document.getElementById(id)?.value||0);let summary='';const update=()=>{const [n,salary,load,allowance,rate]=ids.map(number);const valid=Number.isInteger(n)&&n>=1&&n<=200&&salary>=0&&load>=0&&load<=100&&allowance>=0&&rate>=1&&[n,salary,load,allowance,rate].every(Number.isFinite);const totalEl=document.getElementById('estimated-total');const breakdown=document.getElementById('estimated-breakdown');if(!valid){totalEl.textContent='Check your inputs';breakdown.textContent='Use a whole-number team size from 1 to 200, positive costs and an exchange rate of at least 1.';summary='';return}const per=salary*(1+load/100)+allowance+500*rate;const total=n*per;totalEl.textContent=money(total);summary=`Indicative Onepaul staffing scenario: ${n} people; gross salary PHP ${salary} per person/month; employer-cost assumption ${load}%; other monthly cost PHP ${allowance} per person; USD/PHP assumption ${rate}; Onepaul service fee USD 500 per person/month; total estimated monthly budget ${money(total)}. This is not a quotation.`;breakdown.textContent=`${n} × [${money(salary)} salary + ${money(salary*load/100)} estimated employer costs + ${money(allowance)} other + ${money(500*rate)} service fee] = ${money(total)}/month.`};ids.forEach(id=>document.getElementById(id)?.addEventListener('input',update));document.getElementById('copy-estimate')?.addEventListener('click',async()=>{if(!summary)return;try{await navigator.clipboard.writeText(summary);const b=document.getElementById('copy-estimate');b.textContent='Copied ✓';setTimeout(()=>b.textContent='Copy estimate',1800)}catch{const b=document.getElementById('copy-estimate');b.textContent='Copy unavailable'}});update()}


/* Reveal the homepage process steps once, as each enters the viewport. */
(()=>{
 const section=document.querySelector('#process');
 if(!section)return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches||!('IntersectionObserver'in window)||!Element.prototype.animate)return;
 const steps=[...section.querySelectorAll('.steps>article')];
 if(!steps.length)return;
 const running=new Set();
 let observer;
 const stop=()=>{
  observer?.disconnect();
  running.forEach(animation=>animation.cancel());
  running.clear();
  section.classList.remove('process-motion');
  steps.forEach(step=>step.classList.add('is-visible'));
 };
 try{
  observer=new IntersectionObserver(entries=>{
   entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const step=entry.target;
    observer.unobserve(step);
    const visibleColumns=window.innerWidth>720?4:window.innerWidth>430?2:1;
    const delay=(steps.indexOf(step)%visibleColumns)*120;
    step.style.setProperty('--step-delay',delay+'ms');
    step.classList.add('is-visible');
    const frames=[
     {opacity:0,transform:'translateY(22px)'},
     {opacity:1,transform:'translateY(0)'}
    ];
    const animation=step.animate(frames,{duration:650,delay,easing:'cubic-bezier(.22,1,.36,1)',fill:'backwards'});
    running.add(animation);
    animation.finished.then(()=>running.delete(animation),()=>running.delete(animation));
    const number=step.querySelector('b');
    if(number){
     const pulse=number.animate([{transform:'scale(.88)'},{transform:'scale(1.06)',offset:.65},{transform:'scale(1)'}],{duration:650,delay,easing:'ease-out'});
     running.add(pulse);
     pulse.finished.then(()=>running.delete(pulse),()=>running.delete(pulse));
    }
   });
  },{threshold:.18,rootMargin:'0px 0px -24px 0px'});
  section.classList.add('process-motion');
  steps.forEach(step=>observer.observe(step));
  reduced.addEventListener('change',event=>{if(event.matches)stop();});
  window.addEventListener('beforeprint',stop);
 }catch{stop();}
})();

/* Run liquid loops only in view; never override an explicit pause choice. */
(()=>{
 const section=document.querySelector('#process');
 if(!section)return;
 const icons=[...section.querySelectorAll('.process-metaball')];
 const button=section.querySelector('.process-motion-toggle');
 if(!icons.length||!button||!('IntersectionObserver'in window))return;
 const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
 const visibility=new IntersectionObserver(entries=>{
  entries.forEach(entry=>entry.target.classList.toggle('is-in-view',entry.isIntersecting));
 },{threshold:.05});
 icons.forEach(icon=>visibility.observe(icon));
 const updatePreference=()=>{button.hidden=reduced.matches;};
 updatePreference();
 reduced.addEventListener('change',updatePreference);
 button.addEventListener('click',()=>{
  const paused=section.classList.toggle('process-animation-paused');
  button.setAttribute('aria-pressed',String(paused));
  button.textContent=paused?'Resume animation':'Pause animation';
 });
 const updateTab=()=>section.classList.toggle('process-tab-hidden',document.hidden);
 updateTab();
 document.addEventListener('visibilitychange',updateTab);
})();
