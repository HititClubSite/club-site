const d=document.querySelector('#drawer');fetch('/api/admin/logout',{method:'POST',credentials:'include'});login.onsubmit=async e=>{e.preventDefault();const r=await fetch('/api/admin/login',{method:'POST',credentials:'include',headers:{'content-type':'application/json'},body:JSON.stringify({password:new FormData(login).get('password')})});if(!r.ok){error.textContent='Şifre hatalı veya secret ayarlı değil.';return}login.hidden=true;panel.hidden=false;load()};async function load(){const s=await (await fetch('/api/site')).json();for(const k of ['whatsappUrl','universityUrl','welcomeTemplate','about','contactEmail','contactPhone'])settings[k].value=s[k]||'';settings.events.value=JSON.stringify(s.events||[],null,2);const l=await (await fetch('/api/admin/logs',{credentials:'include'})).json();admins.textContent=JSON.stringify(l.admins,null,2);visitors.textContent=JSON.stringify(l.visitors,null,2)}settings.onsubmit=async e=>{e.preventDefault();const f=new FormData(settings);await fetch('/api/admin/settings',{method:'PUT',credentials:'include',headers:{'content-type':'application/json'},body:JSON.stringify(Object.fromEntries([...f].map(([k,v])=>[k,k==='events'?JSON.parse(v):v])))});alert('Kaydedildi')};



login.onsubmit=async e=>{e.preventDefault();const r=await fetch('/api/admin/login',{method:'POST',credentials:'include',headers:{'content-type':'application/json'},body:JSON.stringify({password:new FormData(login).get('password')})});if(r.ok){document.body.classList.add('authenticated');login.hidden=true;panel.hidden=false;load()}else{error.textContent='Şifre hatalı veya secret ayarlı değil.'}};logout.onclick=async()=>{await fetch('/api/admin/logout',{method:'POST',credentials:'include'});location.reload()};const mc=document.querySelector('#matrix'),mx=mc.getContext('2d');let drops=[];function matrixSize(){mc.width=innerWidth;mc.height=innerHeight;drops=Array(Math.ceil(innerWidth/16)).fill(0)}function matrixDraw(){mx.fillStyle='rgba(0,0,0,.12)';mx.fillRect(0,0,mc.width,mc.height);mx.fillStyle='#39ff78';mx.font='14px monospace';drops.forEach((y,i)=>{mx.fillText(Math.random()>.5?'01':'{}',i*16,y*16);drops[i]=(y*16>mc.height&&Math.random()>.97)?0:y+1})}matrixSize();setInterval(matrixDraw,45);addEventListener('resize',matrixSize);



const toggleSection=(name)=>{const same=panel.className===name;panel.className=same?'':name;d.classList.remove('open')};showSettings.onclick=()=>toggleSection('show-settings');showAdmins.onclick=()=>toggleSection('show-admins');showVisitors.onclick=()=>toggleSection('show-visitors');




const menuButton=document.querySelector('#toggle');const menuDrawer=document.querySelector('#drawer');menuButton.addEventListener('click',()=>menuDrawer.classList.toggle('open'));


