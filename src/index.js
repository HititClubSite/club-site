import { Hono } from 'hono';
import { getCookie, setCookie, deleteCookie } from 'hono/cookie';

const app = new Hono();
const defaults = { logo:'/logo.png', whatsappUrl:'#', universityUrl:'#', welcomeTemplate:'BaÄŸlantÄ± tespit edildi... {location} koordinatlarÄ±na sÄ±zÄ±lÄ±yor.', about:'Hitit Üniversitesi Siber Güvenlik Kulübü olarak vizyonumuz; siber güvenlik alanında kendini geliştirmek isteyen yetenekleri bir araya getirmek, CTF laboratuvar çalışmaları ve pratik eğitimlerle teknik kapasiteyi artırmaktır. Amacımız, siber dünyada defansif ve ofansif yeteneklerle donatılmış, farkındalığı yüksek bir kültür oluşturmaktır.',contactEmail:'hitucyber@gmail.com',contactPhone:'05468466738',events:[] };
const read = async (env,key,fallback) => (await env.CYBER_DATA.get(key,'json')) || fallback;
const write = (env,key,value) => env.CYBER_DATA.put(key, JSON.stringify(value));
const isAdmin = (c) => getCookie(c,'cyber_admin') === '1';
const guard = async (c,next) => isAdmin(c) ? next() : c.json({error:'Yetkisiz'},401);

app.use('/api/*', async (c,next)=>{ c.header('Content-Type','application/json; charset=UTF-8'); await next(); });
app.get('/api/site', async c => c.json(await read(c.env,'settings',defaults)));
app.get('/api/visitor', async c => {
  const ip = c.req.header('CF-Connecting-IP') || 'unknown';
  let location = 'YaklaÅŸÄ±k konum bulunamadÄ±';
  try { const r=await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`); const d=await r.json(); location=[d.city,d.country_name].filter(Boolean).join(', ') || location; } catch {}
  const logs=await read(c.env,'logs',[]); logs.unshift({ip,location,time:new Date().toISOString()}); await write(c.env,'logs',logs.slice(0,200));
  return c.json({ip,location});
});
app.post('/api/admin/login', async c => { const {password}=await c.req.json(); const adminLogs=await read(c.env,'adminLogs',[]); adminLogs.unshift({success:password===c.env.ADMIN_PASSWORD,time:new Date().toISOString()}); await write(c.env,'adminLogs',adminLogs.slice(0,100)); if(password !== c.env.ADMIN_PASSWORD) return c.json({error:'Åifre hatalÄ±'},401); setCookie(c,'cyber_admin','1',{httpOnly:true,secure:true,sameSite:'Lax',maxAge:28800,path:'/'}); return c.json({ok:true}); });
app.post('/api/admin/logout', c => { deleteCookie(c,'cyber_admin',{path:'/'}); return c.json({ok:true}); });
app.get('/api/admin/logs',guard,async c=>c.json({visitors:await read(c.env,'logs',[]),admins:await read(c.env,'adminLogs',[])}));
app.put('/api/admin/settings',guard,async c=>{const body=await c.req.json(); const settings={...defaults,...body,events:Array.isArray(body.events)?body.events:[]}; await write(c.env,'settings',settings); return c.json(settings);});
app.get('/api/admin/me',guard,c=>c.json({ok:true}));
app.get('*', async c => c.env.ASSETS.fetch(c.req.raw));
export default app;

