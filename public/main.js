const canvas=document.querySelector('#matrix'),ctx=canvas.getContext('2d');let cols,drops;function resize(){canvas.width=innerWidth;canvas.height=innerHeight;cols=Math.floor(innerWidth/16);drops=Array(cols).fill(0).map(()=>Math.floor(Math.random()*innerHeight/16))}function draw(){ctx.fillStyle='rgba(0,0,0,.09)';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.fillStyle='#39ff78';ctx.font='14px monospace';drops.forEach((y,i)=>{ctx.fillText(Math.random()>0.5?'01':'{}',i*16,y*16);if(y*16>canvas.height&&Math.random()>.975)drops[i]=0;drops[i]++})}resize();draw();addEventListener('resize',resize);setInterval(draw,35);
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const settings={logo:'/logo.png',whatsappUrl:'https://chat.whatsapp.com/C8pho8JumMK5igsef1fDfr',universityUrl:'https://kulupler.hitit.edu.tr/kulup/otomobil-ve-motor-sporlari-kulubu',welcomeTemplate:'Connection detected... {location} coordinates monitored.'};document.querySelector('#logo').src=settings.logo;document.querySelector('#join').href=settings.whatsappUrl;document.querySelector('#university').href=settings.universityUrl;document.querySelector('#welcome').textContent=settings.welcomeTemplate.replace('{location}','your approximate location');fetch('https://ipapi.co/json/').then(r=>r.json()).then(v=>{document.querySelector('#ip').textContent=v.ip||'Gizlilik modu';document.querySelector('#location').textContent=[v.city,v.country_name].filter(Boolean).join(', ')||'YaklaÅŸÄ±k konum bulunamadÄ±';document.querySelector('#welcome').textContent=settings.welcomeTemplate.replace('{location}',[v.city,v.country_name].filter(Boolean).join(', ')||'your approximate location')}).catch(()=>{document.querySelector('#ip').textContent='Gizlilik modu';document.querySelector('#location').textContent='YaklaÅŸÄ±k konum kullanÄ±lamÄ±yor'});





document.querySelector('.eyebrow').textContent='[+] Ba\u011Flant\u0131 tespit edildi';

document.documentElement.style.scrollBehavior='smooth';fetch('/api/site').then(r=>r.json()).then(s=>{if(s.events){document.querySelector('#event-list').innerHTML=s.events.map(e=>'<article class=event-card><small>'+e.date+'</small><h3>'+e.title+'</h3><p>'+e.description+'</p></article>').join('')}}).catch(()=>{});

